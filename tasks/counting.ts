import TimedPromise from "@liqd-js/timed-promise";
import { AkairoClient } from "discord-akairo";
import { TextChannel } from "discord.js";
import Task from "../my_modules/Task/Task";

/**
 * @author Barenholz D.
 * @class CountingTask
 * @description A simple task that counts up inside a particular discord channel.
 * @version 0.2.0
 */
class CountingTask extends Task {
  constructor() {
    super("CountingTask", {
      category: "test",
      description: "A simple task that counts up inside a particular discord channel.",
      channel: "818625852010004500", // channel to count in
      interval: 1000, // every 1 second
      data: {
        // counter item
        counter: {
          // docstring
          doc: "A simple counter, for counting!",
          // value
          value: 0,
        },
      },
    });
  }

  /**
   * The task that is being run continuously.
   *
   * @param _this a reference to the correct task instance
   * @param client the client that runs the task
   * @param ms the timeout to be set on the task
   * @returns TimedPromise<String> that resolves when done, and rejects on error.
   */
  task(_this: Task, client: AkairoClient, ms: number): TimedPromise<String> {
    const current = _this.data.counter.value;

    return new TimedPromise<String>((resolve, reject) => {
      client.channels
        .fetch(_this.channel)
        .then((channel) => {
          const theChannel = channel as TextChannel;
          theChannel.send(current);
          // Increment count
          _this.data.counter.value++;
          // Resolve
          resolve("Done!");
        })
        .catch((err) => reject(`Error: ${err}`));
    }).timeout(ms);
  }
}

export default CountingTask;
