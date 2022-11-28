"use strict";
/*
 * SPDX-License-Identifier: Apache-2.0
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetTransferContract = void 0;
const fabric_contract_api_1 = require("fabric-contract-api");
const File_1 = require("./File");
let AssetTransferContract = class AssetTransferContract extends fabric_contract_api_1.Contract {
    async InitLedger(ctx) {
        const file = new File_1.File('msoa1m232zx1323', new Date().toISOString(), 'TestAdm');
        file.docType = 'test-hashing';
        await ctx.stub.putState(file.hash, Buffer.from(JSON.stringify(file)));
        console.info(`File ${file.hash} initialized`);
    }
    // CreateAsset issues a new asset to the world state with given details.
    async CreateAsset(ctx, hash, timestamp, owner, docType) {
        const file = {
            hash,
            timestamp,
            owner,
            docType
        };
        await ctx.stub.putState(hash, Buffer.from(JSON.stringify(file)));
    }
    // ReadAsset returns the file stored in the world state with given hash.
    async ReadAsset(ctx, hash) {
        const fileJSON = await ctx.stub.getState(hash);
        if (!fileJSON || fileJSON.length === 0)
            throw new Error(`The file with hash ${hash} does not exist`);
        return fileJSON.toString();
    }
    // UpdateAsset updates an existing asset in the world state with provided parameters.
    async AssetExists(ctx, hash) {
        const fileJSON = await ctx.stub.getState(hash);
        return fileJSON && fileJSON.length > 0;
    }
    // TransferAsset updates the owner field of asset with given hash in the world state.
    async TransferAsset(ctx, hash, newOwner) {
        const assetString = await this.ReadAsset(ctx, hash);
        const asset = JSON.parse(assetString);
        asset.owner = newOwner;
        await ctx.stub.putState(hash, Buffer.from(JSON.stringify(asset)));
    }
    // GetAllAssets returns all assets found in the world state.
    async GetAllAssets(ctx) {
        const allResults = [];
        // range query with empty string for startKey and endKey does an open-ended query of all assets in the chaincode namespace.
        const iterator = await ctx.stub.getStateByRange('', '');
        let result = await iterator.next();
        while (!result.done) {
            const strValue = Buffer.from(result.value.value.toString()).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            }
            catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push({ Key: result.value.key, Record: record });
            result = await iterator.next();
        }
        return JSON.stringify(allResults);
    }
};
__decorate([
    fabric_contract_api_1.Transaction(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context]),
    __metadata("design:returntype", Promise)
], AssetTransferContract.prototype, "InitLedger", null);
__decorate([
    fabric_contract_api_1.Transaction(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String, String, String, String]),
    __metadata("design:returntype", Promise)
], AssetTransferContract.prototype, "CreateAsset", null);
__decorate([
    fabric_contract_api_1.Transaction(false),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], AssetTransferContract.prototype, "ReadAsset", null);
__decorate([
    fabric_contract_api_1.Transaction()
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
    ,
    fabric_contract_api_1.Transaction(false),
    fabric_contract_api_1.Returns('boolean'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], AssetTransferContract.prototype, "AssetExists", null);
__decorate([
    fabric_contract_api_1.Transaction(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String, String]),
    __metadata("design:returntype", Promise)
], AssetTransferContract.prototype, "TransferAsset", null);
__decorate([
    fabric_contract_api_1.Transaction(false),
    fabric_contract_api_1.Returns('string'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context]),
    __metadata("design:returntype", Promise)
], AssetTransferContract.prototype, "GetAllAssets", null);
AssetTransferContract = __decorate([
    fabric_contract_api_1.Info({ title: 'AssetHashing', description: 'Smart contract for upload hash files' })
], AssetTransferContract);
exports.AssetTransferContract = AssetTransferContract;
//# sourceMappingURL=AssetHashing.js.map