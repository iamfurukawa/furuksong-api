export default interface BotMessage {
    command: string;
    body: string;
}

export enum BotCommand {
    LIST = '/list',
    ADD = '/add',
    QUOTE = '/quote',
    REMOVE = '/remove',
    UNKNOWN = 'unknown',
}