// // scraping
// import axios from "axios";
// import { load } from "cheerio";
// import { file } from "tempy";
// import { createWriteStream } from "fs";

// import { DateTime } from "luxon";
// import { Message } from "discord.js";

// /**
//  * @author Barenholz D.
//  * @class QuoteOfTheDay
//  * @description Prints a nice quote in a certain channel every day.
//  * @version 0.1.0
//  */
// class QuoteOfTheDay extends Task {
//   // When to post
//   public postAtTime: DateTime;
//   // Where to post
//   public channel: string;

//   constructor() {
//     super(
//       "QuoteOfTheDay",
//       // TaskInformation -- name, category?, description?
//       {
//         name: "QuoteOfTheDay",
//         category: "fun",
//         description: "Prints a nice quote in a certain channel every day.",
//       }
//     );
//     this.channel = "818625852010004500";
//   }

//   task() {
//     const time_until_timeout = 10;
//     return new TimedPromise<String>((resolve, reject, _timeout) => {
//       // Normal promise code
//       this.getQuote().then((img) => {
//         this.postImage(img)
//           .then((result) => {
//             resolve(result);
//           })
//           .catch((err) => {
//             console.log(err);
//             reject(err);
//           });
//       });
//     }).timeout(time_until_timeout);
//   }

//   // Retrieves the quote (web-scraping)
//   getQuote(): Promise<any> {
//     return new Promise<any>((resolve, reject) => {
//       // Site to scrape
//       const scrapeURL = "https://www.insightoftheday.com";
//       // Selector containing the URL to the image
//       const selector = "div.daily-post > div.quote > a > p > img";
//       // Find the URL to the image
//       axios
//         .get(scrapeURL)
//         .then((response) => {
//           // Load HTML to parse it
//           const $ = load(response.data);
//           // Grab image url
//           const imgURL = $(selector)[0].attribs.src;
//           // Find extension (.JPG or .PNG)
//           const ext = imgURL.slice(imgURL.length - 4);
//           // Create tmp file to write to with correct extension
//           const tmpFile = file() + ext;
//           const fileWriter = createWriteStream(tmpFile);

//           // Grab the image
//           axios
//             .get(imgURL, { responseType: "stream" })
//             .then((response) => {
//               // Pipe the response to filewriter
//               response.data.pipe(fileWriter);

//               // If finished without errors, resolve with filename
//               fileWriter.on("finish", () => resolve(tmpFile));

//               // If errors, reject
//               fileWriter.on("error", (err) => reject(err));
//             })
//             .catch((err) => reject(err));
//         })
//         .catch((err) => reject(err));
//     });
//   }

//   // TODO: check if needed
//   postImage(img: string): Promise<any> {
//     return new Promise<any>((resolve) => {
//       resolve(img);
//     });
//   }

//   public exec(message: Message) {
//     // TODO: Send a file in stead.
//     // return message.util.send("This is some text");
//   }
// }

// export { QuoteOfTheDay };
