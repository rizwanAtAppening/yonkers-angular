import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { PermitService } from 'src/app/core/services/users/permit.service';
import { appToaster, settingConfig } from 'src/app/configs';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';

@Component({
  selector: 'app-add-daily-work-loaction',
  templateUrl: './add-daily-work-loaction.component.html',
  styleUrls: ['./add-daily-work-loaction.component.css']
})
export class AddDailyWorkLoactionComponent implements OnInit {
  public dwlForm: FormGroup;
  public settings: any;
  public isPermit = false;
  constructor(
    private fb: FormBuilder,
    private permitService: PermitService,
    private router: Router,
    private toasterService: ToastrService,
    private route: ActivatedRoute


  ) {
    this.settings = settingConfig;

  }
  public applicationId: any
  public dwlType: any
  ngOnInit(): void {
    this.onInIt();
    this.getPermitApplication();
    this.route.queryParams.subscribe(data => {
      this.id = data.id
      this.applicationId = data.id
      this.dwlType = data.type;
      if (this.dwlType) {
        localStorage.setItem('dwlType', this.dwlType);

      }
      if (this.id) {
        this.getApplication();
      }
    })

  }

  onInIt() {
    this.dwlFormControl()
  }

  dwlFormControl() {
    this.dwlForm = this.fb.group({
      address_id: [''],
      street_one: [''],
      address_join: [''],
      street_two: [''],
      work_description: ['', Validators.required],
      parcel_number: [''],
      layout_number: [''],
      permit_number: [''],
      permit_type: [''],
      work_category: [''],
      also_know_as: [''],
      addlocation: this.fb.array([
        this.addLocationFormGroup(),
      ])
    })
  }

  addLocationFormGroup(): FormGroup {
    return this.fb.group({
      street_one: ['', Validators.required],
      street_two: ['', Validators.required],
      address_join: ['', Validators.required]
    })
  }

  get addLocationControls() {
    return this.dwlForm.controls.addlocation as FormArray;
  }

  get addCon() {
    return this.dwlForm.controls.addlocation;

  }
  addLocationForm(): void {

    this.addLocationControls.push(this.addLocationFormGroup())
  }


  remove(index) {


    this.addLocationControls.controls.map((data, i) => {
      if (index == i) {
        this.addLocationControls.controls.splice(i, i);
        data['controls'].street_one.setErrors(null)
        data['controls'].street_two.setErrors(null)
        data['controls'].address_join.setErrors(null)

        this.addLocationControls.value.splice(i, i)

      }
    })
  }

  get dwlControl() { return this.dwlForm.controls }

  public location_type: number = 1
  selectAddress(value: string) {
    if (value == 'location') {
      this.location_type = 2
    } else {
      this.location_type = 1

    }

  }

  public submitApplication = {}
  public updateValueDwl = []
  submitDailyWorkLocation() {
    
    if(this.applicationId){
      this.updateValueDwl = [{id:this.applicationId}]
      this.submitApplication = {
        application:this.updateValueDwl
      }
    }
    else{
      this.submitApplication = {
        application: this.dwlApplication
      }
    }
    this.permitService.submitDailyWorkLocation(this.submitApplication).subscribe(data => {
      console.log(data)
      this.router.navigate(['/dashboard/permit'])

    })
  }
  public isdwlSubmit = false;
  public dwlApplication = []
  public dwlData = {}
  adddwl() {
    
    if (this.location_type == 1) {
      this.addLocationControls.controls.map((value, i) => {
        value['controls'].street_one.setErrors(null)
      })
      this.addLocationControls.controls.map((value, i) => {
        value['controls'].address_join.setErrors(null)
      })
      this.addLocationControls.controls.map((value, i) => {
        value['controls'].street_two.setErrors(null)
      })
    }
    else if (this.location_type == 2) {
      this.dwlForm.controls.address_id.setErrors(null)
      this.dwlForm.controls.parcel_number.setErrors(null)

    }
    if (this.dwlForm.invalid) {
      this.isdwlSubmit = true;
      return false
    }
    

    if (this.location_type == 1) {
      this.dwlData = {
        //address_id: this.dwlForm.value.address_id,
        address_id:this.addressId,
        layout_number: this.dwlForm.value.layout_number,
        permit_number: this.dwlForm.value.permit_number,
        permit_type: this.dwlForm.value.permit_type,
        parcel_number: this.dwlForm.value.parcel_number,

        sub_contractor: this.dwlForm.value.sub_contractor,
        sub_contractor_phone: this.dwlForm.value.sub_contractor_phone,
        work_category: Number(this.dwlForm.value.work_category),
        work_description: this.dwlForm.value.work_description,
        also_know_as: this.dwlForm.value.also_know_as,
        location_type: this.location_type,
        id: this.id ? this.id : null,
        dwl_id: this.dwl_id ? this.dwl_id : null,
      }

    }
    else {
      this.dwlData = {
        layout_number: this.dwlForm.value.layout_number,
        permit_number: this.dwlForm.value.permit_number,
        permit_type: this.dwlForm.value.permit_type,
        parcel_number: this.dwlForm.value.parcel_number,
        sub_contractor: this.dwlForm.value.sub_contractor,
        also_know_as: this.dwlForm.value.also_know_as,
        sub_contractor_phone: this.dwlForm.value.sub_contractor_phone,
        work_category: this.dwlForm.value.work_category,
        work_description: this.dwlForm.value.work_description,
        location_type: this.location_type,
        id: this.id ? this.id : null,
        dwl_id: this.dwl_id ? this.dwl_id : null,
        locations: this.dwlForm.controls.addlocation.value

      }
    }

    this.permitService.addDailyWorkLocation(this.dwlData).subscribe(data => {
      this.dwlApplication = data.response;
      this.isdwlSubmit = false;
      this.dwlForm.reset()
      if (this.id && this.applicationId) {
        this.submitDailyWorkLocation()
      }
    })
  }

