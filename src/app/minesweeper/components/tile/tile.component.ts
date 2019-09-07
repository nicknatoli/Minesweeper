import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Tile } from '../../models/tile';
import { GameStateService } from '../../services/game-state.service';
import { GameBoardService } from '../../services/game-board.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TileComponent implements OnInit {
  @Input() tile: Tile;
  
  public textColor: string;
  private updateTileSubscription: Subscription;

  constructor(
    private _gameStateService: GameStateService,
    private _gameBoardService: GameBoardService,
    private _changeDetectorRef: ChangeDetectorRef
  ) {
    this.updateTileSubscription = this._gameBoardService.mineField$.subscribe(() => this._changeDetectorRef.detectChanges());
  }

  ngOnInit(): void {
    this.textColor = this.getTextColor();
  }

  ngOnDestroy(): void {
    this.updateTileSubscription.unsubscribe();
  }

  public onRightClick(event: MouseEvent): void {
    event.preventDefault();
    this.tile.isFlagged = !this.tile.isFlagged;
    if(this.tile.isFlagged){
      this._gameStateService.flagTile();
    } else {
      this._gameStateService.unflagTile();
    }
  }

  private getTextColor(): string {
    switch(this.tile.adjacentMineCount){
      case 1:
        return "blue";
      case 2:
        return "green";
      case 3:
        return "red";
      case 4:
        return "purple";
      case 5:
        return "darkred";
      case 6:
        return "turquoise";
      case 7: 
        return "black";
      case 8: 
        return "darkgray";
    }
  }
}