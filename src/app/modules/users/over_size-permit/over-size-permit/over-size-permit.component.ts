import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MeterServiceService } from 'src/app/core/services/users/meter-service.service';
import { ToastrService } from 'ngx-toastr';
import { PermitService } from 'src/app/core/services/users/permit.service';
import { Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead/public_api';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
@Component({
  selector: 'app-over-size-permit',
  templateUrl: './over-size-permit.component.html',
  styleUrls: ['./over-size-permit.component.css']
})
export class OverSizePermitComponent implements OnInit {
  public applicantForm: FormGroup;
  public application: any
  public hydrantForm: FormGroup;
  public isApplicant = false;
  public currentTab: string
  public permit_type = 3;
  public minDate: Date;
  public application_id: number
  constructor(
    private _FB: FormBuilder,
    private meterService: MeterServiceService,
    private toasterService: ToastrService,
    private permitService: PermitService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService,
  ) { }

  ngOnInit(): void {
    this.onInIt();
    this.minDate = new Date();
    this.route.queryParams.subscribe(data => {
      this.currentTab = data.tab;
      this.permit_type = data.permitType;
      this.application_id = data.application_id
    })
  }


  onInIt() {
    this.applicantFormControl()
  }

  applicantFormControl() {
    this.applicantForm = this._FB.group({
      applicant_name: ['', Validators.required],
      applicant_last_name: ['', Validators.required],
      applicant_phone: ['', Validators.required],
      applicant_email: ['', Validators.required],
      fax: ['', Validators.required],
      applicant_address: ['', Validators.required],
      application_date: ['', Validators.required],
      application_time: ['', Validators.required],
    })
  }

  get applicantCon() { return this.applicantForm.controls }

  public formValue
  addOverSize(formGroup: string, nextTab) {
    if (formGroup == 'applicant') {
      if (this.applicantForm.invalid) {
        this.isApplicant = true
        return false
      }
    }
    this.formValue = this.applicantForm.value;
    this.permitService.addPermitApplication(this.formValue).subscribe(data => {

    })

  }
}
