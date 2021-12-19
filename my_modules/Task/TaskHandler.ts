import type { AkairoClient } from "discord-akairo";

import { Collection } from "discord.js";
import { readdirSync } from "fs";
import { join } from "path";

import type TaskData from "./TaskData";

/**
 * @author Barenholz D.
 * @class TaskHandler
 * @description Loads tasks and registers them with EventEmitters
 * @version 0.3.0
 */
export default class TaskHandler {
  /**
   * directory: Directory in which tasks reside. Usually this is `./tasks`.
   */
  directory: string;

  /**
   * client: The client that uses this handler.
   */
  client: AkairoClient;

  /**
   * tasks: A collection of tasks with its relevant TaskData.
   */
  tasks: Collection<string, TaskData>;

  /**
   * @param client - The client that this handler is for
   * @param options - The handler options
   */
  constructor(client: AkairoClient, { directory }) {
    this.client = client;
    this.directory = directory;
    this.tasks = new Collection<string, TaskData>();
  }

  /**
   * Registers and loads all tasks not starting with "_"
   * Reasoning for filtering: You can easily exclude tasks by appending an underscore.
   *
   * Note that if a particular task has `runOnStart` set to `true`, they will run as soon as this method is called.
   */
  public registerAndLoadAll() {
    readdirSync(this.directory)
      .filter((file) => file.endsWith(".js"))
      .filter((file) => !file.startsWith("_"))
      .forEach(async (file) => {
        // import file
        const taskClass = require(join(this.directory, file)).default;
        // Create the task
        const task = new taskClass();
        // set handler for this
        task.handler = this;
        // add to collection of tasks
        this.tasks.set(task?.id, {
          task: task,
        });
        // when waiting for ready, do the thing after ready
        if (task?.runOnStart && task?.awaitReady) {
          this.client.on("ready", () => {
            task.do(this.client);
          });
        }
        // otherwise do the thing
        if (task?.runOnStart && !task?.awaitReady) {
          task.do(this.client);
        }
      });
  }
}
