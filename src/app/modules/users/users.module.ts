import { UserAuthGuard } from './../../core/guards/user-auth.guard';
import { LayoutsModule } from './../../core/layouts.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { PermitComponent } from './permit/permit.component';
import { AddPermitApplicationComponent } from './add-permit-application/add-permit-application.component';
import { AddPermitTabSectionComponent } from './add-permit-tab-section/add-permit-tab-section.component';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { SubmitApplicationComponent } from './submit-application/submit-application.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { UpdatePermitComponent } from './update-permit/update-permit.component';
import { AddDailyWorkLoactionComponent } from './add-daily-work-loaction/add-daily-work-loaction.component';
import { AddPermitComponent } from './add-permit/add-permit.component';
import { AddTeamMemberComponent } from './add-team-member/add-team-member.component';
import { ShowTeamMemberComponent } from './show-team-member/show-team-member.component';
import { PaymentComponent } from './payment/payment.component';
import { AddMeterPermitComponent } from './meter-permits/add-meter-permit/add-meter-permit.component';
import { AddHydrantPermitComponent } from './hydrant-permit/add-hydrant-permit/add-hydrant-permit.component';
import { OverSizePermitComponent } from './over_size-permit/over-size-permit/over-size-permit.component';
import { PaymentSuccessfulComponent } from './payment/payment-successful/payment-successful.component';
// import { FilterPipe } from 'src/app/core/pipe/search.pipe';

//import {typeahead} from '/ngx-bootstrap/typeahead'

@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule,
    LayoutsModule,
    NgxPaginationModule,
  //  BrowserAnimationsModule,
    TypeaheadModule.forRoot(),
    BsDatepickerModule.forRoot(),

    HttpClientModule
    

  ],
  declarations: [UsersRoutingModule.component, PermitComponent, 
    AddPermitApplicationComponent, AddPermitTabSectionComponent, 
    UpdateProfileComponent, ChangePasswordComponent, SubmitApplicationComponent, 
    UpdatePermitComponent, AddDailyWorkLoactionComponent, AddPermitComponent, 
    AddTeamMemberComponent, ShowTeamMemberComponent, PaymentComponent, AddMeterPermitComponent, AddHydrantPermitComponent, OverSizePermitComponent, PaymentSuccessfulComponent],
  providers: [
    UserAuthGuard
  ]
})
export class UsersModule { }
