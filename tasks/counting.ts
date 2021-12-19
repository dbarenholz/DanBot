import TimedPromise from "@dbarenholz/timed-promise";
import type { AkairoClient } from "discord-akairo";
import type { TextChannel } from "discord.js";
import Task from "../my_modules/Task/Task";

/**
 * @author Barenholz D.
 * @class CountingTask
 * @description A simple task that counts up inside a particular discord channel.
 * @version 0.3.0
 */
class CountingTask extends Task {
  constructor() {
    super({
      id: "CountingTask",
      interval: 1000, // every 1 second
      channel: "818625852010004500", // channel to count in
      // runOnStart is false by default
      // awaitReady is true by default
      // category: "test" => default
      description: "A simple task that counts up inside a particular discord channel.",
      data: {
        // counter item
        counter: {
          // docstring
          doc: "A simple counter, for counting!",
          // value
          value: 0,
          // value to reset to
          init: 0,
        },
      },
    });
  }

  // The task to do. This is the code that runs.
  task(_this: Task, client: AkairoClient, ms: number): TimedPromise<String> {
    const current = _this.data.counter.value;

    return new TimedPromise<String>(async (resolve: (msg: string) => void, reject: (err: string) => any) => {
      client.channels
        .fetch(_this.channel)
        .then((channel) => {
          const theChannel = channel as TextChannel;
          theChannel.send(current);
          _this.data.counter.value++;
          resolve("Done!");
        })
        .catch((err) => reject(`Error: ${err}`));
    }).timeout(ms);
  }
}

export default CountingTask;
