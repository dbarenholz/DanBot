// Native node
import { join } from "path";

// npm packages
import { AkairoClient, CommandHandler, ListenerHandler } from "discord-akairo";

// own files
import botToken from "./secret/token";
import ownerID from "./secret/owner";
import TaskHandler from "./my_modules/Task/TaskHandler";

/**
 * @author Barenholz D.
 * @class DanBot -- the bot itself.
 * @description DanBot main entrypoint
 * @version 0.2.0
 */
class DanBot extends AkairoClient {
  commandHandler: CommandHandler;
  listenerHandler: ListenerHandler;
  taskHandler: TaskHandler;

  constructor() {
    super(
      {
        ownerID: ownerID,
      },
      {
        disableMentions: "everyone",
      }
    );

    // Set commandhandler
    this.commandHandler = new CommandHandler(this, {
      prefix: ["d!"],
      blockBots: true,
      blockClient: true,
      allowMention: true,
      defaultCooldown: 500,
      commandUtil: true,
      directory: join(__dirname, "commands"),
    });

    // Set listenerhandler
    this.listenerHandler = new ListenerHandler(this, {
      directory: join(__dirname, "listeners"),
    });

    // Set task handler
    this.taskHandler = new TaskHandler(this, {
      directory: join(__dirname, "tasks"),
    });

    // Load/Register all commands/listeners/tasks
    this.commandHandler.useListenerHandler(this.listenerHandler);
    this.listenerHandler.loadAll();
    this.commandHandler.loadAll();
    this.taskHandler.registerAndLoadAll();
  }
}

// Create the bot and login using token
const bot = new DanBot();
bot.login(botToken);

export default DanBot;
