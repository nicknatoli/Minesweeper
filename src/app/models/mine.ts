import { Tile } from "./contracts/tile";

export class Mine implements Tile {
    public readonly isMine: boolean;
    public isHidden: boolean;
    
    constructor(){
        this.isMine = true;
        this.isHidden = true;
    }

    reveal(){
        this.isHidden = false;
    }
}
