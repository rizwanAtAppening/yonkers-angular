import { UserAuthGuard } from './../../core/guards/user-auth.guard';
import { LayoutsModule } from './../../core/layouts.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { PermitComponent } from './permit/permit.component';


@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule,
    LayoutsModule
  ],
  declarations: [UsersRoutingModule.component, PermitComponent],
  providers: [
    UserAuthGuard
  ]
})
export class UsersModule { }
