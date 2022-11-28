"use strict";
/*
  SPDX-License-Identifier: Apache-2.0
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
exports.File = void 0;
const fabric_contract_api_1 = require("fabric-contract-api");
let File = class File {
    constructor(hash, timestamp, owner, docType) {
        this.hash = hash;
        this.timestamp = timestamp;
        this.owner = owner;
        this.docType = docType;
    }
};
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", String)
], File.prototype, "docType", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", String)
], File.prototype, "owner", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", String)
], File.prototype, "hash", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", String)
], File.prototype, "timestamp", void 0);
File = __decorate([
    fabric_contract_api_1.Object(),
    __metadata("design:paramtypes", [String, String, String, String])
], File);
exports.File = File;
//# sourceMappingURL=File.js.map