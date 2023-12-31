import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/core/services';
import { Router, ActivatedRoute } from '@angular/router';
import { appToaster, settingConfig } from 'src/app/configs';

@Component({
  selector: 'app-add-permit-application',
  templateUrl: './add-permit-application.component.html',
  styleUrls: ['./add-permit-application.component.css']
})
export class AddPermitApplicationComponent implements OnInit {
  public settings: any
  public cityId: number
  constructor(
    public userSrvice: UsersService,
    private router: Router,
    private route: ActivatedRoute

  ) {
    this.settings = settingConfig;
  }

  ngOnInit() {
    this.userSrvice.changeSaveAndExit(true);
    this.route.queryParams.subscribe(data => {
      this.cityId = data.cityId
    })

  }


  navigateToTab(permitType: any, url, tab) {

    this.router.navigate([url], { queryParams: { tab: tab, permitType: permitType,cityId:this.cityId } })
    localStorage.setItem('currentTab', permitType);
  }


}
