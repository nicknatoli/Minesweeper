import { Injectable } from '@angular/core';
import { Difficulty } from '../models/contracts/difficulty';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class GameStateService {
  private _newGameSubject: Subject<Difficulty> = new Subject<Difficulty>();
  private _gameOverSubject: Subject<boolean> = new Subject<boolean>();
  private _tileFlagged: Subject<void> = new Subject<void>();
  private _tileUnflagged: Subject<void> = new Subject<void>();

  get newGame$(): Observable<Difficulty> {
    return this._newGameSubject.asObservable();
  }

  get gameOver$(): Observable<boolean> {
    return this._gameOverSubject.asObservable();
  }

  get tileFlagged$(): Observable<void> {
    return this._tileFlagged.asObservable();
  }

  get tileUnflagged$(): Observable<void> {
    return this._tileUnflagged.asObservable();
  }

  public newGame(difficulty: Difficulty): void {
    this._newGameSubject.next(difficulty);
  }

  public gameOver(gameWon: boolean): void {
    this._gameOverSubject.next(gameWon);
  }

  public flagTile(): void {
    this._tileFlagged.next();
  }

  public unflagTile(): void {
    this._tileUnflagged.next();
  }
}
