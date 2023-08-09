import { Listener } from "discord-akairo";
import { GuildMember, MessageEmbed } from "discord.js";
import { DiscordBot } from "../DiscordBot";
import { Timestamp } from "../Timestamp";

export class MemberLeaveListener extends Listener {
	private discordBot: DiscordBot;

	public constructor(discordBot: DiscordBot) {
		super("guildMemberRemove", {
			"emitter": "client",
			"event": "guildMemberRemove"
		});
		this.discordBot = discordBot;
	}

	public exec(member: GuildMember): any {
		const embed: MessageEmbed = new MessageEmbed()
			.setTitle(`${member.user.username} has left the guild!`)
			.setColor("FF0000")
			.addField("Username", `${member.user.username}#${member.user.discriminator}`, true)
			.setFooter(`${Timestamp.now()}`)
			.setThumbnail(`${member.user.avatarURL()}`);
		if (member.nickname) {
			embed.addField("IGN", `${member.nickname}`, true);
		}
		this.discordBot.sendEmbed(embed).then();
	}
}