export interface Tile {
    readonly isMine: boolean;
    isHidden: boolean;
    adjacentTileLocations: Array<[number,number]>;
    adjacentMineCount: number;
    xCoordinate: number;
    yCoordinate: number;
    
    reveal();
}
