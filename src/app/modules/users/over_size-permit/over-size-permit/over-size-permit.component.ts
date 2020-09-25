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
  public oversizeForm: FormGroup;
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
    if (this.currentTab == 'applicant') {
      this.getCurrentUser()
    }
    this.getApplication();
    this.back(this.currentTab,'')
  }


  onInIt() {
    this.applicantFormControl();
    this.overSizeCont()
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


  overSizeCont() {
    this.oversizeForm = this._FB.group({
      license_plate: ['', Validators.required],
      make: ['', Validators.required],
      year: ['', Validators.required],
      height: ['', Validators.required],
      width: ['', Validators.required],
      length: ['', Validators.required],
      weight: ['', Validators.required],
      to: ['', Validators.required],
      from: ['', Validators.required],

    })
  }

  get oversize() { return this.oversizeForm.controls }
  public formValue
  addOverSize(formGroup: string, nextTab) {
    if (formGroup == 'applicant') {
      if (this.applicantForm.invalid) {
        this.isApplicant = true
        return false
      }
      this.applicantForm.value.permit_type = this.permit_type ? this.permit_type : 4;
      this.applicantForm.value.applican_last_name =  this.applicantForm.value.applicant_last_name 
      this.applicantForm.value.model = 3

      this.formValue = this.applicantForm.value;
    }
    else if (formGroup == 'oversizeForm') {
      if (this.oversizeForm.invalid) {
        this.isApplicant = true;
        return false
      }
      this.oversizeForm.value.model = 9
      this.oversizeForm.value.permit_type = this.permit_type ? this.permit_type : 4
      this.formValue = this.oversizeForm.value;

    }
    this.permitService.addPermitApplication(this.formValue).subscribe(data => {
      this.currentTab = nextTab;
      this.getApplication()
      this.router.navigate(['/dashboard/add-oversize-permit'], { queryParams: { tab: this.currentTab } })
    })

  }

  public currentUser: any
  getCurrentUser() {
    debugger
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
  public application_vehicles: any;
  getApplication() {
    debugger
    this.application = this.permitService.getApplication();
    if (this.application) {
      this.applicantDetails = this.application.applicant_details;
      this.application_vehicles = this.application.application_vehicles
    }
    if (this.application_id) {
      this.permitService.updateApplication(this.application_id).subscribe(data => {
        this.application = data.response;
        this.applicantDetails = this.application.applicant_details;
        this.application_vehicles = (this.application && this.application.application_vehicles)
        if (this.application) {
          sessionStorage.setItem('application', JSON.stringify(this.application));

        }
        //  this.back(this.currentTab,'')
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
        this.applicantForm.controls.application_date.setValue(new Date(this.applicantDetails.application_date))
        this.applicantForm.controls.application_time.setValue(this.applicantDetails.application_time)
      }
    }
    if (tab == 'oversize') {
      if (this.application_vehicles) {
        this.oversizeForm.controls.license_plate.setValue(this.application_vehicles.license_plate)
        this.oversizeForm.controls.make.setValue(this.application_vehicles.make)
        this.oversizeForm.controls.year.setValue(this.application_vehicles.year)
        this.oversizeForm.controls.width.setValue(this.application_vehicles.width)
        this.oversizeForm.controls.height.setValue(this.application_vehicles.height)
        this.oversizeForm.controls.weight.setValue(this.application_vehicles.weight)
        this.oversizeForm.controls.length.setValue(this.application_vehicles.length)
        this.oversizeForm.controls.to.setValue(new Date(this.application_vehicles.to))
        this.oversizeForm.controls.from.setValue(new Date(this.application_vehicles.from))
      }
    }
    if (!this.application_id) {
      this.router.navigate(['/dashboard/add-oversize-permit'], { queryParams: { tab: this.currentTab } })
    }

  }

  hitOnTab(tab) {
    debugger
    this.back(tab, 'ontab')
    if (tab == 'applicant') {
      if (this.applicantForm.invalid) {
        this.isApplicant = true
        return false
      }
      this.currentTab = tab
      this.addOverSize('applicant', this.currentTab);
      // this.router.navigate(['/dashboard/add-hydrant-permit'], { queryParams: { tab: this.currentTab } })

    }
    else if (tab == 'oversize') {
      if (this.oversizeForm.invalid) {
        this.isApplicant = true
        return false
      }
      this.currentTab = tab;
      this.addOverSize('oversizeForm', this.currentTab)
      // this.router.navigate(['/dashboard/add-hydrant-permit'], { queryParams: { tab: this.currentTab } })
    }
    if (tab == 'reviews') {
      this.getApplication()
    }

  }
  public permitNavigateValue: string
  saveAndExit() {
    debugger
    this.addOverSize('', this.currentTab)
    this.permitNavigateValue = 'fine'

  }


}
