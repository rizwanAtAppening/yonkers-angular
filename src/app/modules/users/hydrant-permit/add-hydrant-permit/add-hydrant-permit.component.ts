import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MeterServiceService } from 'src/app/core/services/users/meter-service.service';
import { ToastrService } from 'ngx-toastr';
import { PermitService } from 'src/app/core/services/users/permit.service';
import { Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead/public_api';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { UsersService } from 'src/app/core/services';

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
  public application_id: number;
  public selectadd = []
  public jobAdress = new Subject<any>();
  public address = new Subject<any>();
  public applicantDetails: any;
  public application_hydrant_details: any;
  public currentUser: any
  public addressId: number;
  public permitNavigateValue: string
  public cityId: number
  constructor(
    private _FB: FormBuilder,
    private meterService: MeterServiceService,
    private toasterService: ToastrService,
    private permitService: PermitService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService,
    private userService: UsersService
  ) { }

  ngOnInit(): void {

    this.onInIt()
    this.minDate = new Date();
    this.route.queryParams.subscribe(data => {
      this.currentTab = data.tab;
      this.cityId = data.cityId

      this.permit_type = data.permitType;
      this.application_id = data.application_id
    })
    if (this.currentTab == 'applicant') {
      this.getCurrentUser();
    }
    this.getApplication()
    this.back(this.currentTab, '')
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

  get applicantCon() { return this.applicantForm.controls };
  get hydrantCon() { return this.hydrantForm.controls }

  public formValue: any
  addHydrant(formGroup: string, nextTab: string) {
    if (formGroup == 'applicant' || this.currentTab == 'applicant') {
      if (this.applicantForm.invalid) {
        this.isApplicant = true
        this.permitNavigateValue = null
        return false
      }
      this.applicantForm.value.permit_type = Number(this.permit_type ? this.permit_type : 3)
      this.applicantForm.value.applican_last_name = this.applicantForm.value.applicant_last_name
      this.applicantForm.value.city_admin_id = this.cityId ? this.cityId : this.application.city_admin_id
      this.applicantForm.value.model = 3

      this.formValue = this.applicantForm.value;
    }
    else if (formGroup == 'hydrantForm' || this.currentTab == 'hydrant') {
      if (this.hydrantForm.invalid) {
        this.isApplicant = true;
        this.permitNavigateValue = null
        return false
      }
      this.hydrantForm.value.permit_type = Number(this.permit_type ? this.permit_type : 3)
      this.hydrantForm.value.address_id = this.addressId
      this.hydrantForm.value.model = 8
      this.getApplication()

      this.formValue = this.hydrantForm.value;
    }
    this.permitService.addPermitApplication(this.formValue).subscribe(data => {
      this.currentTab = nextTab;
      this.permitService.changeMessage(data.status)
      if (this.currentTab == 'reviews') {
        this.completeApplication();
      }

      this.getApplication()
      this.back(this.currentTab, '')
      if (this.permitNavigateValue == 'fine') {
        this.permitNavigateValue = ''
        this.router.navigate(['/dashboard/permit'])

      } else {
        this.router.navigate(['/dashboard/add-hydrant-permit'], { queryParams: { tab: this.currentTab } })
      }

    })
  }

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

  getApplication() {

    this.application = this.permitService.getApplication();
    if (this.application) {
      this.applicantDetails = this.application.applicant_details;
      this.application_hydrant_details = this.application.application_hydrant
      // this.back(this.currentTab, '')
    }
    if (this.application_id) {
      this.permitService.updateApplication(this.application_id).subscribe(data => {
        this.application = data.response;
       
        this.applicantDetails = this.application.applicant_details;
        this.application_hydrant_details = (this.application && this.application.application_hydrant)
        if (this.application) {
          sessionStorage.setItem('application', JSON.stringify(this.application));
          this.permitService.changeMessage(this.application.status)

        }
        this.back(this.currentTab, '')
      })

    }


  }

  back(tab, value: string) {

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
      this.router.navigate(['/dashboard/add-hydrant-permit'], { queryParams: { tab: this.currentTab, cityId: this.cityId } })

    }

  }

  hitOnTab(tab) {
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
    if (tab == 'reviews' || this.currentTab == 'reviews') {
      this.currentTab = tab
      this.getApplication();
      this.addHydrant('hydrantForm', this.currentTab)
    }

  }
  saveAndExit() {
    this.permitNavigateValue = 'fine'
    this.addHydrant('', this.currentTab)

  }

  phoneNumberFormate(value: string) {
    var autoFillValue = '-'
    if (value == 'address') {
      if (this.applicantForm.value.applicant_phone && this.applicantForm.value.applicant_phone.length === 3) {
        this.applicantForm.controls.applicant_phone.setValue(this.applicantForm.value.applicant_phone.concat(autoFillValue))
      }
      if (this.applicantForm.value.applicant_phone && this.applicantForm.value.applicant_phone.length === 7) {
        this.applicantForm.controls.applicant_phone.setValue(this.applicantForm.value.applicant_phone.concat(autoFillValue))
      }
    } else if (value == 'fax') {
      if (this.applicantForm.value.fax && this.applicantForm.value.fax.length === 3) {
        this.applicantForm.controls.fax.setValue(this.applicantForm.value.fax.concat(autoFillValue))
      }
      if (this.applicantForm.value.fax && this.applicantForm.value.fax.length === 7) {
        this.applicantForm.controls.fax.setValue(this.applicantForm.value.fax.concat(autoFillValue))
      }
    }
  }

  public exactAddress = [];
  public storageData:any;
  exextAddress(value) {
    this.storageData = JSON.parse(sessionStorage.getItem('application'))

    if (value == 'applicanjob') { }
    const data = {
      admin_id: this.storageData.city_admin_id,
      query: value == 'address' ? this.hydrantForm.value.hydrant_address : this.hydrantForm.value.hydrant_address,
    }
    if (data.query.length > 1) {
      this.permitService.exextAddress(data).subscribe(data => {
        this.exactAddress = data.response;
        if (value == 'address') {
          if (this.exactAddress.length > 0) {
            this.selectadd = this.exactAddress.map(data => {
              return data.property_location
            })
            this.address.next(this.selectadd)
          } else {
            this.address.next(null)
          }
        } else {
          if (this.exactAddress.length > 0) {
            this.selectadd = this.exactAddress.map(data => {
              return data.property_location
            })
            this.jobAdress.next(this.selectadd)
          } else {
            this.jobAdress.next(null)
          }
        }

      })
    }

  }



  typeaheadOnSelect(e: TypeaheadMatch, value: string, ): void {
    if (value == 'applicanjob') {
      this.exactAddress.every(data => {
        if (e.value == data.property_location) {
          this.addressId = data.id
          return false
        } else {
          return true
        }
      })
    }

  }
  completeApplication() {
    
    const data = {
      application_id: this.application.id
    }
    this.userService.completeApplication(data).subscribe(data => {
      console.log(data)
    })
  }
}
