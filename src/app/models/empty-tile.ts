import { Tile } from "./contracts/tile";

export class EmptyTile implements Tile {
    public readonly isMine: boolean;
    public isHidden: boolean;
    public adjacentTiles: Tile[];
    public mineCount: number;

    constructor(){
        this.isMine = false;
        this.isHidden = true;
    }

    reveal(){
        this.isHidden = false;
    }
}
