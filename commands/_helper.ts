import type { Command } from "discord-akairo";
import type { Message } from "discord.js";
import type DanBot from "..";

export function get_client(me: Command): DanBot {
  return me.client as DanBot;
}

export function get_task_IDs(client: DanBot): string[] {
  return client.taskHandler.tasks.keyArray();
}

export function handle_empty_arguments(me: Command, message: Message): Promise<Message> {
  // TODO: Change string based on command
  const str = "Try providing a valid task. Don't know the name? Use the `task list` command in stead!";
  return message.util.send(str);
}

export function handle_too_many_arguments(me: Command, message: Message): Promise<Message> {
  const str = "Too many arguments have been provided!";
  return message.util.send(str);
}

export function retrieve_task_information(client: DanBot): Array<String> {
  return client.taskHandler.tasks.keyArray();
}

export function get_result_emote(success: boolean): string {
  return success ? "👌" : "🛑";
}
