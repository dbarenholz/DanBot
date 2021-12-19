import { Listener } from "discord-akairo";

/**
 * @author Barenholz D.
 * @class Ready
 * @description A listener that when ready sets the bot activity
 * @version 0.2.0
 */
class Ready extends Listener {
  constructor() {
    super("ready", {
      event: "ready",
      emitter: "client",
    });
  }

  // Execute following
  exec() {
    this.client.user.setActivity("slave for Daniel!");
    console.log(`${this.client.user.tag} is online and ready to go!`);
  }
}

export default Ready;
