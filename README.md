# DanBot

A bot written by Dan, for Dan. But, I guess that if anyone else wants to use it, they can go ahead.

## Coding DanBot

The bot is written using the ancient [Akairo](#) framework, so your developing experience may vary. I've extended Akairo to be able to use tasks - essentially, commands that run periodically without user interaction - using [TimedPromise](#)s.

For instance, if you want a daily digest every single day at 9AM, you can simply code it up, and the bot will automagically give you one without having to type `!daily` or a similar silly comment.

It should be noted that in order to run the bot, you need a folder `secret` with a file `token.ts` in it. This file contains a single line, exporting your bot token:

```ts
export default "MY.COOL.BOT.TOKEN";
```

You can also include a `owner.ts`, but I already forgot what it's used for.
