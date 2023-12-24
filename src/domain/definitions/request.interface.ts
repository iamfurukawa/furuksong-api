export default interface RequestRepositoryBase {
    findAll(): Promise<Request[]>;
    findOneBy(id: string): Promise<Request | null>
    findMyRequestsBy(id: string): Promise<Request[]>
    save(request: Request): Promise<void>;
    deleteBy(uuid: string): Promise<void>;
}

export interface Request {
    uuid: string;
    soundId: string;
    name: string;
    tags: string[];
    url: string;
    type: RequestType;
    comment: string;
    ownerId: string;
}

export enum RequestType {
    CREATE = "CREATE",
    UPDATE = "UPDATE",
    DELETE = "DELETE"
}

const parseRequest = (value: string): RequestType | null => {
    if (Object.keys(RequestType).includes(value as RequestType))
        return RequestType[value as keyof typeof RequestType];
    return null;
}

export { parseRequest }