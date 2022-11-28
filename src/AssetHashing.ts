/*
 * SPDX-License-Identifier: Apache-2.0
 */

import {Context, Contract, Info, Returns, Transaction} from 'fabric-contract-api';
import {File} from './File';

@Info({title: 'AssetHashing', description: 'Smart contract for upload hash files'})
export class AssetTransferContract extends Contract {

    @Transaction()
    public async InitLedger(ctx: Context): Promise<void> {  
        
        const file = new File('msoa1m232zx1323', new Date().toISOString(), 'TestAdm' );
       
        file.docType = 'test-hashing';
        await ctx.stub.putState(file.hash, Buffer.from(JSON.stringify(file)));
        console.info(`File ${file.hash} initialized`);

    }

    // CreateAsset issues a new asset to the world state with given details.
    @Transaction()
    public async CreateAsset(ctx: Context, hash: string, timestamp: string, owner: string, docType?: string): Promise<void> {
        const file : File = {
            hash,
            timestamp,
            owner,
            docType
        }

        await ctx.stub.putState(hash, Buffer.from(JSON.stringify(file) ) );
    }

    // ReadAsset returns the file stored in the world state with given hash.
    @Transaction(false)
    public async ReadAsset(ctx: Context, hash: string): Promise<string> {
        const fileJSON = await ctx.stub.getState(hash); 
        if (!fileJSON || fileJSON.length === 0) 
            throw new Error(`The file with hash ${hash} does not exist`);
        
        return fileJSON.toString();
    }

    // UpdateAsset updates an existing asset in the world state with provided parameters.
    @Transaction()
    // public async UpdateAsset(ctx: Context, hash: string, timestamp: string, owner: string, docType?: string): Promise<void> {
    //     const exists = await this.AssetExists(ctx, hash);
    //     if (!exists) 
    //         throw new Error(`The asset ${hash} does not exist`);        

    //     // overwriting original asset with new asset
    //     const updateFile : File = {
    //         hash,
    //         timestamp,
    //         owner,
    //         docType
    //     }
    //     return ctx.stub.putState(hash, Buffer.from(JSON.stringify(updateFile)));
    // }

    // DeleteAsset deletes an given asset from the world state.
    // @Transaction()
    // public async DeleteAsset(ctx: Context, hash: string): Promise<void> {
    //     const exists = await this.AssetExists(ctx, hash);
    //     if (!exists) 
    //         throw new Error(`The file with hash ${hash} does not exist`);
        
    //     return ctx.stub.deleteState(hash);
    // }

    // AssetExists returns true when asset with given HASH exists in world state.
    @Transaction(false)
    @Returns('boolean')
    public async AssetExists(ctx: Context, hash: string): Promise<boolean> {
        const fileJSON = await ctx.stub.getState(hash);
        return fileJSON && fileJSON.length > 0;
    }

    // TransferAsset updates the owner field of asset with given hash in the world state.
    @Transaction()
    public async TransferAsset(ctx: Context, hash: string, newOwner: string): Promise<void> {
        const assetString = await this.ReadAsset(ctx, hash);
        const asset : File = JSON.parse(assetString);
        asset.owner = newOwner;
        await ctx.stub.putState(hash, Buffer.from(JSON.stringify(asset)));
    }

    // GetAllAssets returns all assets found in the world state.
    @Transaction(false)
    @Returns('string')
    public async GetAllAssets(ctx: Context): Promise<string> {
        const allResults = [];
        // range query with empty string for startKey and endKey does an open-ended query of all assets in the chaincode namespace.
        const iterator = await ctx.stub.getStateByRange('', '');
        let result = await iterator.next();
        while (!result.done) {
            const strValue = Buffer.from(result.value.value.toString()).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push({Key: result.value.key, Record: record});
            result = await iterator.next();
        }
        return JSON.stringify(allResults);
    }

}
