import { Command } from "discord-akairo";
import { Message } from "discord.js";
import DanBot from "../..";

// List the tasks
class TaskListCommand extends Command {
  constructor() {
    super("task-list", {
      category: "task",
      description: {
        content: "Show all kinds of task information",
      },
    });
  }

  getTaskInfo(): Array<String> {
    const client = this.client as DanBot;
    return client.taskHandler.tasks.keyArray();
  }

  public exec(message: Message): Promise<Message> {
    // TODO: Create fancy embed with information I want to show:

    /*
    Total known tasks: ### (number only)
    Currently running tasks (###):
    - Task ### - time until it does something
    - Task ### - time until it does something
    - Task ### - time until it does something
    */

    const info = this.getTaskInfo();

    let str = "";
    for (const id of info) {
      str += `TaskID: ${id}\n`;
    }
    return message.util.send(str);
  }
}

export default TaskListCommand;
