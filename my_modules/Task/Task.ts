import TimedPromise from "@dbarenholz/timed-promise";
import { AkairoError } from "discord-akairo";
import TaskHandler from "./TaskHandler";
import type { AkairoClient } from "discord-akairo";
import TaskOptions from "./TaskOptions";

/**
 * @author Barenholz D.
 * @class Task
 * @description A Task object is similar to a command execution, but without command!
 *              Tasks are pieces of code that the bot does on regular basis, such as every day, or every hour.
 *              Note that as of now there is no easy way to specify _when_ precisely a task needs to run:
 *              only an interval is being used.
 * @version 0.3.0
 */
export default class Task {
  // See TaskOptions type for information
  id: string;
  interval: number;
  channel: string;
  runOnStart?: boolean;
  awaitReady?: boolean;
  handler?: TaskHandler;
  category?: string;
  description?: string;
  data?: any;

  /**
   * @param id       The task name
   * @param options  The options for this task
   */
  constructor(options: TaskOptions) {
    // Grab fields from options.
    const { id, interval, channel, runOnStart, awaitReady, handler, category, description, data } = options;

    // Set fields if present, and defaults otherwise.
    this.id = id;
    this.interval = interval;
    this.channel = channel;
    this.runOnStart = runOnStart || false;
    this.awaitReady = awaitReady || true;
    this.category = category || "test";
    this.description = description || "";
    this.data = data || null;
    this.handler = handler || null;
  }

  /**
   * The task to perform. Should be implemented by an actual task.
   *
   * @param _this    The task instance
   * @param _client   The client that runs the task
   * @param _ms       Amount of milliseconds that the task is allowed to take before throwing an error due to timeout
   */
  public task(_this: Task, _client: AkairoClient, _ms: Number): TimedPromise<String> {
    // Should be implemented in created task!
    throw new AkairoError(`NOT_IMPLEMENTED ${this.constructor.name} task`);
  }

  /**
   * The method as called by `TaskHandler`. Wraps the `task()` method and sets the interval.
   *
   * @param client  The client that runs a task
   */
  public async do(client: AkairoClient) {
    let ms = 0;

    const timerID = setInterval(this.task, this.interval, this, client, ms);
    this.handler.tasks.get(this.id).timerID = timerID;
  }

  /**
   * Pauses a (running) task. Pausing a task keeps its current state.
   *
   * @returns A promise that resolves when pausing is successful.
   */
  public async pause(): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!this.handler.tasks.get(this.id).task.isRunning()) {
        resolve("Task not running.");
      } else {
        // Task is running
        clearInterval(this.handler.tasks.get(this.id).timerID);
        let success: boolean;

        try {
          success = delete this.handler.tasks.get(this.id).timerID;
        } catch (err) {
          reject(`Error: "${err}"`);
        }

        if (success) {
          resolve("Task paused.");
        } else {
          reject("Could not pause task.");
        }
      }
    });
  }

  /**
   * Continues a (paused) task. Continuing a task uses the state the task was in when paused.
   * If the task was never started, this is identical to starting a new instance of a task.
   *
   * @returns A promise that resolves when continuing is successful.
   */
  public async continue(): Promise<string> {
    return new Promise((resolve, reject) => {
      if (this.handler.tasks.get(this.id).task.isRunning()) {
        resolve("Already running.");
      } else {
        // Task is not yet running
        this.handler.tasks
          .get(this.id)
          .task.do(this.handler.client)
          .then(() => resolve("Successfully started."))
          .catch((err: string) => reject(`Error: "${err}"`));
      }
    });
  }

  /**
   * Reset data related to a task to null
   *
   * @returns A promise that resolves when done.
   */
  public async reset(): Promise<string> {
    return new Promise((resolve, _reject) => {
      // Retrieve list of data items
      const dataItems = Object.keys(this.handler.tasks.get(this.id).task.data);

      // Loop through them
      for (const dataItem of dataItems) {
        // Reset this particular item to its initial value
        const reset = this.handler.tasks.get(this.id).task.data[dataItem].init;
        this.handler.tasks.get(this.id).task.data[dataItem].value = reset;
      }

      // resolve
      resolve("Data has been reset");
    });
  }

  /**
   * Sets the channel that this task runs in.
   *
   * @param ID  Channel ID to set task to.
   */
  public async set_channel(ID: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      this.handler.client.channels
        .fetch(ID)
        .then((channel) => {
          if (channel == null || channel == undefined) {
            reject(`Channel with ID '${ID}' does not exist`);
          }

          this.channel = ID;
          resolve(`Channel set to channel with ID: '${ID}'`);
        })
        .catch(() => reject(`Error getting channel with ID '${ID}'`));
    });
  }

  /**
   * Helper method to check if a task is currently running.
   *
   * @returns a boolean indicating if the task is running
   */
  isRunning(): boolean {
    return this.handler.tasks.get(this.id).timerID != undefined;
  }
}
