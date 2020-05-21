import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ApplicationsComponent } from './applications/applications.component';
import { PemitUpdateComponent } from './pemit-update/pemit-update.component';
import { LayoutsModule } from 'src/app/core/layouts.module';


@NgModule({
  declarations: [ApplicationsComponent, PemitUpdateComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    LayoutsModule
  ]
})
export class AdminModule { }
