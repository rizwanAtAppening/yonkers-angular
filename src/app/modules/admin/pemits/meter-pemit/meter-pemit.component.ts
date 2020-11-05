import { Component, OnInit } from '@angular/core';
import { ApplicationService } from 'src/app/core/services/admin/application.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-meter-pemit',
  templateUrl: './meter-pemit.component.html',
  styleUrls: ['./meter-pemit.component.css']
})
export class MeterPemitComponent implements OnInit {
  message: any;
  public permit_type: any
  public application_Type = 1
  public page = 1
  public allApplications = []
  public currentPage = 1;
  public totalPagination: any;
  public offset: any
  public meterPermitTab: any = '0'
  // public certificates: any = new Subject<any>();
  public searchString: any;

  constructor(
    private applicationService: ApplicationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    
    this.applicationService.changeMessage('2');
    this.applicationService.currentMessage.subscribe(type => {
      this.permit_type = type
    })
    this.applicationService.getMeterPermitValue.subscribe(type => {
      this.meterPermitTab = type
    })
    this.getAllApplication(this.application_Type);
    this.allInspector();
  }


  public modify = {
    page: this.page,
    permit_type: this.permit_type,
    application_type: this.application_Type
  }
  getAllApplication(application_Type) {
    
    this.application_Type = application_Type
    this.modify.application_type = application_Type
    this.modify.permit_type = 2
    this.modify.page = this.page
    this.applicationService.getApplications(this.modify, this.inspectorAndExaminerIdsArray).subscribe(data => {
      this.allApplications = data.response;
      this.currentPage = data.currentPage;
      this.offset = data.offset;
      this.totalPagination = data.total;
      this.allApplications.map(data => {
        data.isSingleAddress = true
      })
    })
  }

  paginate(page, value, stringValue) {
    
    this.application_Type = value,
      this.page = page
    // if (stringValue == 'inspection') {
    //   this.paymentsSummary(1, 'inspection', '')
    // } else if (stringValue == 'payment') {
    //   this.paymentsSummary(1, 'payment', '')
    // }
    if (stringValue != 'inspection' && stringValue != 'payment')
      this.getAllApplication(this.application_Type)

  }


  navigateDetailsPage(url, applicationId) {
    this.router.navigate([url], { queryParams: { id: applicationId,permtType:'meter'}})
  }

  //  public message: any
  receiveMessage(event) {
    this.ngOnInit();
  }

  searchApplication() {
    
    const data = {
      search_query: String(this.searchString),
      application_type: this.application_Type
    }
    this.applicationService.getApplications(data, '').subscribe(data => {
      this.allApplications = data.response;
      // console.log(this.dwlApplication)
      this.offset = data.offset;
      this.totalPagination = data.total
      this.currentPage = data.currentPage;
    })
  }

  public inspector = []
  public examiner = []
  allInspector() {

    this.applicationService.inspector().subscribe(data => {
      this.inspector = data.response
    })
  }
  allExaminer() {
    this.applicationService.examiner().subscribe(data => {
      this.examiner = data.response
    })
  }

  public inspectorKey = "inspectorAndExaminerIdsArray"
  public inspectorAndExaminerIdsArray = []
  selectFilter(selectValue, value) {

    if (value == 'inspector') {
      if (!selectValue.checked) {
        this.inspectorAndExaminerIdsArray.forEach((data, i) => {
          if (selectValue.value == data.inspector) {

            this.inspectorAndExaminerIdsArray.splice(i, 1)
          }
        })
      } else {
        this.inspectorAndExaminerIdsArray.push({ 'inspector': selectValue.value })
      }

    }

    else if (value == 'examiner') {
      if (!selectValue.checked) {
        this.inspectorAndExaminerIdsArray.forEach((data, i) => {
          if (selectValue.value == data.examiner) {

            this.inspectorAndExaminerIdsArray.splice(i, 1)
          }
        })
      } else {
        this.inspectorAndExaminerIdsArray.push({ 'examiner': selectValue.value })

      }

    }
    else if (value == 'decision') {
      if (!selectValue.checked) {
        Object.keys(this.modify).forEach(data => {
          if (data == selectValue.value) {
            delete this.modify[data]

          }
        })
      } else {
        this.modify[selectValue.value] = 1;

      }
      // this.inspectorAndExaminerIdsArray.push(selectValue.value = 1)
      // console.log(this.inspectorAndExaminerIdsArray)

    }

  }

}
