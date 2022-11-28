/*
  SPDX-License-Identifier: Apache-2.0
*/

import {Object, Property} from 'fabric-contract-api';

@Object()
export class File {

  @Property()
    public docType?: string;

    @Property()
    public owner: string;

    @Property()
    public hash: string;

    @Property()
    public timestamp: string;

    constructor( hash : string, timestamp : string, owner:string, docType?: string ){
      this.hash = hash;
      this.timestamp = timestamp;
      this.owner = owner;
      this.docType = docType;
    }

}
