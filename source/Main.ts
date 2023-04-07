import { DiscordBot } from "./DiscordBot";
import { MemberLeaveListener } from "./listeners/MemberLeaveListener";

let discordBot: DiscordBot = new DiscordBot();
discordBot.registerListener(new MemberLeaveListener(discordBot));
discordBot.start();