export default interface ReleaseRepositoryBase {
    save(release: Release): Promise<void>;
    retrieveLast(lasts: number): Promise<Release[]>;
}

export interface Release {
    uuid: string;
    description: string[];
    date: Date;
}