  public applictionDetails = []
  application_type: number = 2
  // currentPage = 1
  getPermitApplication() {
    this.permitService.getPermitApplication({ application_type: this.application_type }).subscribe(data => {
      this.applictionDetails = data.response;
      this.dwlApplication = this.applictionDetails.filter(data => {
        if (data.status == null && data.application_type == 2) {
          data.isSingleAddress = true
          return data
        }
      })

    })
  }

  public id: number
  public dwl_id: number
  editAppliction(value) {

    this.location_type = value.location_type
    this.id = value.id;
    this.dwl_id = value.application_daily_work_location.id
    if (this.location_type == 2) {
      if (value.location.length > 1) {
        for (let index = 0; index < value.location.length - 1; index++) {
          if (value.location.length != this.addLocationControls.value.length) {
            this.addLocationControls.push(this.addLocationFormGroup())
          }
          value.location.map((data, i) => {
            this.addLocationControls.controls.map((value, j) => {
              if (i == j) {
                value['controls'].street_one.setValue(data.street_one)
                value['controls'].street_two.setValue(data.street_two)
                value['controls'].address_join.setValue(data.address_join)
              }
            })
          })

        }
      }
      else {
        value.location.map((data, i) => {
          this.addLocationControls.controls.map((value, j) => {
            if (i == j) {
              value['controls'].street_one.setValue(data.street_one)
              value['controls'].street_two.setValue(data.street_two)
              value['controls'].address_join.setValue(data.address_join)
            }
          })
        })
      }
      this.dwlForm.controls.work_description.setValue(value.application_daily_work_location.work_description)
      this.dwlForm.controls.work_category.setValue(value.application_daily_work_location.work_category)
      this.dwlForm.controls.permit_type.setValue(value.application_daily_work_location.permit_type)

      this.dwlForm.controls.parcel_number.setValue(value.application_daily_work_location.parcel_number)
      this.dwlForm.controls.permit_number.setValue(value.application_daily_work_location.permit_number)
      this.dwlForm.controls.layout_number.setValue(value.application_daily_work_location.layout_number)

    }
    else if (this.location_type == 1) {
      this.dwlForm.controls.work_category.setValue(value.application_daily_work_location.work_category)
      this.dwlForm.controls.permit_type.setValue(value.application_daily_work_location.permit_type)

      this.dwlForm.controls.work_description.setValue(value.application_daily_work_location.work_description)
      this.dwlForm.controls.parcel_number.setValue(value.application_daily_work_location.parcel_number)
      this.dwlForm.controls.permit_number.setValue(value.application_daily_work_location.permit_number)
      this.dwlForm.controls.layout_number.setValue(value.application_daily_work_location.layout_number)
      this.dwlForm.controls.address_id.setValue(value.application_daily_work_location.address_id)


    }
  }

  deleteApplication(id) {

    this.permitService.deleteDailyWorklocation(id).subscribe(data => {
      this.toasterService.success('Delete Succesfully');
      this.getPermitApplication()
    })
  }

  removeAnResetForm() {

    this.dwlForm.reset();
    if (this.addLocationControls.controls.length > 1) {
      this.addLocationControls.controls.map((data, i) => {
        this.remove(i);
        if (this.addLocationControls.controls.length == 1) {
          return false
        }
      })
    }

  }

  public layOutData: any;
  fillDataByLayOutNumber() {
    
    const value = this.dwlForm.value.layout_number
    if (value == null) {
      this.removeAnResetForm()
    }
    this.permitService.getDetailByLayOutNumber({ layout: value }).subscribe(data => {
      this.layOutData = data.response;
      
      if ( this.layOutData && this.layOutData.application_daily_work_location != null) {
        this.fillFormOnEditAndByLayoutNumber(this.layOutData)
      }
    })

  }

