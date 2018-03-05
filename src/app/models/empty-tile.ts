import { Tile } from "./contracts/tile";

export class EmptyTile implements Tile {
    public readonly isMine: boolean;
    public isHidden: boolean;
    public adjacentTileLocations: Array<[number,number]>;
    public mineCount: number;

    constructor(){
        this.isMine = false;
        this.isHidden = true;
        this.mineCount = 0;
    }

    reveal(){
        this.isHidden = false;
    }
}