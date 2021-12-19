import TimedPromise from "@dbarenholz/timed-promise";
import type { AkairoClient } from "discord-akairo";
import type { TextChannel } from "discord.js";
import Task from "../my_modules/Task/Task";
import axios from "axios";
import { load } from "cheerio";

/**
 * @author Barenholz D.
 * @class QuoteOfTheDay
 * @description Task that involves webscraping.
 * @version 0.1.0
 */
class QuoteOfTheDay extends Task {
  constructor() {
    super({
      id: "QuoteOfTheDay",
      interval: 86400000, // 24 hours,
      channel: "818625852010004500", // channel to post in
      runOnStart: true,
      // awaitReady is true by default
      category: "util",
      description: "Task that involves webscraping.",
    });
  }

  // Retrieves the quote (web-scraping)
  async _getQuote(): Promise<string> {
    // Site to scrape
    const scrapeURL = "https://www.insightoftheday.com";
    // Selector containing the URL to the image
    const selector = "div.daily-post > div.quote > a > p > img";
    // Find the URL to the image
    return await axios.get(scrapeURL).then((response) => {
      // Load HTML to parse it
      const $ = load(response.data);
      // Grab image url and resolve with it
      const imgURL = $(selector)[0].attribs.src;
      return imgURL;
    });
  }

  task(_this: QuoteOfTheDay, client: AkairoClient, _ms: number) {
    return new TimedPromise<String>(async (resolve: (msg: string) => void, reject: (err: string) => any) => {
      // Ensure we have an actual URL for the image
      let quoteURL = null;
      try {
        quoteURL = await _this._getQuote();
      } catch (err) {
        reject(`Error: ${err}`);
      }

      // Send it
      client.channels
        .fetch(_this.channel)
        .then((channel) => {
          const theChannel = channel as TextChannel;
          theChannel
            .send({
              files: [quoteURL],
            })
            .then(() => {
              resolve("Done!");
            })
            .catch(reject);
        })
        .catch((err) => reject(`Error: ${err}`));
    });
  }
}

export default QuoteOfTheDay;
