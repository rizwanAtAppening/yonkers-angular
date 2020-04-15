import { ApplicationComponent } from './application/application.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserAuthGuard } from 'src/app/core/guards/user-auth.guard';
import { PermitComponent } from './permit/permit.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'application',
        canActivate: [UserAuthGuard],
        canActivateChild: [UserAuthGuard],
        component: ApplicationComponent
      },
      {
        path:'permit',
        component:PermitComponent
      }
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
    ApplicationComponent
  ]
}
