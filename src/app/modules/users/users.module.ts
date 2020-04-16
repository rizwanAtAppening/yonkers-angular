import { UserAuthGuard } from './../../core/guards/user-auth.guard';
import { LayoutsModule } from './../../core/layouts.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { PermitComponent } from './permit/permit.component';
import { AddPermitApplicationComponent } from './add-permit-application/add-permit-application.component';
import { AddPermitTabSectionComponent } from './add-permit-tab-section/add-permit-tab-section.component';


@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule,
    LayoutsModule
  ],
  declarations: [UsersRoutingModule.component, PermitComponent, AddPermitApplicationComponent, AddPermitTabSectionComponent],
  providers: [
    UserAuthGuard
  ]
})
export class UsersModule { }
