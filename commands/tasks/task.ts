import { Command, Flag } from "discord-akairo";

/**
 * @author Barenholz D.
 * @class TaskCommand
 * @description The task module command
 * @version 0.1.0
 */
class TaskCommand extends Command {
  constructor() {
    super("task", {
      aliases: ["task"],
      category: "task",
      description: {
        content: "Task module",
      },
    });
  }

  *args() {
    const method = yield {
      type: [
        // [module-id, alias1, alias2...]
        ["task-list", "list", "information"],
        ["task-start", "start", "resume"],
        ["task-stop", "stop", "pause"],
        ["task-restart", "restart", "reload"],
        ["task-destroy", "destroy", "remove"],
      ],
      otherwise: `Check \`d! help task\` for more information`,
    };

    return Flag.continue(method);
  }
}

export default TaskCommand;
