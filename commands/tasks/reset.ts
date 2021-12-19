import { Command } from "discord-akairo";
import { Message } from "discord.js";
import DanBot from "../..";
import { get_client, get_task_IDs, handle_empty_arguments } from "../_helper";

class TaskResetCommand extends Command {
  constructor() {
    super("task-reset", {
      category: "task",
      description: {
        content:
          "Resets data related to a particular (running or paused) task. Note that it does not change the running/paused state of the task",
        usage: "task reset [ID]",
        examples: [
          "task reset all",
          "task reset MyCoolTask",
          "task reset MyCoolTask MyCoolTask2 MyCoolTask3",
          "task reload all",
          "task reload MyCoolTask",
          "task reload MyCoolTask MyCoolTask2 MyCoolTask3",
        ],
      },
    });
  }

  reset(client: DanBot, task_id: string): Promise<String> {
    return new Promise<String>((resolve, _reject) => {
      let td = client.taskHandler.tasks.get(task_id);
      if (td == undefined) {
        resolve(`${task_id}: does not exist`);
      } else {
        td.task
          .reset()
          .then((msg: any) => resolve(`${task_id}: ${msg}`))
          .catch((err: any) => resolve(`${task_id}: ${err}`));
      }
    });
  }

  reset_all(client: DanBot, ids: string[]): Promise<String> {
    return new Promise<String>((resolve, _reject) => {
      let promises = [];

      for (const id of ids) {
        promises.push(this.reset(client, id));
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
      await this.reset_all(client, ids).then((msg) => {
        str += msg;
      });
    } else {
      // Start given tasks
      const uniqueTasks = [...new Set<string>(args)];

      await this.reset_all(client, uniqueTasks).then((msg) => {
        str += msg;
      });
    }

    // Send a message back on completion
    return message.util.send(str);
  }
}

export default TaskResetCommand;
