import { Tile } from "./contracts/tile";

export class Mine implements Tile {
    public readonly isMine: boolean;
    public isHidden: boolean;
    public adjacentTileLocations: Array<[number,number]>;
    public mineCount: number;
    
    constructor(){
        this.isMine = true;
        this.isHidden = true;
    }

    reveal(){
        this.isHidden = false;
    }
}
