/**
 * Quote of the day task.
 * Every day at XX:XX, visits https://www.insightoftheday.com, gets the image for quote of the day, and sends it in a particular channel.
 *
 */

import Task from "./task";

function getQuote() {
  // 1. Parse https://www.insightoftheday.com
  // 2. Get link to image
  // 3. Save image as tmp file
  // 4. Return file descriptor to tmp file
}

function postQuote(channel) {
  // 1. Grab channel
  // 2. Grab file img
  // 3. Post the img to the channel
}

class QOTD extends Task {
  constructor() {
    super("qotd", {
      description: "Posts a quote of the day in the desired channel!",
      category: "fun",
      // TODO: make anonymous function
      task: function getAndPostQuoteOfTheDay() {
        console.log("start");
        // getQuote();
        // postPostOfTheDay();
        console.log("done");
      },
    });
  }
}

module.exports = QOTD;
