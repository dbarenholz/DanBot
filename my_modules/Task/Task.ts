import TimedPromise from "@liqd-js/timed-promise";
import { AkairoClient, AkairoError } from "discord-akairo";
import TaskHandler from "./TaskHandler";

/**
 * @author Barenholz D.
 * @class Task
 * @description A Task object is similar to a command execution, but without command!
 *              Tasks are pieces of code that the bot does on regular basis, such as every day, or every hour.
 * @version 0.2.0
 */
export default class Task {
  // The name of the task
  id: string;
  // Interval for which to perform the task
  interval: number;
  // Whether or not to run this task on startup of the bot
  runOnStart: boolean = true;
  // Whether or not to wait for the bot to be ready
  awaitReady: boolean = true;
  // The handler of the task
  handler: TaskHandler;
  // The category of the task, can be empty
  category?: string = "testing";
  // The description of the task, can be empty
  description?: string = "";
  // Identifier of what channel this task runs in
  channel?: string = null;
  // Data (placeholders) related to the task
  // Note that every item should be of the form
  // data: {
  //   something: {doc: "documentation", value: actual value}
  // }
  data?: any = null;

  /**
   * @param id - The task name
   * @param options - The options for this task
   */
  constructor(id: string, { category, description, channel, data, interval }) {
    this.id = id;
    this.interval = interval;
    this.category = category;
    this.description = description;
    this.channel = channel;
    this.data = data;
    this.handler = null;
  }

  // Task itself
  // Needs _this parameter to pass through correct scope.
  public async task(_this: Task, client: AkairoClient, ms: Number): TimedPromise {
    // Should be implemented in created task!
    throw new AkairoError(`NOT_IMPLEMENTED ${this.constructor.name} task`);
  }

  // Wrapper method as called in TaskHandler
  public async do(client: AkairoClient): TimedPromise {
    let ms = 0;

    const timerID = setInterval(this.task, this.interval, this, client, ms);
    // Set relevant interval in TaskHandler.tasks
    this.handler.tasks.get(this.id).timerID = timerID;
  }

  /**
   * Provides functionality to stop a task.
   * Note that this DOES NOT REMOVE previously saved data items. If removing previously saved data is desired, use destroy();
   *
   * @returns A promise that resolves when stopping is successful
   */
  public stop(): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!this.handler.tasks.get(this.id).task.isRunning()) {
        // Task is not running:
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
          resolve("Task stopped and removed interval from collection.");
        } else {
          reject("Could not remove task.");
        }
      }
    });
  }

  /**
   * Provides functionality to start a task.
   * Note that this REUSES previously saved data items. If resetting previously saved data is desired, use restart()
   *
   * @returns A promise that resolves when starting is successful
   */
  public start(): Promise<string> {
    return new Promise((resolve, reject) => {
      if (this.handler.tasks.get(this.id).task.isRunning()) {
        // Task is already running:
        resolve("Already running.");
      } else {
        // Task is not yet running
        this.handler.tasks
          .get(this.id)
          .task.do(this.handler.client)
          .then(resolve("Successfully started."))
          .catch((err) => reject(`Error: "${err}"`));
      }
    });
  }

  // TODO: implement
  public destroy(): Promise<String> {
    // first stop, then remove data
    throw new AkairoError(`NOT_IMPLEMENTED ${this.constructor.name} task restart`);
  }

  // TODO: implement
  public restart(): Promise<String> {
    // stop, destroy, start
    throw new AkairoError(`NOT_IMPLEMENTED ${this.constructor.name} task restart`);
  }

  /**
   * Helper method to check if a task is currently running.
   *
   * @returns a boolean indicating if the task is running
   */
  public isRunning(): boolean {
    return this.handler.tasks.get(this.id).timerID;
  }
}
