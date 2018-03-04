import { Injectable } from '@angular/core';
import { Tile } from './contracts/tile';

@Injectable()
export class GameBoard {
    public mineField: Array<Array<Tile>>;
    public height: number;
    public width: number;
    public mines: number;
}
