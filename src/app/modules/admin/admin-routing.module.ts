import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApplicationsComponent } from './applications/applications.component';
import { PemitUpdateComponent } from './pemit-update/pemit-update.component';
import { DwlDetailsComponent } from './dwl-details/dwl-details.component';
import { AddStaffComponent } from './staff/add-staff/add-staff.component';
import { StaffListComponent } from './staff/staff-list/staff-list.component';
import { CreatePasswordComponent } from './staff/create-password/create-password.component';
import { MeterPemitComponent } from './pemits/meter-pemit/meter-pemit.component';
import { OversizedVehiclesComponent } from './pemits/oversized-vehicles/oversized-vehicles.component';
import { HydrantPemitComponent } from './pemits/hydrant-pemit/hydrant-pemit.component';
import { MeterDetailsComponent } from './permitDetailsPage/meter-details/meter-details.component';
import { HydrantDetailsComponent } from './permitDetailsPage/hydrant-details/hydrant-details.component';
import { OversizedVehiclesDetailsComponent } from './permitDetailsPage/oversized-vehicles-details/oversized-vehicles-details.component';
import { MeterFireDetailsComponent } from './permitDetailsPage/meter-fire-details/meter-fire-details.component';
import { MeterWaterDetailsComponent } from './permitDetailsPage/meter-water-details/meter-water-details.component';


// const routes: Routes = [
//   {
//     path: 'applications',
//     component: ApplicationsComponent
//   }
// ];

const routes: Routes = [
  {
    path: 'permit',
    children: [
      {
        path: 'applications',
        component: ApplicationsComponent
      },
      {
        path: 'permitDetails',
        component: PemitUpdateComponent
      },
      {
        path: 'dwlDetails',
        component: DwlDetailsComponent
      },
      {
        path: 'meter-permit',
        component: MeterPemitComponent
      },
      {
        path: 'oversize-permit',
        component: OversizedVehiclesComponent
      },
      {
        path: 'hydrant-permit',
        component: HydrantPemitComponent
      },
      {
        path: 'meter-details',
        component: MeterDetailsComponent
      },

      {
        path: 'hydrant-details',
        component: HydrantDetailsComponent
      },
      {
        path: 'oversized-details',
        component: OversizedVehiclesDetailsComponent
      },
      {
        path: 'meter-fire-details',
        component: MeterFireDetailsComponent
      },
      {
        path: 'meter-water-details',
        component: MeterWaterDetailsComponent
      },



    ]
  },

  {
    path: 'add-staff',
    component: AddStaffComponent
  },
  {
    path: 'staff-list',
    component: StaffListComponent
  },
  {
    path: 'create-password',
    component: CreatePasswordComponent
  },

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
  static components = [
    ApplicationsComponent
  ]
}
