import { Command } from "discord-akairo";
import { Message } from "discord.js";
import { get_client, get_task_IDs, handle_empty_arguments } from "../_helper";

import DanBot from "../..";

class TaskStopCommand extends Command {
  constructor() {
    super("task-stop", {
      category: "task",
      description: {
        content: "Stops a task based on ID",
        usage: "task stop [ID]",
        examples: [
          "task stop all",
          "task stop MyCoolTask",
          "task stop MyCoolTask MyCoolTask2 MyCoolTask3",
          "task pause all",
          "task pause MyCoolTask",
          "task pause MyCoolTask MyCoolTask2 MyCoolTask3",
          "task break all",
          "task break MyCoolTask",
          "task break MyCoolTask MyCoolTask2 MyCoolTask3",
        ],
      },
    });
  }

  /**
   * Stops a single task
   *
   * @param client   the client with the task
   * @param task_id  the id of the task
   * @returns A promise that resolves with a message regardless
   *          of success or fail to provide to the user running the command
   */
  stop(client: DanBot, task_id: string): Promise<String> {
    return new Promise<String>((resolve, _reject) => {
      let td = client.taskHandler.tasks.get(task_id);
      if (td == undefined) {
        resolve(`${task_id}: does not exist`);
      } else {
        td.task
          .pause()
          .then((msg: any) => resolve(`${task_id}: ${msg}`))
          .catch((err: any) => resolve(`${task_id}: ${err}`));
      }
    });
  }

  /**
   * Starts all tasks with particular IDs
   *
   * @param client the client with tasks
   * @param ids    the IDs of the task to start
   * @returns A promise that resolves with a message, regardless
   *          of success or fail, to provide to the user running the command
   */
  stop_all(client: DanBot, ids: string[]): Promise<String> {
    return new Promise<String>((resolve, _reject) => {
      let promises = [];

      for (const id of ids) {
        promises.push(this.stop(client, id));
      }

      Promise.all(promises).then((values) => {
        let str = "";
        for (const value of values) {
          str += `- ${value}\n`;
        }
        resolve(str);
      });
    });
  }

  public async exec(message: Message): Promise<Message> {
    // Retrieve the arguments
    let args = message.util.parsed.content.split(" ").slice(1);

    // empty argument case
    if (args[0] == undefined) {
      return handle_empty_arguments(this, message);
    }

    // assume: arguments are not empty
    const client = get_client(this);
    const ids = get_task_IDs(client);

    // Build resulting string
    // TODO: Let this be an embed
    let str = "Result:\n";

    // Whether or not we want to start all tasks
    if (args[0] == "all") {
      // Start all tasks
      await this.stop_all(client, ids).then((msg) => {
        str += msg;
      });
    } else {
      // Start given tasks
      const uniqueTasks = [...new Set<string>(args)];

      await this.stop_all(client, uniqueTasks).then((msg) => {
        str += msg;
      });
    }

    // Send a message back on completion
    return message.util.send(str);
  }
}

export default TaskStopCommand;
