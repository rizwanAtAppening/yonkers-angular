import { Component, OnInit } from '@angular/core';
import { ApplicationService } from 'src/app/core/services/admin/application.service';
import { appToaster, settingConfig } from 'src/app/configs';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.css']
})
export class ApplicationsComponent implements OnInit {
  public settings: any;
  constructor(
    private applicationService: ApplicationService,
    private router:Router,
    private adminAuthService :AuthenticationService
  ) {
  this.settings = settingConfig;
  }

  ngOnInit(): void {
    this.getAllApplication();
    this.getUserInfo()
  }

  public currentUser = {
    role_id: null,
    department: null,
    email:null
  }
  getUserInfo() {
    
    this.adminAuthService.getUserInfo().subscribe(data => {
      this.currentUser = data
    })
  }
  public allApplications = []
  getAllApplication() {

    this.applicationService.getApplications().subscribe(data => {
      this.allApplications = data.response;
    })
  }

  public isSingleAddress = true;
  public currentId: number
  showMoreLocation(value, id) {
    this.currentId = id
    this.allApplications.map(data => {
      if (data.id == id) {
        data.isSingleAddress = value

      } else {
        data.isSingleAddress = !value
      }
    })

  }

  navigateToUpdatePage(id){
    this.router.navigate(['/admin/permit/permitDetails'],{queryParams:{id:id}})
  }

  logoutUser() {
    this.adminAuthService.logout().subscribe(res => {
      if (res) {
        this.router.navigate(['/']);

      }
    });
  }

}
