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
  public mineCount: number;
  public style: any;
  public isFlagged: boolean;

  constructor() { }

  ngOnInit() {
    this.mineCount = this.tile.mineCount;
    this.isFlagged = false;
  }

  onRightClick(event){
    this.isFlagged = !this.isFlagged;
  }

  determineStyle(){
    if(this.tile.isHidden && this.isFlagged){
      this.style = {
        'text-align': 'center',
        'display':'flex',
        'height':'35px',
        'width':'35px',
        'border':'2px outset rgb(61, 57, 57)',
        'background': 'center url(../../assets/flag.png) no-repeat',
        'background-size': 'contain'
      };
    }
    else if(this.tile.isHidden){
      this.style = {
        'text-align': 'center',
        'display':'flex',
        'height':'35px',
        'width':'35px',
        'border':'2px outset rgb(61, 57, 57)'
      };
    } else {
      this.style = {
        'text-align': 'center',
        'display':'flex',
        'height':'35px',
        'width':'35px',
        'border':'1px solid rgb(61, 57, 57)',
        'background-color':'rgb(212, 216, 221)'
      };
    }
    return this.style;
  }
}