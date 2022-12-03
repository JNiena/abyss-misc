import { Config } from "./Config";
import { DiscordBot } from "./DiscordBot";
import { MemberLeaveListener } from "./listeners/MemberLeaveListener";

let config: Config = new Config("config.json");
let discordBot: DiscordBot = new DiscordBot(config);
discordBot.registerListener(new MemberLeaveListener(config, discordBot));
discordBot.start();