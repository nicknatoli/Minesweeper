import { Component, OnInit, Input } from '@angular/core';
import { Tile } from '../../models/contracts/tile';
import { EmptyTile } from '../../models/empty-tile';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.css']
})
export class TileComponent implements OnInit {
  @Input() tile: Tile;
  public isFlagged: boolean;
  public isMineHit: boolean;
  public tileStyle: any;

  ngOnInit() {
    this.isFlagged = false;
    this.isMineHit = false;
  }

  onRightClick(event: MouseEvent){
    this.isFlagged = !this.isFlagged;
  }

  setTileBorderAndBackground(){
    if(this.tile.isHidden && this.isFlagged){
      return {
        'border':'2px outset rgb(61, 57, 57)',
        'background': 'center url(../../assets/flag.PNG) no-repeat',
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

  setAdjacentMineCountTextColor(){
    switch(this.tile.adjacentMineCount){
      case 1:
        return {'color': 'blue'};
      case 2:
        return {'color': 'green'};
      case 3:
        return {'color': 'red'};
      case 4:
        return {'color': 'purple'};
      case 5:
        return {'color': 'darkred'};
      case 6:
        return {'color': 'turquoise'}
      case 7: 
        return {'color': 'black'}
      case 8: 
        return {'color': 'darkgray'}
    }
  }
}