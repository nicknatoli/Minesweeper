import { Component, OnInit, Input } from '@angular/core';
import { Tile } from '../../models/tile';
import { GameStateService } from '../../services/game-state.service';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.css']
})
export class TileComponent implements OnInit {
  @Input() tile: Tile;
  
  public textColor: string;

  constructor(
    private readonly gameStateService: GameStateService
  ) {}

  ngOnInit() {
    this.textColor = this.getTextColor();
  }

  public onRightClick(event: MouseEvent): void {
    event.preventDefault();
    this.tile.isFlagged = !this.tile.isFlagged;
    if(this.tile.isFlagged){
      this.gameStateService.flagTile();
    } else {
      this.gameStateService.unflagTile();
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