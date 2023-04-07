import { AkairoClient, Command, CommandHandler, Inhibitor, InhibitorHandler, Listener, ListenerHandler } from "discord-akairo";
import { MessageEmbed, TextChannel } from "discord.js";
import Config from "./Config";

export class DiscordBot extends AkairoClient {
	private commandHandler: CommandHandler;
	private inhibitorHandler: InhibitorHandler;
	private listenerHandler: ListenerHandler;

	public constructor() {
		super();
		this.commandHandler = new CommandHandler(this, {});
		this.inhibitorHandler = new InhibitorHandler(this, {});
		this.listenerHandler = new ListenerHandler(this, {});
		this.commandHandler.useInhibitorHandler(this.inhibitorHandler);
		this.commandHandler.useListenerHandler(this.listenerHandler);
		this.token = Config.token;
	}

	public start(): void {
		if (this.token !== null && this.token !== undefined) {
			this.login(this.token).then();
		}
	}

	public stop(): void {
		this.destroy();
	}

	public registerCommand(command: Command): void {
		this.commandHandler.register(command);
	}

	public registerInhibitor(inhibitor: Inhibitor): void {
		this.inhibitorHandler.register(inhibitor);
	}

	public registerListener(listener: Listener): void {
		this.listenerHandler.register(listener);
	}

	public async send(message: string): Promise<any> {
		if (message.trim().length === 0) {
			return Promise.resolve();
		}
		await (this.channels.cache.get(Config.channelID) as TextChannel).send(message);
	}

	public async sendEmbed(embed: MessageEmbed): Promise<void> {
		await (this.channels.cache.get(Config.channelID) as TextChannel).send(embed);
	}
}