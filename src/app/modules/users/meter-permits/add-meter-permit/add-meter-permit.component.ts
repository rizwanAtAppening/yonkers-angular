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
  selector: 'app-add-meter-permit',
  templateUrl: './add-meter-permit.component.html',
  styleUrls: ['./add-meter-permit.component.css']
})
export class AddMeterPermitComponent implements OnInit {
  public applicantForm: FormGroup;
  public application: any
  public meterDeatilsForm: FormGroup;
  public permit_type: number
  public isMerter = false;
  public formValue: any;
  public currentTab:string
  public exactAddress = [];
  public address = new Subject<any>();
  public addressOne = [];
  public addressTwo = []
  public selectadd = []
  public jobAdress = new Subject<any>();
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
    debugger
    this.minDate = new Date();
    this.onInIt();
    this.route.queryParams.subscribe(data => {
      this.permit_type = Number(data.permitType),
        this.currentTab = data.tab;
        if(this.currentTab){
          this.back(this.currentTab)
        }
    })
    
   
  
    this.getApplication()
    if (this.currentTab == 'applicant') {
      this.getCurrentUser()
    }
  }

  onInIt() {
    this.applicantFormControl();
    this.meterFormControls()
  }

  applicantFormControl() {
    this.applicantForm = this._FB.group({
      applicant_name: ['', Validators.required],
      applicant_last_name: ['', Validators.required],
      applicant_phone: ['', Validators.required],
      applicant_address: ['', Validators.required],
      block: ['', Validators.required],
      lot: ['', Validators.required],
      owner: ['', Validators.required],
      applicant_job_location: ['', Validators.required]
    })
  }

  get meterApplicantCon() {
    return this.applicantForm.controls;
  }

  meterFormControls() {
    this.meterDeatilsForm = this._FB.group({
      domestic_meter_number: ['', Validators.required],
      domestic_size: ['', Validators.required],
      fireline_meter_number: ['', Validators.required],
      fireline_size: ['', Validators.required],
      hydrent_use_from: ['', Validators.required],
      hydrent_use_to: ['', Validators.required],
      location: ['', Validators.required],
      meter_test_number: ['', Validators.required],
      meter_test_size: ['', Validators.required],
      new_meter_number: ['', Validators.required],
      new_meter_size: ['', Validators.required],
      replacement_meter_number: ['', Validators.required],
      replacement_meter_size: ['', Validators.required],
      status: [''],
      tap_size: ['', Validators.required],
      total_amount: ['', Validators.required],

    })
  }


  addMeterPermit(formGroup: string, nextTab) {
    debugger
    this.back(nextTab)
    if (formGroup == 'applicant') {
      if (this.applicantForm.invalid) {
        this.isMerter = true;
        return false
      }
      this.applicantForm.value.permit_type = this.permit_type ? this.permit_type : 2
      this.applicantForm.value.address_id = this.addressId
      this.applicantForm.value.model = 3

      this.formValue = this.applicantForm.value
    }
    else if (formGroup == 'meterDetails') {
      // if (this.meterDeatilsForm.invalid) {
      //   this.isMerter = true;
      //   return false
      // }
      this.meterDeatilsForm.value.permit_type = this.permit_type ? this.permit_type : 2
      this.meterDeatilsForm.value.model = 7
      this.meterDeatilsForm.value.status = 7
      this.meterDeatilsForm.value.meterSizeType = this.meterSizeType,
      this.meterDeatilsForm.value.wetConnctionType = this.wetConnctionType,

      
      this.formValue = this.meterDeatilsForm.value
    }
    this.permitService.addPermitApplication(this.formValue).subscribe(data => {
      //this.toasterService.success('')
      this.currentTab = nextTab;
      this.getApplication()
      this.router.navigate(['/dashboard/add-meter-permit'], { queryParams: { tab: this.currentTab } })
    })

  }


  //private subject = new Subject<any>();
  exextAddress(value) {
    debugger
    if (value == 'applicanjob') { }
    const data = {
      query: value == 'address' ? this.applicantForm.value.applicant_address : this.applicantForm.value.applicant_job_location,
    }
    if (data.query.length > 1) {
      this.permitService.exextAddress(data).subscribe(data => {
        this.exactAddress = data.response;
        if (value == 'address') {
          if (this.exactAddress.length > 0) {
            this.selectadd = this.exactAddress.map(data => {
              return data.szFullAddress
            })
            this.address.next(this.selectadd)
          } else {
            this.address.next(null)
          }
        } else {
          if (this.exactAddress.length > 0) {
            this.selectadd = this.exactAddress.map(data => {
              return data.szFullAddress
            })
            this.jobAdress.next(this.selectadd)
          } else {
            this.jobAdress.next(null)
          }
        }

        //   this.addressOne = this.exactAddress.map(data => {
        //     return data.szStreet_name
        //   })
        //   this.addressTwo = this.exactAddress.map(data => {
        //     return data.szStreet_name
        //   })
        // }

        console.log(this.address)
      })
    }

  }

  addressId: number
  typeaheadOnSelect(e: TypeaheadMatch, value: string, ): void {
    debugger
    if (value == 'address') {
      this.exactAddress.every(data => {
        if (e.value == data.szFullAddress) {
          //this.whereForm.value.address_id = data.id;
          this.addressId = data.id
          console.log(this.addressId)
          return false
        } else {
          return true
        }
      })
    }

  }

  hitOnTab(tab) {
    debugger
    this.back(tab)
    if (this.currentTab == 'applicant') {
      if (this.applicantForm.invalid) {
        this.isMerter = true
        return false
      }
      this.currentTab = tab
      this.router.navigate(['/dashboard/add-meter-permit'], { queryParams: { tab: this.currentTab } })

    }
    else if (this.currentTab == 'meterDetails') {
      if (this.meterDeatilsForm.invalid) {
        this.isMerter = true
        return false
      }
      this.currentTab = tab
      this.router.navigate(['/dashboard/add-meter-permit'], { queryParams: { tab: this.currentTab } })
    }
    if(tab == 'reviews'){
      this.getApplication()
    }

  }

  public meterSizeType: number = 1;
  public wetConnctionType: number = 1;
  selectType(value: string, selectValue) {
    if (value == 'new') {
      this.meterSizeType = selectValue
    } else if (value == 'replacement') {
      this.meterSizeType = selectValue
    }
    else if (value == 'fireline') {
      this.wetConnctionType = selectValue
    }
    else if (value == 'domestic') {
      this.wetConnctionType = selectValue
    }
  } public applicantDetails: any;
  public application_metter_details: any;
  getApplication() {
    debugger
    this.application = this.permitService.getApplication();
    this.applicantDetails = this.application.applicant_details;
    this.application_metter_details = this.application.application_metter_details

    console.log(this.application)

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
    })
  }

  // updateAppliction() {
  //   this.permitService.updateApplication(this.application_id).subscribe(data => {
  //     this.application = data.response;
  //     if(this.application){
  //       sessionStorage.setItem('application', JSON.stringify(this.application));

  //     }
  //   })
  // }




  back(tab) {
    debugger
    this.getApplication();
    this.currentTab = tab
    if (tab == 'applicant') {
      this.applicantForm.controls.applicant_name.setValue(this.applicantDetails.applicant_name)
      this.applicantForm.controls.applicant_last_name.setValue(this.applicantDetails.applican_last_name)
      this.applicantForm.controls.block.setValue(this.applicantDetails.block)
      this.applicantForm.controls.lot.setValue(this.applicantDetails.lot)
      this.applicantForm.controls.owner.setValue(this.applicantDetails.owner)
      this.applicantForm.controls.applicant_address.setValue(this.applicantDetails.applicant_address)
      this.applicantForm.controls.applicant_phone.setValue(this.applicantDetails.applicant_phone)
      this.applicantForm.controls.applicant_job_location.setValue(this.applicantDetails.applicant_job_location)
    
    }
    if (tab == 'meterDetails') {
      this.meterDeatilsForm.controls.domestic_meter_number.setValue(this.application_metter_details.domestic_meter_number)
      this.meterDeatilsForm.controls.domestic_size.setValue(this.application_metter_details.domestic_size)
      this.meterDeatilsForm.controls.fireline_meter_number.setValue(this.application_metter_details.fireline_meter_number)
      this.meterDeatilsForm.controls.fireline_size.setValue(this.application_metter_details.fireline_size)
      this.meterDeatilsForm.controls.hydrent_use_from.setValue(new Date(this.application_metter_details.hydrent_use_from) )
      this.meterDeatilsForm.controls.hydrent_use_to.setValue( new Date(this.application_metter_details.hydrent_use_to) )
      this.meterDeatilsForm.controls.location.setValue(this.application_metter_details.location)
      this.meterDeatilsForm.controls.meter_test_number.setValue(this.application_metter_details.meter_test_number)
      this.meterDeatilsForm.controls.meter_test_size.setValue(this.application_metter_details.meter_test_size)
      this.meterDeatilsForm.controls.new_meter_number.setValue(this.application_metter_details.new_meter_number)
      this.meterDeatilsForm.controls.new_meter_size.setValue(this.application_metter_details.new_meter_size)
      this.meterDeatilsForm.controls.replacement_meter_number.setValue(this.application_metter_details.replacement_meter_number)
      this.meterDeatilsForm.controls.replacement_meter_size.setValue(this.application_metter_details.replacement_meter_size)
      this.meterDeatilsForm.controls.status.setValue(this.application_metter_details.status)
      this.meterDeatilsForm.controls.tap_size.setValue(this.application_metter_details.tap_size)
      this.meterDeatilsForm.controls.total_amount.setValue(this.application_metter_details.total_amount)
    }
    this.router.navigate(['/dashboard/add-meter-permit'], { queryParams: { tab: this.currentTab } })

  }
}
