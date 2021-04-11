import { Component, OnInit, ViewChild } from '@angular/core';
import {  ServiceService } from '../../services/service.service';
import { NbPopoverDirective, NbPosition, NbTrigger } from '@nebular/theme';
import * as moment from 'moment';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  single: any;
  dual:any;
  view: any[] = [400, 400];

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: string = 'below';
  legend: boolean = true;

  colorScheme = {
    domain: ['#c336a5', '#da6825']
  };
  riders = null
  drivers = null;
  trips = null;

  title: string = 'AGM project';
  lat: number = 9.016822;
  lng: number = 76.856644;
  zoom:number = 15;


  markers = []

  rows : any;
  columns:any;
  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }



  markerDragEnd(m: marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }


  @ViewChild(NbPopoverDirective) popover: NbPopoverDirective;
  start_end_mark = [];
  public origin: any;
public destination: any;
  public icon = {
    url: 'http://earth.google.com/images/kml-icons/track-directional/track-4.png',
    scaledSize: {
      width: 30,
      height: 30
    }
}

page = {
  limit: 2,
  count: 4,
  offset: 1,
  pageSize: 4
};


  constructor(private CS:ServiceService) {
    this.start_end_mark.push(this.markers[0]);
    this.start_end_mark.push(this.markers[this.markers.length - 1]);
   }

  ngOnInit(): void {
    this.CS.ridersDrivers({type:2}).subscribe(res => {
      console.log(res)
      this.riders = res.total;
    })
    this.CS.ridersDrivers({type:1}).subscribe(res => {
      console.log(res)
      this.drivers = res.total;
    })
    this.CS.chart({type:'user'}).subscribe(res => {
      console.log(res)
      this.single = res.chart;
    })
    this.CS.socketConnect().subscribe(res => {
      this.markers = res
    })
    this.origin = { lat: 24.799448, lng: 120.979021 };
    this.destination = { lat: 24.799524, lng: 120.975017 };

    this.getTripHistory();




  }


  getTripHistory(){
    let _this = this;
    _this.CS.chart({type:'trip'}).subscribe(res => {
      console.log(res)
      this.rows = res.tripDriver;
      this.columns = [
                      { name: 'Address' }, { name: 'BookedBy' }, { name: 'BookingNo' },
                      {name:'Date'},{name:'Destination'},{name:'Driver'},{name:'SourceLocation'},
                      {name:'TripType'}
                    ];
    })
  }

  datatablePageData(pageInfo: { count?: number, pageSize?: number, limit?: number, offset?: number }) {

  }


  converDate(date){
    return moment(date).format('L');

  }

  }




interface marker {
	lat: number;
	lng: number;
	label?: string;
	draggable: boolean;
}
