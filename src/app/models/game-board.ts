import { Injectable } from '@angular/core';

@Injectable()
export class GameBoard {
    public mineField: Array<Array<any>>;
    public height: number;
    public width: number;
}
