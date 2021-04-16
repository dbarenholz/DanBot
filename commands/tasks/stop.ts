import { Command } from "discord-akairo";
import { Message } from "discord.js";
import { DanBot } from "../..";

class TaskStopCommand extends Command {
  constructor() {
    super("task-stop", {
      category: "task",
      // aliases: ["stop", "remove"],
      description: {
        content: "Show task information",
      },
    });
  }

  get_task_IDs(client: DanBot): string[] {
    return client.taskHandler.tasks.keyArray();
  }

  stop(client: DanBot, task_id: string): Promise<String> {
    return new Promise<String>((resolve, _reject) => {
      // check if exists, if not, resolve with unknown task
      let td = client.taskHandler.tasks.get(task_id);
      if (td == undefined) {
        resolve(`${task_id}: does not exist`);
      } else {
        td.task
          .stop()
          .then((msg: any) => resolve(`${task_id}: ${msg}`))
          .catch((err: any) => resolve(`${task_id}: ${err}`));
      }
    });
  }

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
    let args = message.util.parsed.content.split(" ").slice(1);

    const client = this.client as DanBot;
    const ids = client.taskHandler.tasks.keyArray();

    let str = "Result:\n";

    if (args[0] == "all") {
      // Stop all tasks
      await this.stop_all(client, ids).then((msg) => {
        str += msg;
      });
    } else {
      // Stop given tasks
      const uniqueTasks = [...new Set<string>(args)];

      await this.stop_all(client, uniqueTasks).then((msg) => {
        str += msg;
      });
    }

    return message.util.send(str);
  }
}

export default TaskStopCommand;
