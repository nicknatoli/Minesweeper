export interface Tile {
    readonly isMine: boolean;
    isHidden: boolean;
    isFlagged: boolean;
    adjacentTileLocations: Array<[number,number]>;
    adjacentMineCount: number;
    xCoordinate: number;
    yCoordinate: number;
    
    reveal();
}
