import { Tile } from "./contracts/tile";

export class EmptyTile implements Tile {
    public readonly isMine: boolean;
    public isHidden: boolean;
    public isFlagged: boolean;
    public adjacentTileLocations: Array<[number,number]>;
    public adjacentMineCount: number;
    public xCoordinate: number;
    public yCoordinate: number;

    constructor(xCoordinate: number, yCoordinate: number){
        this.xCoordinate = xCoordinate;
        this.yCoordinate = yCoordinate;
        this.isMine = false;
        this.isHidden = true;
        this.isFlagged = false;
        this.adjacentMineCount = 0;
    }

    reveal(){
        this.isHidden = false;
    }
}
