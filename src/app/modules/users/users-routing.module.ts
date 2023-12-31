import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserAuthGuard } from 'src/app/core/guards/user-auth.guard';
import { PermitComponent } from './permit/permit.component';
import { AddPermitApplicationComponent } from './add-permit-application/add-permit-application.component';
import { AddPermitTabSectionComponent } from './add-permit-tab-section/add-permit-tab-section.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { LoginComponent } from '../auth/login/login.component';
import { SubmitApplicationComponent } from './submit-application/submit-application.component';
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


// const routes: Routes = [
//   {
//     path: '',
//     children: [
//       {
//         path: '',
//         component: HomeComponent
//       },
//       {
//         path: 'application',
//         canActivate: [UserAuthGuard],
//         canActivateChild: [UserAuthGuard],
//         component: ApplicationComponent
//       },
//       {
//         path:'permit',
//         component:PermitComponent
//       }
//     ]
//   }
// ];


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'dashboard',
        canActivate: [UserAuthGuard],
        canActivateChild: [UserAuthGuard],
        children: [
          {
            path: 'permit',
            component: PermitComponent
          },
          {
            path: 'add-meter-permit',
            component: AddMeterPermitComponent
          },
          {
            path: 'add-hydrant-permit',
            component: AddHydrantPermitComponent
          },
          {
            path: 'add-oversize-permit',
            component: OverSizePermitComponent
          },
          {
            path: 'add-permit-selectType',
            component: AddPermitApplicationComponent
          },
          {
            path: 'add-permit',
            component: AddPermitTabSectionComponent
          },
          {
            path: 'update-profile',
            component: UpdateProfileComponent
          },
          {
            path: 'change-password',
            component: ChangePasswordComponent,
          },
          {
            path: 'submit-application',
            component: SubmitApplicationComponent,
          },
          {
            path: 'update-application',
            component: UpdatePermitComponent,
          },
          {
            path: 'daily-work-location',
            component: AddDailyWorkLoactionComponent,
          },
          {
            path: 'add-user-permit',
            component: AddPermitComponent,
          },
          {
            path: 'add-team-member',
            component: AddTeamMemberComponent,
          }, {
            path: 'show-team-member',
            component: ShowTeamMemberComponent,
          },
          {
            path: 'payment',
            component: PaymentComponent
          },
          {
            path: 'successfull',
            component: PaymentSuccessfulComponent
          },
        ]
      },



    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {
  static component = [
    HomeComponent,
    // ApplicationComponent
  ]
}
