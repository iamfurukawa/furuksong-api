import { Client } from "discord.js";
import BotIntents from "./bot-intents";
import ChannelService from "./channel";

class DiscordClient {

    private channelService;
    
    private client;

    constructor() {
        this.client = new Client(BotIntents.Intents);
        this.client.login(process.env.BOT_KEY!);
        this.channelService = new ChannelService(this.client);
    }

    get ChannelService() {
        return this.channelService;
    }

    get Client() {
        return this.client;
    }
}

export default new DiscordClient();