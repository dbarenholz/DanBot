import { Command, Flag } from "discord-akairo";

/**
 * @author Barenholz D.
 * @class TaskCommand
 * @description The task module command
 * @version 0.2.1
 */
class TaskCommand extends Command {
  constructor() {
    super("task", {
      aliases: ["task"],
      category: "task",
      description: {
        content: "Task module",
        usage: "task [SUBCOMMAND]",
        examples: [
          "task list",
          "task information",
          "task start MyCoolTask",
          "task resume MyCoolTask",
          "task continue MyCoolTask",
          "task stop MyCoolTask",
          "task pause MyCoolTask",
          "task break MyCoolTask",
          "task reset MyCoolTask",
          "task reload MyCoolTask",
          "task set MyCoolTask 818625852010004500",
        ],
      },
    });
  }

  *args() {
    const method = yield {
      type: [
        ["task-list", "list", "information"],
        ["task-start", "start", "resume", "continue"],
        ["task-stop", "stop", "pause", "break"],
        ["task-reset", "reset", "reload"],
        ["task-set", "set"],
      ],
      // TODO: Pretend `d!help task` has been run here, and return that output.
      otherwise: `Check \`d!help task\` for more information`,
    };

    return Flag.continue(method);
  }
}

export default TaskCommand;
