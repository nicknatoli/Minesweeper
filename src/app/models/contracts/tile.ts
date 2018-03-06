export interface Tile {
    readonly isMine: boolean;
    isHidden: boolean;
    adjacentTileLocations: Array<[number,number]>;
    mineCount: number;
    xCoordinate: number;
    yCoordinate: number;
    
    reveal();
}
