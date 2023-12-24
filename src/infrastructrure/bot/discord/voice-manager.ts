import { VoiceChannel } from 'discord.js';

import {
    AudioPlayer,
    joinVoiceChannel,
    createAudioPlayer,
    createAudioResource,
    AudioPlayerStatus
} from '@discordjs/voice';

// interface PlayerInfo {
//     player: AudioPlayer;
//     sound: string;
//     isPlaying: boolean;
// }

class VoiceManager {
    //TODO: cache das guilds
    //private audioPlayers = new Map<String, PlayerInfo>();

    private disconnectTimeout;

    private timeout;

    constructor() {
        this.disconnectTimeout = setTimeout(() => {}, 1);
        this.timeout = parseInt(process.env.DISCONNECT_IN_MINUTES || '5') * 60000;
    }

    play(audioUrl: string, voiceChannel: VoiceChannel) {
        clearTimeout(this.disconnectTimeout);

        const connection = joinVoiceChannel({
            guildId: voiceChannel.guildId,
            channelId: voiceChannel.id,
            adapterCreator: voiceChannel.guild.voiceAdapterCreator,
            selfMute: false
        });

        const player = createAudioPlayer();
        const resource = createAudioResource(audioUrl);
        player.play(resource);
        connection.subscribe(player);

        player.on(AudioPlayerStatus.Playing, (_, __) => {
            console.log('Audio player is in the Playing state!');
        });

        player.on(AudioPlayerStatus.Idle, () => {
            this.disconnectTimeout = setTimeout(() => {
                connection.disconnect();
            }, this.timeout);
        });
    }
}

export default new VoiceManager();