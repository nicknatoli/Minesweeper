export interface Tile {
    readonly isMine: boolean;
    isHidden: boolean;
    reveal();
}
