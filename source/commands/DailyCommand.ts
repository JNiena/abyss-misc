import { Command } from "discord-akairo";
import { Message } from "discord.js";
import { Config } from "../Config";

export class DailyCommand extends Command {

  private config: Config;
  private data: Config;

  public constructor(config: Config) {
    super("daily", { "aliases": ["daily"] });
    this.config = config;
    this.data = new Config("data.json");
    setTimeout(() => {
      this.tick();
    }, this.config.get()["daily"]["tick"]);
  }

  public async exec(message: Message, args: any): Promise<any> {
    if (this.exists(message.author.id)) {
      if (this.time(message.author.id) <= 0) {
        return message.channel.send("Your daily rewards have been successfully claimed!");
      } else {
        return message.channel.send("You've already claimed your daily rewards!");
      }
    }
    else {
      message.channel.send("Your daily rewards have been successfully claimed!");
      this.initialize(message.author.id);
    }
  }

  private exists(id: string): boolean {
    for (let i = 0; i < this.data.get(); i++) {
      if (this.data.get()[i]["id"] === id) {
        return true;
      }
    }
    return false;
  }

  private time(id: string): number {
    for (let i = 0; i < this.data.get(); i++) {
      if (this.data.get()[i] === id) {
        return this.data.get()[i]["time"];
      }
    }
    return 0;
  }

  private initialize(id: string): void {
    this.data.get().push({
      "id": id,
      "time": this.config.get()["daily"]["cooldown"]
    });
    this.data.save();
  }

  private tick(): void {
    for (let i = 0; i < this.data.get(); i++) {
      if (this.data.get()[i]["time"] > 0) {
        this.data.get()[i]["time"] -= this.config.get()["daily"]["tick"];
      }
    }
    this.data.save();
  }

}

/*
{
  "discord": {
    "token": "OTEyNTgwOTIxMDI5NDQ3NzQw.GfM8HF.5GDwOiy_POuweqvZW3ka7jaMRTEoEKq7dcyGbE",
    "prefix": "!"
  },
  "leave": {
    "channelID": "980542847176573020"
  },
  "daily": {
    "cooldown": 86400000,
    "tick": 3600000
  }
}
*/