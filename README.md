# DanBot

A bot written by Dan, for Dan. But, I guess that if anyone else wants to use it, they can go ahead.

## Coding DanBot

The bot is written using the ancient [Akairo](https://discord-akairo.github.io/#/) framework, so your
developing experience may vary. I've extended Akairo to be able to use tasks - essentially,
commands that run periodically without user interaction -
using [TimedPromise](https://www.npmjs.com/package/@dbarenholz/timed-promise)s
([documentation](https://dbarenholz.github.io/timed-promise/)).

For instance, if you want a daily digest every 24 hours, you can simply code it up,
and the bot will automagically give you one without having to type `!daily` on daily basis, or a similar silly comment.

It should be noted that in order to run the bot, you need a folder `secret` with a file `token.ts` in it. This file contains a single line, exporting your bot token:

```ts
export default "MY.COOL.BOT.TOKEN";
```

You can also include a `owner.ts`, but I already forgot what it's used for.
