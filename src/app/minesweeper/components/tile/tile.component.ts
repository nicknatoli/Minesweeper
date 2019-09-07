import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'minesweeper-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TileComponent {
  @Input() isMine: boolean;
  @Input() isHidden: boolean;
  @Input() isFlagged: boolean;
  @Input() adjacentMineCount: number; 

  get textColor(): string {
    switch (this.adjacentMineCount) {
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