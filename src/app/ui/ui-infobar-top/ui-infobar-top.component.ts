import { Component, OnDestroy, OnInit } from '@angular/core';
import { EngineService } from '../../engine/engine.service';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-ui-infobar-top',
  templateUrl: './ui-infobar-top.component.html',
  styleUrls: ['./ui-infobar-top.component.css']
})
export class UiInfobarTopComponent implements OnInit, OnDestroy {

  selected = { id: 0, name: 'Select Player' };
  items = [ this.selected ];
  private subscription: Subscription;

  constructor(private engServ: EngineService, private apiServ: ApiService) {
    this.subscription = this.apiServ.getUpdate().subscribe
    (items => {
        this.items = items;
    });}

  getValues() {
    if ( this.selected !== undefined && this.selected !== null && this.selected.id !== 0 ) {
      this.engServ.playerid = this.selected.name;
      this.engServ.setPlayerName(this.selected.name, '0x000000');
    }
  }

  highVisual() {
    this.engServ.highVisual();
  }

  resetVisual() {
    this.engServ.resetVisual();
  }

  refreshVisual() {
    this.engServ.refreshVisual();
  }

  ngOnInit() {
  }

  ngOnDestroy() { // It's a good practice to unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
}

}
