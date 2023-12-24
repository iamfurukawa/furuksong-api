export default interface StorageBase {
    getFileURLBy(fileName: string): Promise<string>;
}