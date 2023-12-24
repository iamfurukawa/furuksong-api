import {
    ChannelType,
    Client,
    Collection,
    Guild,
    VoiceChannel
} from "discord.js";

class ChannelService {

    guilds: Collection<string, Guild>;

    constructor(client: Client) {
        this.guilds = client.guilds.cache;
    }

    async findChannelByUserBy(id: string): Promise<VoiceChannel> {
        if (!id) throw new Error('Invalid user id');

        for (const guild of this.guilds.values()) {
            const channels = await guild.channels.fetch();

            for (const channel of channels.values()) {
                if (channel && channel.type === ChannelType.GuildVoice) {
                    for (const member of channel.members.values()) {
                        if (member.user.username === id) {
                            return channel;
                        }
                    }
                }
            }
        }

        throw new Error('User not found')
    }
}

export default ChannelService;
