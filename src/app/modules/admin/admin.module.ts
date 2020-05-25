import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ApplicationsComponent } from './applications/applications.component';
import { PemitUpdateComponent } from './pemit-update/pemit-update.component';
import { LayoutsModule } from 'src/app/core/layouts.module';
import { PermitDecisionsComponent } from './permit-decisions/permit-decisions.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';


@NgModule({
  declarations: [ApplicationsComponent, PemitUpdateComponent, PermitDecisionsComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    LayoutsModule,
    BsDatepickerModule.forRoot(),

  ]
})
export class AdminModule { }
