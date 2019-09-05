import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Tile } from '../../models/tile';
import { GameStateService } from '../../services/game-state.service';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.css']
})
export class TileComponent implements OnInit {
  @Input() tile: Tile;
  public isMineHit: boolean;
  public tileStyle: any;

  constructor(
    private readonly gameStateService: GameStateService
  ){}

  ngOnInit() {
    this.isMineHit = false;
  }

  onRightClick(event: MouseEvent){
    event.preventDefault();
    this.tile.isFlagged = !this.tile.isFlagged;
    if(this.tile.isFlagged){
      this.gameStateService.flagTile();
    } else {
      this.gameStateService.unflagTile();
    }
  }

  setTileBorderAndBackground(){
    if(this.tile.isHidden && this.tile.isFlagged){
      return {
        'border':'2px outset rgb(61, 57, 57)',
        'background': 'center url(./images/flag.PNG) no-repeat',
        'background-size': 'contain'
      };
    }
    else if(this.tile.isHidden){
      return {
        'border':'2px outset rgb(61, 57, 57)'
      };
    } else if(this.isMineHit) {
      return {
        'border':'1px solid rgb(61, 57, 57)',
        'background-color':'red'
      };
    } else {
      return {
        'border':'1px solid rgb(61, 57, 57)',
        'background-color':'rgb(212, 216, 221)'
      };
    }
  }

  setMineColor(){
    if(this.tile.isMine){
      this.isMineHit = true;
    }
  }

  get textColor(){
    switch(this.tile.adjacentMineCount){
      case 1:
        return "blue";
      case 2:
        return "green"
      case 3:
        return "red"
      case 4:
        return "purple"
      case 5:
        return "darkred"
      case 6:
        return "turquoise"
      case 7: 
        return "black"
      case 8: 
        return "darkgray"
    }
  }
}