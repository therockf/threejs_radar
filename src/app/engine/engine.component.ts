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

    this.url = 'wss://'+document.location.host+'/rdsocket';
    //this.url = 'ws://192.168.1.29:4080';
    //this.url = 'ws://192.168.1.160:4080';

    this.ws = webSocket(this.url);
    this.ws.pipe(
      share(),
      retry(50000),
      repeat(10000)
     ).subscribe({
      next : (data) => {

        try {
          if (parseInt(data.root.playerCount) !== 0) {
            const lista = data.list;
            if (lista !== null) {            
              if((this.items.length-1) != data.list.length){
                this.items = [ { id: 0, name: 'Select Player' } ];
                for (let i = 0; i < lista.length; i++) {
                  let value = { id: lista[i].name, name: lista[i].name }
                  this.items.push(value);
                }
                this.apiServ.sendUpdate(this.items);
              }
            }

            console.log(`Received ${data}`);
            this.engServ.updatePlayers(data);
          }
        } catch (e) {
          console.log(e);
        }
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
