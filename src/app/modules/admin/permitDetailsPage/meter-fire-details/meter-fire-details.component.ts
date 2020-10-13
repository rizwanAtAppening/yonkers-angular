import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApplicationService } from 'src/app/core/services/admin/application.service';
import { Route } from '@angular/compiler/src/core';
import { ActivatedRoute, Router } from '@angular/router';
import { appToaster, settingConfig } from 'src/app/configs';
import { ToastrService } from 'ngx-toastr';

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
  constructor(
    private FB: FormBuilder,
    private applicationService: ApplicationService,
    private route: ActivatedRoute,
    private ts: ToastrService,
    private router:Router

  ) {
    this.settings = settingConfig;
  }

  ngOnInit(): void {
    this.fireControls();
    this.route.queryParams.subscribe(data => {
      this.applicationId = data.id;
    })
    if (this.applicationId) {
      this.permitDetails();
    }
  }

  checkedCondition(event, checkedValue: number) {
    debugger
    if (event.target.checked) {
      this.checkedValue = checkedValue
    } else {
      this.checkedValue = null
    }

  }


  fireControls() {
    this.fireForm = this.FB.group({
      received_by: ['', Validators.required],
      received_date: ['', Validators.required],
      approved_date: ['', Validators.required],
      approved_by: ['', Validators.required],
      check_condition: [''],
      message: [''],
      status: ['',]
    })
  }

  get firCon() { return this.fireForm.controls }

  permitDetails() {
    debugger
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

    })
  }

  voidMeterFireReview(id) {
    const data = {
      id: id,
      application_id: this.applicationId,
      department_type: 1
    }
    this.applicationService.voidMeterFireAndWaterReview(data).subscribe(data => {
      this.ts.success('SFubmission voided')
    })
  }
  navigateIndexPage() {
    this.applicationService.changeMessage('2');
    this.router.navigate(['/admin/permit/meter-permit'])
  }

}
