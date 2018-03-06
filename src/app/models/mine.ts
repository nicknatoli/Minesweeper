import { Tile } from "./contracts/tile";

export class Mine implements Tile {
    public readonly isMine: boolean;
    public isHidden: boolean;
    public adjacentTileLocations: Array<[number,number]>;
    public adjacentMineCount: number;
    public xCoordinate: number;
    public yCoordinate: number;

    constructor(x: number, y: number){
        this.xCoordinate = x;
        this.yCoordinate = y;
        this.isMine = true;
        this.isHidden = true;
    }

    reveal(){
        this.isHidden = false;
    }
}
