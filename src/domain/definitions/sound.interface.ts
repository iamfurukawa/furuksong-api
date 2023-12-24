export default interface SoundRepositoryBase {
    findAll(): Promise<Sound[]>;
    findOneBy(id: string): Promise<Sound | null>;
    findAllActives(): Promise<Sound[]>
    findAllInactive(): Promise<Sound[]>;
    save(sound: Sound, id: string): Promise<void>;
    update(sound: Sound, uuid: string): Promise<void>;
    deleteBy(uuid: string): Promise<void>;
}

export interface Sound {
    uuid?: string;
    name: string;
    tags: string[];
    url: string;
    hidden: boolean;
    ownerId: string;
    playedTimes: number;
}
