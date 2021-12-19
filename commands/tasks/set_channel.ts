import { Command } from "discord-akairo";
import { Message } from "discord.js";
import DanBot from "../..";
import { get_client, get_task_IDs, handle_empty_arguments, handle_too_many_arguments } from "../_helper";

// List the tasks
class TaskSetCommand extends Command {
  constructor() {
    super("task-set", {
      category: "task",
      description: {
        content: "Sets the channel for a task",
        usage: "task set [ID] [CHANNEL]",
        examples: ["set MyCoolTask 922080012126011412"],
      },
    });
  }

  set_channel(client: DanBot, task_id: string, channel_id: string): Promise<string> {
    return new Promise<string>((resolve, _reject) => {
      let td = client.taskHandler.tasks.get(task_id);
      if (td == undefined) {
        resolve(`${task_id}: does not exist`);
      } else {
        client.taskHandler.tasks
          .get(task_id)
          .task.set_channel(channel_id)
          .then((msg: string) => resolve(msg + ` for task '${task_id}'`))
          .catch((err: any) => resolve(err));
      }
    });
  }

  public async exec(message: Message): Promise<Message> {
    // Retrieve the arguments
    let args = message.util.parsed.content.split(" ").slice(1);

    // empty argument case
    if (args[0] == undefined) {
      return handle_empty_arguments(this, message);
    }

    // multiple args case
    if (args.length > 2) {
      return handle_too_many_arguments(this, message);
    }

    // assume: exactly 2 arguments: the task ID, followed by channel ID
    const task_id = args[0];
    const channel_id = args[1];
    const client = get_client(this);

    // Build resulting string
    // TODO: Let this be an embed
    let str = "Result:\n";

    await this.set_channel(client, task_id, channel_id).then((msg) => {
      str += msg;
    });

    // Send a message back on completion
    return message.util.send(str);
  }
}

export default TaskSetCommand;
