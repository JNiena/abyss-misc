import { Listener } from "discord-akairo";
import { GuildMember } from "discord.js";
import { Config } from "../Config";
import { DiscordBot } from "../DiscordBot";

export class MemberLeaveListener extends Listener {

	private ID: string;
	private discordBot: DiscordBot;

	public constructor(config: Config, discordBot: DiscordBot) {
		super("guildMemberRemove", {
			"emitter": "client",
			"event": "guildMemberRemove"
		});
		this.ID = config.get()["discord"]["channelID"];
		this.discordBot = discordBot;
	}

	public exec(member: GuildMember): any {
		this.discordBot.send(`**${member.user.username + (member.nickname ? ` (IGN: ${member.nickname})` : "")} has left the guild.**`, this.ID).then();
	}

}