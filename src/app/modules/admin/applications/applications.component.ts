import { Component, OnInit } from '@angular/core';
import { ApplicationService } from 'src/app/core/services/admin/application.service';
import { appToaster, settingConfig } from 'src/app/configs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.css']
})
export class ApplicationsComponent implements OnInit {
  public settings: any;
  constructor(
    private applicationService: ApplicationService,
    private router:Router
  ) {
  this.settings = settingConfig;
  }

  ngOnInit(): void {
    this.getAllApplication();
  }

  public allApplications = []
  getAllApplication() {
    debugger
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

}
