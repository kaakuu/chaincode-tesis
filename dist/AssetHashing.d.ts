import { Context, Contract } from 'fabric-contract-api';
export declare class AssetTransferContract extends Contract {
    InitLedger(ctx: Context): Promise<void>;
    CreateAsset(ctx: Context, hash: string, timestamp: string, owner: string, docType?: string): Promise<void>;
    ReadAsset(ctx: Context, hash: string): Promise<string>;
    AssetExists(ctx: Context, hash: string): Promise<boolean>;
    TransferAsset(ctx: Context, hash: string, newOwner: string): Promise<void>;
    GetAllAssets(ctx: Context): Promise<string>;
}
