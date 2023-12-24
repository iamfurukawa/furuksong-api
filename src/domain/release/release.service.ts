import RequestRepository from "../../infrastructrure/database/request";
import SoundRepository from "../../infrastructrure/database/sound";
import ReleaseRepository from "../../infrastructrure/database/release";
import { Release } from "../definitions/release.interface";
import { Request, RequestType } from "../definitions/request.interface";
import { Sound } from "../definitions/sound.interface";

import { v4 as uuid } from 'uuid';

class ReleaseService {

    async find(lasts: number) {
        console.log(`class=ReleaseService m=find stage=init lasts=${lasts}`);
        try {
            const releases = await ReleaseRepository.retrieveLast(lasts);
            console.log(`class=ReleaseService m=find stage=end`);
            return releases
        } catch (error) {
            console.error(`class=ReleaseService m=find stage=error error=${error}`);
            throw new Error(`Error on find lasts ${lasts} release`);
        }        
    }

    async create(requestId: string[]) {
        console.log(`class=ReleaseService m=create stage=init requestId=${requestId}`);
        let release = {
            uuid: uuid(),
            description: new Array<string>(),
            date: new Date(),
        } satisfies Release;

        for (const id of requestId) {
            const request = await RequestRepository.findOneBy(id);
            if (!request) return;
            const executeWithSuccess = await this.process(request);
            if (executeWithSuccess)
                release.description.push(`${request.type} - ${request.name || request.soundId}`);
        }

        console.log(`class=ReleaseService m=create stage=releasing release=${JSON.stringify(release)}`)
        if (release.description.length !== 0)
            await ReleaseRepository.save(release);

        console.log(`class=ReleaseService m=create stage=end`);
    }

    private async process(request: Request): Promise<boolean> {
        console.log(`class=ReleaseService m=process stage=init requestId=${request.uuid} requestType=${request.type}`);
        try {
            switch (request.type) {
                case RequestType.CREATE:
                    await this.newSound(request);
                    break;
                case RequestType.UPDATE:
                    await this.updateSound(request);
                    break;
                case RequestType.DELETE:
                    await this.deleteSound(request);
                    break;
                default:
                    console.error(`Request type ${request.type} not supported`);
            }

            await RequestRepository.deleteBy(request.uuid);
            return true;
        } catch (error) {
            console.error(`class=ReleaseService m=process stage=error error=${error}`);
            return false;
        }
    }

    private async newSound(request: Request) {
        console.log(`class=ReleaseService m=newSound stage=init request=${JSON.stringify(request)}`);
        await SoundRepository.save({
            name: request.name,
            tags: request.tags,
            url: request.url,
            hidden: false,
            ownerId: request.ownerId,
            playedTimes: 0
        } as Sound, request.soundId);
        console.log(`class=ReleaseService m=newSound stage=end`);
    }

    private async updateSound(request: Request) {
        console.log(`class=ReleaseService m=updateSound stage=init request=${JSON.stringify(request)}`);
        const sound = await SoundRepository.findOneBy(request.soundId);

        if (!sound) {
            console.error(`Sound ${request.soundId} not found`);
            return;
        }

        sound.name = request.name || sound.name;
        sound.tags = request.tags || sound.tags;
        
        delete sound.uuid
        await SoundRepository.update(sound, request.soundId);
        console.log(`class=ReleaseService m=updateSound stage=end`);
    }

    private async deleteSound(request: Request) {
        console.log(`class=ReleaseService m=deleteSound stage=init request=${JSON.stringify(request)}`);
        await SoundRepository.deleteBy(request.soundId);
        console.log(`class=ReleaseService m=deleteSound stage=end`);
    }
}

export default new ReleaseService();