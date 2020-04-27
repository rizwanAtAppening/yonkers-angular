import { LayoutsModule } from './../../core/layouts.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { CreateNewPasswordComponent } from './create-new-password/create-new-password.component';


@NgModule({
  declarations: [AuthRoutingModule.component, ResetPasswordComponent, CreateNewPasswordComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    LayoutsModule
  ]
})
export class AuthModule { }
