import { Component, ElementRef, OnInit, ViewChild,
  ChangeDetectionStrategy,
  ChangeDetectorRef, 
  OnChanges,
  Inject} from '@angular/core';
import { EngineService } from './engine.service';
import { webSocket, WebSocketSubject } from "rxjs/webSocket";
import { ApiService } from '../api.service';
import { retry } from "rxjs/operators";
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-engine',
  templateUrl: './engine.component.html'
})
export class EngineComponent implements OnInit {

  ws : WebSocketSubject<any>;

  selected = { id: 0, name: 'Select Player' };
  items = [ this.selected ];
  
  constructor(@Inject(DOCUMENT) private document, private apiServ: ApiService,  private engServ: EngineService) {

    this.ws = webSocket('ws://'+document.location.host+'/rxsocket');
    this.ws.pipe(retry(99999999)).subscribe({
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
      error : (err) => console.log(`Error ${err}`),
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
