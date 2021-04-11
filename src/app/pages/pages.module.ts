import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';

import { PagesRoutingModule } from './pages-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NbCardModule, NbIconModule, NbPopoverModule,NbListModule,NbButtonModule} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AgmCoreModule } from '@agm/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AgmDirectionModule } from 'agm-direction';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';


const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    NbCardModule,
    NbEvaIconsModule,
    NbIconModule,
    NgxChartsModule,
    AgmCoreModule.forRoot({
      // please get your own API key here:
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en
      apiKey: 'AIzaSyDUNELdo7AGMDKfzLKZLh7N5sOIdJ53ZRI'
    }),
    NgxDatatableModule,
    NbPopoverModule,
    NbListModule,
    NbButtonModule,
    AgmDirectionModule,
    SocketIoModule.forRoot(config)

  ],
  declarations: [
    PagesComponent,
    DashboardComponent,

  ],
})
export class PagesModule {
}
