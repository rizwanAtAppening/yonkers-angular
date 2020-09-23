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
  selector: 'app-add-hydrant-permit',
  templateUrl: './add-hydrant-permit.component.html',
  styleUrls: ['./add-hydrant-permit.component.css']
})
export class AddHydrantPermitComponent implements OnInit {
  public applicantForm: FormGroup;
  public application: any
  public hydrantForm: FormGroup;
  public isApplicant = false;
  public currentTab: string
  public permit_type = 3;
  public minDate:Date
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
    this.onInIt()
    this.minDate = new Date();
    this.route.queryParams.subscribe(data => {
      this.currentTab = data.tab;
      this.permit_type = data.permitType
    })
    if(this.currentTab == 'applicant'){
      this.getCurrentUser();
    }
  }

  onInIt() {
    this.applicantFormControl();
    this.hydranttFormControl();
  }

  applicantFormControl() {
    this.applicantForm = this._FB.group({
      applicant_name: ['', Validators.required],
      applicant_last_name: ['', Validators.required],
      applicant_phone: ['', Validators.required],
      applicant_email: ['', Validators.required],
      fax: ['', Validators.required],
      applicant_address: ['', Validators.required],

    })
  }

  hydranttFormControl() {
    this.hydrantForm = this._FB.group({
      from: ['', Validators.required],
      to: ['', Validators.required],
      hydrant_cross_street: ['', Validators.required],
      hydrant_address: ['', Validators.required],
      hydrant_id: ['', Validators.required],
      hydrant_purpose: ['', Validators.required],

    })
  }

  get applicantCon() { return this.applicantForm.controls }

  public formValue: any
  addHydrant(formGroup: string, nextTab: string) {
    debugger
    if (formGroup == 'applicant') {
      if (this.applicantForm.invalid) {
        this.isApplicant = true
        return false
      }
      this.applicantForm.value.permit_type =Number(this.permit_type? this.permit_type : 3)
      this.applicantForm.value.model = 3
  
      this.formValue = this.applicantForm.value;
    }
    else if(formGroup == 'hydrantForm'){
      this.hydrantForm.value.permit_type = Number(this.permit_type? this.permit_type : 3)
      this.hydrantForm.value.model = 8
      
      this.formValue = this.hydrantForm.value;
    }
   

    this.permitService.addPermitApplication(this.formValue).subscribe(data => {
      this.currentTab = nextTab;
      this.router.navigate(['/dashboard/add-hydrant-permit'], { queryParams: { tab: this.currentTab } })

    })
  }

  public currentUser: any
  getCurrentUser() {
    this.authService.getUserInfo().subscribe(data => {
      this.currentUser = data;
      this.applicantForm.controls.applicant_name.setValue(this.currentUser.first_name)
      this.applicantForm.controls.applicant_last_name.setValue(this.currentUser.last_name)

      this.applicantForm.controls.applicant_address.setValue(this.currentUser.address)
      this.applicantForm.controls.applicant_phone.setValue(this.currentUser.phone_number)
      this.applicantForm.controls.applicant_email.setValue(this.currentUser.email)

    })
  }

}
