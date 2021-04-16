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
      category: "test",
      description: {
        content: "A simple ping pong command.",
        usage: "ping",
        examples: ["ping"],
      },
    });
  }
  // Define what to do when it gets a message.
  public exec(message: Message): Promise<Message> {
    return message.util.send("Pong!");
  }
}

export default PongCommand;
