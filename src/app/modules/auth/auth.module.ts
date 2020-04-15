import { LayoutsModule } from './../../core/layouts.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';


@NgModule({
  declarations: [AuthRoutingModule.component],
  imports: [
    CommonModule,
    AuthRoutingModule,
    LayoutsModule
  ]
})
export class AuthModule { }
