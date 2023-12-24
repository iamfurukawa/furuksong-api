export default interface QuoteRepositoryBase {
    save(quote: Quote): Promise<void>;
    retrieveAll(): Promise<Quote[]>;
}

export interface Quote {
    uuid: string;
    quote: string;
}