import { LogLevel } from "@sapphire/framework";
import { APIEmbed, GatewayIntentBits } from "discord.js";
import { Config } from "./Config";
import { AbyssClient } from "./AbyssClient";
import { Timestamp } from "./Timestamp";

const config: Config = new Config("config.json");

const discordBot: AbyssClient = new AbyssClient({
	"intents": [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMembers, GatewayIntentBits.MessageContent],
	"loadMessageCommandListeners": true,
	"loadDefaultErrorListeners": true,
	"logger": { "level": LogLevel.Debug }
});

discordBot.on("guildMemberRemove", (member) => {
	const embed: APIEmbed = {
		"title": `${member.user.username} has left the guild!`,
		"color": 16711680,
		"fields": [{ "name": "Username", "value": member.user.username, "inline": true }],
		"thumbnail": { "url": `${member.user.displayAvatarURL()}` },
		"footer": { "text": Timestamp.now() }
	};
	if (member.nickname) { embed.fields?.push({ "name": "IGN", "value": member.nickname, "inline": true }); }
	discordBot.sendEmbed(embed).then();
});

discordBot.login(config.get().token).then();

export { config, discordBot };