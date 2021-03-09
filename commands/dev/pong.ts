import { Command } from "discord-akairo";
import { Message } from "discord.js";

/**
 * @author Barenholz D.
 * @class PongCommand
 * @description A simple pingpong command used for testing purposes.
 * @version 0.1.0
 */
class PongCommand extends Command {
  // Create the PongCommand class instance
  constructor() {
    super("ping", {
      aliases: ["ping", "pong"],
      // args: [],
      category: "testing",
      description: {
        content: "A simple ping pong command.",
        usage: "[command]",
      },
    });
  }
  // Define what to do when it gets a message.
  exec(message: Message) {
    return message.util.send("Pong!");
  }
}

export default PongCommand;