  fillFormOnEditAndByLayoutNumber(value) {
    
    this.layOutData = value
    if (this.layOutData.application_daily_work_location) {
      this.location_type = this.layOutData.location_type
      this.dwlForm.controls.permit_type.setValue(this.layOutData.permit_type)
      this.dwlForm.controls.work_category.setValue(this.layOutData.application_daily_work_location.work_category)
      this.dwlForm.controls.permit_number.setValue(this.layOutData.application_daily_work_location.permit_number)
      this.dwlForm.controls.parcel_number.setValue(this.layOutData.application_daily_work_location.parcel_number)
      this.dwlForm.controls.work_description.setValue(this.layOutData.application_daily_work_location.work_description)
      this.dwlForm.controls.layout_number.setValue(this.layOutData.application_daily_work_location.layout_number)

      if (this.location_type == 2) {
        if (this.layOutData.location.length > 1) {
          for (let index = 0; index < this.layOutData.location.length - 1; index++) {
            if (this.layOutData.location.length != this.addLocationControls.value.length) {
              this.addLocationControls.push(this.addLocationFormGroup())
            }
            this.layOutData.location.map((data, i) => {
              this.addLocationControls.controls.map((value, j) => {
                if (i == j) {
                  value['controls'].street_one.setValue(data.street_one)
                  value['controls'].street_two.setValue(data.street_two)
                  value['controls'].address_join.setValue(data.address_join)
                }
              })
            })

          }
        }
        else {
          this.layOutData.location.map((data, i) => {
            this.addLocationControls.controls.map((value, j) => {
              if (i == j) {
                
                value['controls'].street_one.setValue(data.street_one)
                value['controls'].street_two.setValue(data.street_two)
                value['controls'].address_join.setValue(data.address_join)
              }
            })
          })
        }
      } else {
        this.dwlForm.controls.address_id.setValue(this.layOutData.address_id)

      }
    }


  }

  showMoreLocation(value, id) {
    
    this.dwlApplication.map(data => {
      if (data.id == id && data.status == null && data.application_type == 2) {
        data.isSingleAddress = value

      } else {
        data.isSingleAddress = !value

      }
    })

  }
  public applicationDetail: any;
  getApplication() {
    
    this.permitService.getApplicationById(this.id).subscribe(data => {
      this.applicationDetail = data.response;
      if (this.applicationDetail.application_daily_work_location) {
        this.dwl_id = this.applicationDetail.application_daily_work_location.id
      }
      if (this.applicationDetail) {
        this.fillFormOnEditAndByLayoutNumber(this.applicationDetail)
      }
    })
  }

  public searchString
  public exactAddress = [];
  public address = []
  public addressOne = [];
  public addressTwo = []
  exextAddress() {
    const data = {
      query: this.searchString,
    }
    this.permitService.exextAddress(data).subscribe(data => {
      this.exactAddress = data.response;
      if (this.exactAddress.length > 0) {
        this.address = this.exactAddress.map(data => {
          return data.szFullAddress
        })
        this.addressOne = this.exactAddress.map(data => {
          return data.szStreet_name
        })
        this.addressTwo = this.exactAddress.map(data => {
          return data.szStreet_name
        })
      }

      console.log(this.address)
    })
  }

  searchAddress(sendValue: string, index) {
    debugger
    var value: string

    if (sendValue == 'exact') {
      value = this.dwlForm.value.address_id
      this.searchString = value;
      if (this.searchString.length > 1) {
        this.exextAddress()
      }

    }
    if (sendValue == 'location') {
      // value = this.addLocationControls.value.street_one
      // this.searchString = value;
      this.addLocationControls.value.map((data, i) => {
        if (index == i) {
          this.searchString = (data.street_one).toString()
        }
      })
      if (this.searchString.length > 1) {
        this.exextAddress()
      }
    }
    if (sendValue == 'locationtwo') {
      // value = this.addLocationControls.value.street_one
      // this.searchString = value;
      this.addLocationControls.value.map((data, i) => {
        if (index == i) {
          this.searchString = data.street_one
        }
      })
      if (this.searchString.length > 1) {
        this.exextAddress()
      }
    }

  }

  public addressId: number;
  public addressOneId: number;
  public addressTwoId: number;
  typeaheadOnSelect(e: TypeaheadMatch, value: string, address: string): void {
    if (value == 'exact') {
      this.exactAddress.every(data => {
        if (e.value == data.szFullAddress) {
          //this.whereForm.value.address_id = data.id;
          this.addressId = data.id
          return false
        } else {
          return true
        }
      })
    } else if (value == 'location') {
      if (address == 'addressTwo') {
        this.exactAddress.every(data => {
          if (e.value == data.szFullAddress) {
            //this.whereForm.value.address_id = data.id;
            this.addressTwo = data.id
            return false
          } else {
            return true
          }
        })
      }
      else if (address == 'addressOne') {
        this.exactAddress.every(data => {
          if (e.value == data.szFullAddress) {
            //this.whereForm.value.address_id = data.id;
            this.addressOne = data.id
            return false
          } else {
            return true
          }
        })
      }
    }

  }
}
