import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApplicationService } from 'src/app/core/services/admin/application.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { appToaster, settingConfig } from 'src/app/configs';

@Component({
  selector: 'app-meter-water-details',
  templateUrl: './meter-water-details.component.html',
  styleUrls: ['./meter-water-details.component.css']
})
export class MeterWaterDetailsComponent implements OnInit {
  public applicationDetails: any;
  public applicationId: number;
  public waterForm: FormGroup;
  public settings: any;
  public checkedValue: number = null;
  public isSubmit = false;
  public type:number
  constructor(
    private FB: FormBuilder,
    private applicationService: ApplicationService,
    private route: ActivatedRoute,
    private ts: ToastrService,
    private router: Router

  ) {
    this.settings = settingConfig;
  }

  ngOnInit(): void {
    this.waterControls();
    this.route.queryParams.subscribe(data => {
      this.applicationId = data.id;
    })
    this.route.queryParams.subscribe(data => {
      this.type = data.type;
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


  // name: DataTypes.STRING,
  //   address: DataTypes.STRING,
  //   received_by: DataTypes.INTEGER,
  //   architeck: DataTypes.STRING,
  //   block: DataTypes.STRING,
  //   lot: DataTypes.STRING,
  //   model: DataTypes.STRING,
  //   serial: DataTypes.STRING,
  //   size: DataTypes.STRING,
  //   comment: DataTypes.STRING,
  //   approved_date: DataTypes.DATE,
  //   approved_by: DataTypes.INTEGER,
  //   status: DataTypes.INTEGER


  waterControls() {
    this.waterForm = this.FB.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      received_by: [''],
      received_date: ['', Validators.required],
      architeck: ['', Validators.required],
      block: ['', Validators.required],
      lot: ['', Validators.required],
      model: ['', Validators.required],
      serial: ['', Validators.required],
      size: ['', Validators.required],
      comment: ['', Validators.required],
      approved_date: ['', Validators.required],
      approved_by: ['', Validators.required],
      status: [''],
    })
  }

  get waterCon() { return this.waterForm.controls }

  permitDetails() {
    debugger
    this.applicationService.getApplicationDetails(this.applicationId).subscribe(data => {
      this.applicationDetails = data.response;
      //  this.certificates.next(this.applicationDetails)

    })
  }

  submitReview() {
    if (this.waterForm.invalid) {
      this.isSubmit = true;
      return false
    }
    this.waterForm.value.application_id = this.applicationId
    this.waterForm.value.department_type = 2
    this.waterForm.value.status = 0
    this.waterForm.value.received_by = null
    this.applicationService.submitMeterFireReviewAndWaterReview(this.waterForm.value).subscribe(data => {
      this.waterForm.reset();
      this.permitDetails();
    })
  }

  voidMeterFireReview(id) {
    const data = {
      id: id,
      application_id: this.applicationId,
      department_type: 2
    }
    this.applicationService.voidMeterFireAndWaterReview(data).subscribe(data => {
      this.ts.success('Submission voided')
      this.permitDetails()
    })
  }
  navigateIndexPage() {
    if (this.type == 3) {
      this.applicationService.changeMessage('3');
    } else {
      this.applicationService.changeMessage('2');
    }
    this.applicationService.meterPermitValue('2')

    this.router.navigate(['/admin/permit/meter-permit'])
  }

}
