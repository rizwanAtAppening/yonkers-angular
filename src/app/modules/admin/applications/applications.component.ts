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
  public application_Type = 1;
  public searchString:any;
  constructor(
    private applicationService: ApplicationService,
    private router: Router,
    private adminAuthService: AuthenticationService
  ) {
    this.settings = settingConfig;
  }

  ngOnInit(): void {
    this.getAllApplication(this.application_Type);
    this.getUserInfo()
  }

  public currentUser = {
    role_id: null,
    department: null,
    email: null
  }
  getUserInfo() {

    this.adminAuthService.getUserInfo().subscribe(data => {
      this.currentUser = data
    })
  }
  public allApplications = []
  public page = 1
  public offset = 10;
  public currentPage = 1;
  public totalPagination: number
  getAllApplication(application_Type) {
    this.application_Type = application_Type
    
    const data = {
      page: this.page,
      application_type: this.application_Type
    }
    this.applicationService.getApplications(data).subscribe(data => {
      this.allApplications = data.response;
      this.currentPage = data.currentPage;
      this.offset = data.offset;
      this.totalPagination = data.total;
      this.allApplications.map(data => {
        data.isSingleAddress = true
      })
    })
  }

  public paymentSummary:any = []
  paymentsSummary(status){
   // this.application_Type = application_Type
    
    const data = {
      page: this.page,
      payment_summary: status
    }
    this.applicationService.getApplications(data).subscribe(data => {
      this.paymentSummary = data.response;
      this.currentPage = data.currentPage;
      this.offset = data.offset;
      this.totalPagination = data.total;    
      this.paymentSummary.map(data => {
        data.isSingleAddress = true
      })
      console.log(this.paymentSummary, '++++++++++++++++++++++++')

    })

  }

  paginate(page, value) {
    this.application_Type = value,
      this.page = page
    this.getAllApplication(this.application_Type)

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

  navigateToUpdatePage(id, value) {
    if (value == 'dwl') {
      this.router.navigate(['/admin/permit/dwlDetails'], { queryParams: { id: id } })

    } else {
      this.router.navigate(['/admin/permit/permitDetails'], { queryParams: { id: id } })

    }
  }

  logoutUser() {
    this.adminAuthService.logout().subscribe(res => {
      if (res) {
        this.router.navigate(['/']);

      }
    });
  }
  public from: any;
  public to: any;
  seelctDate(event) {
    
    if (event) {
      this.from = event[0].toISOString()
      this.to = event[1].toISOString()
      if (this.from && this.to) {
        this.getApplicationByDate()
      }
    }
  }


  getApplicationByDate() {

    const data = {
      page: this.page,
      application_type: this.application_Type,
      from: this.from,
      to: this.to
    }
    this.applicationService.getApplications(data).subscribe(data => {
      this.allApplications = data.response;
      this.currentPage = data.currentPage;
      this.offset = data.offset;
      this.totalPagination = data.total;
      this.allApplications.map(data => {
        data.isSingleAddress = true
      })
    })
  }

  searchApplication() {
    const data = {
      search_query: String(this.searchString),
      application_type: this.application_Type
    }
    this.applicationService.getApplications(data).subscribe(data => {
      this.allApplications = data.response;
      // console.log(this.dwlApplication)
      this.offset = data.offset;
      this.totalPagination = data.total
      this.currentPage = data.currentPage;
    })
  }
  
}
