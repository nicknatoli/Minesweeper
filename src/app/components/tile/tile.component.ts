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

  constructor() { }

  ngOnInit() {
    this.mineCount = this.tile.mineCount;
  }


}