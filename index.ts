// Native node
import { join } from "path";

// npm packages
import { AkairoClient, CommandHandler, ListenerHandler } from "discord-akairo";

// own files
import { botToken, ownerID } from "./secret/secret";

// const commandsPath = join(__dirname, "..", "commands/");
// const listenersPath = join(__dirname, "..", "listeners/");

/**
 * @author Barenholz D.
 * @class DanBot -- the bot itself.
 * @description DanBot main entrypoint
 * @version 0.1.0
 */
class DanBot extends AkairoClient {
  // Declare handler types.
  commandHandler: CommandHandler;
  listenerHandler: ListenerHandler;

  // Create DanBot instance
  constructor() {
    // AkairoClient constructor call
    super(
      // options - options for AkairoClient
      {
        ownerID: ownerID,
      },
      // clientOptions - options for discord.js
      {
        disableMentions: "everyone",
        presence: {
          status: "online",
          activity: {
            name: "Being super cool. [d!help] for help!",
            type: "CUSTOM_STATUS",
          },
        },
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

    // Load all commands and listeners
    this.commandHandler.useListenerHandler(this.listenerHandler);
    this.listenerHandler.loadAll();
    this.commandHandler.loadAll();
  }
}

// Create the bot and login using token
const bot = new DanBot();
bot.login(botToken);
