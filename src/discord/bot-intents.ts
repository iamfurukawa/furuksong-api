import { GatewayIntentBits, IntentsBitField } from "discord.js";

class BotIntents {

    private intents = new IntentsBitField();
    
    constructor() {
        this.intents.add(
            GatewayIntentBits.DirectMessages,
            GatewayIntentBits.MessageContent,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.GuildPresences,
            GatewayIntentBits.GuildMembers,
            GatewayIntentBits.GuildVoiceStates);
    }

    get Intents() {
        return { intents: this.intents }
    }
}

export default new BotIntents();