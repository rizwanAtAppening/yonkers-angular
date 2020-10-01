
/** MODUELS */
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
/** END MODUELS */

/** COMPONENTS */
import { LayoutComponent } from './layouts/users/layout/layout.component';
import { HeaderComponent } from './layouts/users/header/header.component';
import { FooterComponent } from './layouts/users/footer/footer.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { AdminComponent } from './layouts/admin/admin.component';
import { SideBarComponent } from './layouts/side-bar/side-bar.component';
/** End COMPONENTS */


const COMPONENTS = [
  AuthLayoutComponent,
  LayoutComponent,
  HeaderComponent,
  FooterComponent,
  AdminComponent,
  SideBarComponent

];

const BASE_MODULES = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule
];



@NgModule({
  declarations: [
    ...COMPONENTS,

  ],
  imports: [
    ...BASE_MODULES
  ],
  exports: [
    ...BASE_MODULES,
    ...COMPONENTS,
  ],
  providers: [
    LayoutsModule
  ]
})
export class LayoutsModule {
  // static forRoot(): ModuleWithProviders {
  //   return <ModuleWithProviders>{
  //     ngModule: LayoutsModule,
  //   };
  // }
}
