import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/core/services';
import { PermitService } from 'src/app/core/services/users/permit.service';
import { appToaster, settingConfig } from 'src/app/configs';

@Component({
  selector: 'app-permit',
  templateUrl: './permit.component.html',
  styleUrls: ['./permit.component.css']
})
export class PermitComponent implements OnInit {
  public settings: any;
  public applictionDetails = []

  constructor(
    private userService: UsersService,
    private permitService: PermitService
  ) {    this.settings = settingConfig;
  }

  ngOnInit() {
    this.userService.changeSaveAndExit(true);
    this.permitService.deleteSessionApplication();
    this.getPermitApplication()

  }

  getPermitApplication() {
    debugger
    this.permitService.getPermitApplication().subscribe(data => {
      this.applictionDetails = data.response;
    })
  }

}
