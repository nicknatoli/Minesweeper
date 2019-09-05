import { Directive, HostBinding, OnChanges, Input } from '@angular/core';
import { GameStatus } from '../enums/game-status.enum';

@Directive({
  selector: '[gameStatusImg]'
})
export class GameStatusImgDirective {
  @Input("gameStatusImg") gameStatus: GameStatus;

  @HostBinding("class.game-status--new") new: boolean;
  @HostBinding("class.game-status--won") won: boolean;
  @HostBinding("class.game-status--lost") lost: boolean;

  constructor() { }

  public ngOnChanges(): void {
    this.updateBackgroundImg();
  }

  private updateBackgroundImg(){
    this.new = this.gameStatus === GameStatus.New;
    this.won = this.gameStatus === GameStatus.Won;
    this.lost = this.gameStatus === GameStatus.Lost;
  }
}
