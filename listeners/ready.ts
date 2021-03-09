import { Listener } from "discord-akairo";

// Create status
class Ready extends Listener {
  // Create Listener instance on ready event
  constructor() {
    super("ready", {
      event: "ready",
      emitter: "client",
    });
  }

  // Execute following
  exec() {
    setInterval(() => this.client.user.setActivity("I am playing pingpong."), 15000);

    console.log(`${this.client.user.tag} is online!`);
  }
}

export default Ready;
