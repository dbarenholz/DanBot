import { Command } from "discord-akairo";
import { Message } from "discord.js";
import { get_client, retrieve_task_information } from "../_helper";

// List the tasks
class TaskListCommand extends Command {
  constructor() {
    super("task-list", {
      category: "task",
      description: {
        content: "Show all kinds of task information",
        usage: "task list",
        examples: ["task list", "task information"],
      },
    });
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

    const client = get_client(this);
    const info = retrieve_task_information(client);

    let str = "";
    for (const id of info) {
      str += `TaskID: ${id}\n`;
    }
    return message.util.send(str);
  }
}

export default TaskListCommand;
