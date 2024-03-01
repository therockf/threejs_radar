import { Component, ElementRef, OnInit, ViewChild,
  ChangeDetectionStrategy,
  ChangeDetectorRef, 
  OnChanges,
  Inject} from '@angular/core';
import { EngineService } from './engine.service';
import { webSocket, WebSocketSubject } from "rxjs/webSocket";
import { ApiService } from '../api.service';
import { repeat, retry, share, take } from "rxjs/operators";
import { DOCUMENT } from '@angular/common';
import { pipe } from 'rxjs';

@Component({
  selector: 'app-engine',
  templateUrl: './engine.component.html'
})
export class EngineComponent implements OnInit {

  ws : WebSocketSubject<any>;

  selected = { id: 0, name: 'Select Player' };
  items = [ this.selected ];
  url = '';
  
  constructor(@Inject(DOCUMENT) private document, private apiServ: ApiService,  private engServ: EngineService) {

    this.url = 'ws://'+document.location.host+'/rdsocket';

    this.ws = webSocket(this.url);
    this.ws.pipe(
      share(),
      retry(5000),
      repeat(10000)
     ).pipe(take(1)).subscribe({
      next : (data) => {

        const lista = data.list;

        if(this.items.length != data.list.length){
          this.items = [ { id: 0, name: 'Select Player' } ];
          for (let i = 0; i < lista.length; i++) {
            let value = { id: lista[i].name, name: lista[i].name }
            this.items.push(value);
          }
          this.apiServ.sendUpdate(this.items);
        }

        console.log(`Received ${data}`);
        this.engServ.updatePlayers(data);
      },
      error : (err) => {
        console.log(`Error ${err}. URL: ${this.url}`)
      },
      complete : () => {}
    });
  }
  title = 'threejs_radar';

  @ViewChild('rendererCanvas', { static: true })
  public rendererCanvas: ElementRef<HTMLCanvasElement>;

  ngOnInit() {
    this.engServ.createScene(this.rendererCanvas);
  }
 

}
