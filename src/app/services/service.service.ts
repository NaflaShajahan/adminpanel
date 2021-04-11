import { Injectable } from '@angular/core';
import { constants  } from '../constants/constant';
import { environment} from 'environments/environment';
import { HttpService} from '../@core/http/http.service';
import { Observable, BehaviorSubject, observable} from 'rxjs';
import {io} from 'socket.io-client';
@Injectable({
  providedIn: 'root',
})
export class ServiceService {

 private socket;

  constructor(private httpService: HttpService) {
    this.socket = io(environment.backend, { transports : ['websocket'] });
   }

  login(params) {
    return new Observable<any>(observer => {
      this.httpService
        .post(
          environment.backend + constants.ENDPOINTS. LOGIN,
          params
        )
        .subscribe(res => {
          observer.next(res);
          observer.complete();
        });
    });
  }

  ridersDrivers(params) {
    return new Observable<any>(observer => {
      this.httpService
        .post(
          environment.backend + constants.ENDPOINTS. RIDERSDRIVERS,
          params
        )
        .subscribe(res => {
          observer.next(res);
          observer.complete();
        });
    });
  }

  chart(params) {
    return new Observable<any>(observer => {
      this.httpService
        .post(
          environment.backend + constants.ENDPOINTS. CHART,
          params
        )
        .subscribe(res => {
          observer.next(res);
          observer.complete();
        });
    });
  }
  socketConnect() {
    return new Observable<any>(observer => {
      var data ;
     this.socket.on('salutations', (res) => {
          console.log("Received message from Websocket Server",res)
          data = res
          observer.next(data);
        })



    });
  }

}
