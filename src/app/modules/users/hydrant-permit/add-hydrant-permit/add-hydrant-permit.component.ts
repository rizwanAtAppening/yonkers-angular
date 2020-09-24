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
    debugger
    this.onInIt()
    this.minDate = new Date();
    this.route.queryParams.subscribe(data => {
      this.currentTab = data.tab;
      this.permit_type = data.permitType;
      this.application_id = data.application_id
    })
    if (this.currentTab == 'applicant') {
      this.getCurrentUser();
    }
    this.getApplication()
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
    if (formGroup == 'applicant' || this.currentTab == 'applicant') {
      if (this.applicantForm.invalid) {
        this.isApplicant = true
        return false
      }
      this.applicantForm.value.permit_type = Number(this.permit_type ? this.permit_type : 3)
      this.applicantForm.value.applican_last_name =this.applicantForm.value.applicant_last_name

      this.applicantForm.value.model = 3

      this.formValue = this.applicantForm.value;
    }
    else if (formGroup == 'hydrantForm' || this.currentTab == 'hydrant') {
      this.hydrantForm.value.permit_type = Number(this.permit_type ? this.permit_type : 3)
      this.hydrantForm.value.model = 8
      this.getApplication()
      this.formValue = this.hydrantForm.value;
    }


    this.permitService.addPermitApplication(this.formValue).subscribe(data => {
      this.currentTab = nextTab;
      this.back(nextTab,'')
      if (this.permitNavigateValue == 'fine') {
        this.permitNavigateValue = ''
        this.router.navigate(['/dashboard/permit'])

      } else {
        this.router.navigate(['/dashboard/add-hydrant-permit'], { queryParams: { tab: this.currentTab } })
      }

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


  public applicantDetails: any;
  public application_hydrant_details: any;
  getApplication() {
    debugger
    this.application = this.permitService.getApplication();
    if (this.application) {
      this.applicantDetails = this.application.applicant_details;
      this.application_hydrant_details = this.application.application_hydrant
    }
    if (this.application_id) {
      this.permitService.updateApplication(this.application_id).subscribe(data => {
        this.application = data.response;
        this.applicantDetails = this.application.applicant_details;
        this.application_hydrant_details = (this.application && this.application.application_hydrant)
        if (this.application) {
          sessionStorage.setItem('application', JSON.stringify(this.application));

        }
        this.back(this.currentTab,'')
      })

    }


  }

  back(tab, value: string) {
    debugger
    if (!this.application_id) {
      this.getApplication();

    }
    if (value != 'ontab') {
      this.currentTab = tab
    }
    if (tab == 'applicant') {
      if (this.applicantDetails) {
        this.applicantForm.controls.applicant_name.setValue(this.applicantDetails.applicant_name)
        this.applicantForm.controls.applicant_last_name.setValue(this.applicantDetails.applican_last_name)
        this.applicantForm.controls.fax.setValue(this.applicantDetails.fax)
        this.applicantForm.controls.applicant_address.setValue(this.applicantDetails.applicant_address)
        this.applicantForm.controls.applicant_phone.setValue(this.applicantDetails.applicant_phone)
        this.applicantForm.controls.applicant_email.setValue(this.applicantDetails.applicant_email)

      }
    }
    if (tab == 'hydrant') {
      if (this.application_hydrant_details) {
        this.hydrantForm.controls.hydrant_address.setValue(this.application_hydrant_details.hydrant_address)
        this.hydrantForm.controls.hydrant_cross_street.setValue(this.application_hydrant_details.hydrant_cross_street)
        this.hydrantForm.controls.hydrant_purpose.setValue(this.application_hydrant_details.hydrant_purpose)
        this.hydrantForm.controls.to.setValue(new Date(this.application_hydrant_details.to))
        this.hydrantForm.controls.from.setValue(new Date(this.application_hydrant_details.from))
        this.hydrantForm.controls.hydrant_id.setValue(this.application_hydrant_details.hydrant_id)
      }
    }
    if (!this.application_id) {
      this.router.navigate(['/dashboard/add-hydrant-permit'], { queryParams: { tab: this.currentTab } })

    }

  }

  hitOnTab(tab) {
    debugger
    this.back(tab, 'ontab')
    if (this.currentTab == 'applicant') {
      if (this.applicantForm.invalid) {
        this.isApplicant = true
        return false
      }
      this.currentTab = tab
      this.addHydrant('applicant', this.currentTab);
      // this.router.navigate(['/dashboard/add-hydrant-permit'], { queryParams: { tab: this.currentTab } })

    }
    else if (this.currentTab == 'hydrant') {
      if (this.hydrantForm.invalid) {
        this.isApplicant = true
        return false
      }
      this.currentTab = tab;
      this.addHydrant('hydrantForm', this.currentTab)
      // this.router.navigate(['/dashboard/add-hydrant-permit'], { queryParams: { tab: this.currentTab } })
    }
    if (tab == 'reviews') {
      this.getApplication()
    }

  }
  public permitNavigateValue: string
  saveAndExit() {
    debugger
    this.addHydrant('', this.currentTab)
    this.permitNavigateValue = 'fine'

  }


}
