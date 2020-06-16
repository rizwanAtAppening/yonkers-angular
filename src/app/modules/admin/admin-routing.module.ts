import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApplicationsComponent } from './applications/applications.component';
import { PemitUpdateComponent } from './pemit-update/pemit-update.component';
import { DwlDetailsComponent } from './dwl-details/dwl-details.component';


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
   


    ]
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
