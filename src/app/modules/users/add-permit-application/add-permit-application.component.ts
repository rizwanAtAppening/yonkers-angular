import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/core/services';
import { Router } from '@angular/router';
import { appToaster, settingConfig } from 'src/app/configs';

@Component({
  selector: 'app-add-permit-application',
  templateUrl: './add-permit-application.component.html',
  styleUrls: ['./add-permit-application.component.css']
})
export class AddPermitApplicationComponent implements OnInit {
  public settings: any
  constructor(
    public userSrvice: UsersService,
    private router: Router,
  ) {
    this.settings = settingConfig;
  }

  ngOnInit() {
    this.userSrvice.changeSaveAndExit(true)
  }


  navigateToTab(permitType: any, url, tab) {
    debugger
    this.router.navigate([url], { queryParams: { tab: tab, permitType: permitType } })
    localStorage.setItem('currentTab', permitType);
  }


}
