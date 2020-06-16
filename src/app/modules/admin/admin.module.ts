import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ApplicationsComponent } from './applications/applications.component';
import { PemitUpdateComponent } from './pemit-update/pemit-update.component';
import { LayoutsModule } from 'src/app/core/layouts.module';
import { PermitDecisionsComponent } from './permit-decisions/permit-decisions.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { InspectionsComponent } from './inspections/inspections.component';
import { ContratorDetailsComponent } from './contrator-details/contrator-details.component';
import { AgmCoreModule } from '@agm/core';            // @agm/core
import { FilterPipe } from 'src/app/core/pipe/search.pipe';

import {NgxPaginationModule} from 'ngx-pagination';
import { DwlDetailsComponent } from './dwl-details/dwl-details.component';

@NgModule({
  declarations: [ApplicationsComponent,FilterPipe, PemitUpdateComponent, PermitDecisionsComponent, InspectionsComponent, ContratorDetailsComponent, DwlDetailsComponent],
  imports: [
  
    CommonModule,
    AdminRoutingModule,
    NgxPaginationModule,
    LayoutsModule,
    BsDatepickerModule.forRoot(),
    AgmCoreModule.forRoot({ // @agm/core
      apiKey: 'AIzaSyAkq7DnUBTkddWXddoHAX02Srw6570ktx8',
    }),

  ]
})
export class AdminModule { }
