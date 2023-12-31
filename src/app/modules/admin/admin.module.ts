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
import { AddStaffComponent } from './staff/add-staff/add-staff.component';
import { StaffListComponent } from './staff/staff-list/staff-list.component';
import { CreatePasswordComponent } from './staff/create-password/create-password.component';
import { MeterPemitComponent } from './pemits/meter-pemit/meter-pemit.component';
import { HydrantPemitComponent } from './pemits/hydrant-pemit/hydrant-pemit.component';
import { OversizedVehiclesComponent } from './pemits/oversized-vehicles/oversized-vehicles.component';
import { MeterDetailsComponent } from './permitDetailsPage/meter-details/meter-details.component';
import { HydrantDetailsComponent } from './permitDetailsPage/hydrant-details/hydrant-details.component';
import { OversizedVehiclesDetailsComponent } from './permitDetailsPage/oversized-vehicles-details/oversized-vehicles-details.component';
import { AcceptSubmissionReviewComponent } from './accept-submission-review/accept-submission-review.component';
import { MeterFireDetailsComponent } from './permitDetailsPage/meter-fire-details/meter-fire-details.component';
import { MeterWaterDetailsComponent } from './permitDetailsPage/meter-water-details/meter-water-details.component';
import { AdvanceSearchComponent } from './advance-search/advance-search.component';
import { AddCityAdminComponent } from './city-admin/add-city-admin/add-city-admin.component';
import { CityAdminListComponent } from './city-admin/city-admin-list/city-admin-list.component';

@NgModule({
  declarations: [ApplicationsComponent,FilterPipe, PemitUpdateComponent, PermitDecisionsComponent,
     InspectionsComponent, ContratorDetailsComponent, DwlDetailsComponent, AddStaffComponent, StaffListComponent, CreatePasswordComponent,
      MeterPemitComponent, HydrantPemitComponent, OversizedVehiclesComponent, MeterDetailsComponent, HydrantDetailsComponent, OversizedVehiclesDetailsComponent, AcceptSubmissionReviewComponent, MeterFireDetailsComponent, MeterWaterDetailsComponent,
       AdvanceSearchComponent, AddCityAdminComponent, CityAdminListComponent],
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
