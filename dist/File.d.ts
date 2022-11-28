export declare class File {
    docType?: string;
    owner: string;
    hash: string;
    timestamp: string;
    constructor(hash: string, timestamp: string, owner: string, docType?: string);
}
