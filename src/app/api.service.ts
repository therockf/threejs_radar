import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
    private sbj = new Subject<any>(); //need to create a subject

    sendUpdate(items) { //the component that wants to update something, calls this fn
        this.sbj.next(items); //next() will feed the value in Subject
    }

    getUpdate(): Observable<any> { //the receiver component calls this function 
        return this.sbj.asObservable(); //it returns as an observable to which the receiver funtion will subscribe
    }
}