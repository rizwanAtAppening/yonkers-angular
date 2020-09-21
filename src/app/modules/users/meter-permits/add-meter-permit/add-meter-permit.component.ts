import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MeterServiceService } from 'src/app/core/services/users/meter-service.service';
import { ToastrService } from 'ngx-toastr';
import { PermitService } from 'src/app/core/services/users/permit.service';
import { Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead/public_api';

@Component({
  selector: 'app-add-meter-permit',
  templateUrl: './add-meter-permit.component.html',
  styleUrls: ['./add-meter-permit.component.css']
})
export class AddMeterPermitComponent implements OnInit {
  public applicantForm: FormGroup;
  public meterDeatilsForm: FormGroup;
  public permit_type: number
  public isMerter = false;
  public formValue: any;
  public currentTab = 'applicant'
  public exactAddress = [];
  public address = new Subject<any>();
  public addressOne = [];
  public addressTwo = []
  public selectadd = []
  public jobAdress = new Subject<any>();
  constructor(
    private _FB: FormBuilder,
    private meterService: MeterServiceService,
    private toasterService: ToastrService,
    private permitService: PermitService,
    private route: ActivatedRoute,
    private router: Router

  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(data => {
      this.permit_type = Number(data.permitType),
        this.currentTab = data.tab
    })
    this.onInIt()
  }

  onInIt() {
    this.applicantFormControl();
    this.meterFormControls()
  }

  applicantFormControl() {
    this.applicantForm = this._FB.group({
      applicant_name: ['', Validators.required],
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
      status: ['', Validators.required],
      tap_size: ['', Validators.required],
      total_amount: ['', Validators.required],

    })
  }


  addMeterPermit(formGroup: string, nextTab) {
    debugger
    if (formGroup == 'applicant') {
      if (this.applicantForm.invalid) {
        this.isMerter = true;
        return false
      }
      this.applicantForm.value.permit_type = this.permit_type
      this.applicantForm.value.address_id = this.addressId
      this.applicantForm.value.model = 3

      this.formValue = this.applicantForm.value
    }
    else if (formGroup == 'meterDetails') {
      // if (this.meterDeatilsForm.invalid) {
      //   this.isMerter = true;
      //   return false
      // }
      this.meterDeatilsForm.value.permit_type = this.permit_type
      this.meterDeatilsForm.value.model = 7
      this.meterDeatilsForm.value.status = 7
      this.formValue = this.meterDeatilsForm.value
    }
    this.permitService.addPermitApplication(this.formValue).subscribe(data => {
      //this.toasterService.success('')
      this.currentTab = nextTab
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

  hitOnTab(formGroup, tab) {
    debugger
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

  }

}
