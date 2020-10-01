import { Component, OnInit } from '@angular/core';
import { ApplicationService } from '../../services/admin/application.service';
import { Router } from '@angular/router';
import { appToaster, settingConfig } from 'src/app/configs';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  public settings: any
  constructor(
    private applicationService: ApplicationService,
    private router: Router

  ) {
    this.settings = settingConfig
  }

  ngOnInit(): void {
  }


  newMessage(url, permit_type) {
    debugger
    this.applicationService.changeMessage(permit_type);
    this.router.navigate([url])
  }
}
