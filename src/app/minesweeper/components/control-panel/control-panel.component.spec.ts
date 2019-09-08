import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlPanelComponent } from './control-panel.component';
import { GameStateService } from '../../services/game-state.service';
import { ControlPanelService } from '../../services/control-panel.service';
import { GameStatusImgDirective } from '../../directives/game-status-img.directive';

describe('ControlPanelComponent', () => {
  let component: ControlPanelComponent;
  let fixture: ComponentFixture<ControlPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        ControlPanelComponent,
        GameStatusImgDirective
      ],
      providers: [
        GameStateService,
        ControlPanelService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
