import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Tile } from '../../models/tile';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.css']
})
export class TileComponent implements OnInit {
  @Output() onTileFlagged = new EventEmitter();
  @Output() onTileUnflagged = new EventEmitter();  
  @Input() tile: Tile;
  public isMineHit: boolean;
  public tileStyle: any;

  ngOnInit() {
    this.isMineHit = false;
  }

  onRightClick(event: MouseEvent){
    event.preventDefault();
    this.tile.isFlagged = !this.tile.isFlagged;
    if(this.tile.isFlagged){
      this.onTileFlagged.emit();
    } else {
      this.onTileUnflagged.emit();
    }
  }

  setTileBorderAndBackground(){
    if(this.tile.isHidden && this.tile.isFlagged){
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

  get textColor(){
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