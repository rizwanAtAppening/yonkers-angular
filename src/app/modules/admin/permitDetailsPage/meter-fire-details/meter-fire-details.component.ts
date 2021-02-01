import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApplicationService } from 'src/app/core/services/admin/application.service';
import { Route } from '@angular/compiler/src/core';
import { ActivatedRoute, Router } from '@angular/router';
import { appToaster, settingConfig } from 'src/app/configs';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';

@Component({
  selector: 'app-meter-fire-details',
  templateUrl: './meter-fire-details.component.html',
  styleUrls: ['./meter-fire-details.component.css']
})
export class MeterFireDetailsComponent implements OnInit {
  public applicationDetails: any;
  public applicationId: number;
  public fireForm: FormGroup;
  public settings: any;
  public checkedValue: number = null;
  public isSubmit = false
  public type: any;
  public permtType: string
  public currentUser: {
    name: null
  }
  public checkBoxValue: string;
  constructor(
    private FB: FormBuilder,
    private applicationService: ApplicationService,
    private route: ActivatedRoute,
    private ts: ToastrService,
    private router: Router,
    private authService: AuthenticationService

  ) {
    this.settings = settingConfig;
  }

  ngOnInit(): void {
    
    this.fireControls();
    this.route.queryParams.subscribe(data => {
      this.applicationId = data.id;
      this.type = (data.type);
      this.permtType = data.permtType
    })
    if (this.applicationId) {
      this.permitDetails();
    }
    this.getCurrentUser()
  }

  checkedCondition(event, checkedValue: number) {

    if (event.target.checked) {
      this.checkedValue = checkedValue
    } else {
      this.checkedValue = null
    }
    if (event.target.value) {
      this.checkBoxValue = event.target.value
      console.log(this.checkBoxValue)
    }

  }


  fireControls() {
    this.fireForm = this.FB.group({
      received_by: ['', Validators.required],
      received_date: ['', Validators.required],
      approved_date: ['', Validators.required],
      approved_by: [''],
      check_condition: [''],
      message: [''],
      status: ['',]
    })
  }

  get firCon() { return this.fireForm.controls }

  permitDetails() {

    this.applicationService.getApplicationDetails(this.applicationId).subscribe(data => {
      this.applicationDetails = data.response;
      //  this.certificates.next(this.applicationDetails)

    })
  }

  submitReview() {
    if (this.fireForm.invalid) {
      this.isSubmit = true;
      return false
    }
    this.fireForm.value.application_id = this.applicationId
    this.fireForm.value.department_type = 1
    this.fireForm.value.check_condition = this.checkedValue
    this.fireForm.value.received_by = 1
    this.fireForm.value.status = 0
    this.applicationService.submitMeterFireReviewAndWaterReview(this.fireForm.value).subscribe(data => {
      this.fireForm.reset();
      this.isSubmit = false;
      this.permitDetails();
    })
  }

  voidMeterFireReview(id) {
    const data = {
      id: id,
      application_id: this.applicationId,
      department_type: 1
    }
    this.applicationService.voidMeterFireAndWaterReview(data).subscribe(data => {
      this.ts.success('Submission voided')
      this.permitDetails()
    })
  }
  navigateIndexPage() {
    
    if (this.permtType == 'hydrant') {
      this.applicationService.changeMessage('3');
      this.applicationService.meterPermitValue(this.type)
      this.router.navigate(['/admin/permit/hydrant-permit'])

    } else {
      this.applicationService.changeMessage('2');
      this.applicationService.meterPermitValue(this.type)
      this.router.navigate(['/admin/permit/meter-permit'])
    }
    // this.router.navigate(['/admin/permit/meter-permit'])
  }

  getCurrentUser() {

    this.authService.getUserInfo().subscribe(data => {
      this.currentUser = data
      if (this.currentUser.name) {
        this.fireForm.controls.received_by.setValue(this.currentUser.name)
      }
    })
  }

}
