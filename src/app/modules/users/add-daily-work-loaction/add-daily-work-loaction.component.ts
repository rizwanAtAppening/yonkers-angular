import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { PermitService } from 'src/app/core/services/users/permit.service';
import { appToaster, settingConfig } from 'src/app/configs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-daily-work-loaction',
  templateUrl: './add-daily-work-loaction.component.html',
  styleUrls: ['./add-daily-work-loaction.component.css']
})
export class AddDailyWorkLoactionComponent implements OnInit {
  public dwlForm: FormGroup;
  public settings: any;

  constructor(
    private fb: FormBuilder,
    private permitService: PermitService,
    private router: Router,
    private toasterService: ToastrService,


  ) {
    this.settings = settingConfig;

  }

  ngOnInit(): void {
    this.onInIt();
    this.getPermitApplication()
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
      sub_contractor: [''],
      sub_contractor_phone: [''],
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
    debugger
    this.addLocationControls.push(this.addLocationFormGroup())
  }


  remove(index) {
    debugger

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

  submitDailyWorkLocation() {
    const data = {

    }
    this.permitService.submitDailyWorkLocation({ application: this.dwlApplication }).subscribe(data => {
      console.log(data)
      this.router.navigate(['/dashboard/permit'])

    })
  }
  public isdwlSubmit = false;
  public dwlApplication = []
  public dwlData = {}
  adddwl() {

    debugger
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
    if (this.dwlForm.invalid) {
      this.isdwlSubmit = true;
      return false
    }


    if (this.location_type == 1) {
      this.dwlData = {
        address_id: this.dwlForm.value.address_id,
        layout_number: this.dwlForm.value.layout_number,
        permit_number: this.dwlForm.value.permit_number,
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
        sub_contractor: this.dwlForm.value.sub_contractor,
        also_know_as: this.dwlForm.value.also_know_as,
        sub_contractor_phone: this.dwlForm.value.sub_contractor_phone,
        work_category: this.dwlForm.value.work_category,
        work_description: this.dwlForm.value.work_description,
        location_type: this.location_type,
        id: this.id ? this.id : null,
        dwl_id: this.dwl_id ? this.dwl_id : null,
        // locations: [{
        //   street_one: this.dwlForm.value.street_one ? Number(this.dwlForm.value.street_one) : null, address_join: this.dwlForm.value.address_join ? Number(this.dwlForm.value.address_join) : null,
        //   street_two: this.dwlForm.value.street_two ? Number(this.dwlForm.value.street_two) : null
        // }]
        locations: this.dwlForm.controls.addlocation.value

      }
    }

    this.permitService.addDailyWorkLocation(this.dwlData).subscribe(data => {
      this.dwlApplication = data.response;
      this.isdwlSubmit = false;
      this.dwlForm.reset()
    })
  }

  public applictionDetails = []
  application_type: number = 2
  // currentPage = 1
  getPermitApplication() {
    debugger
    // if (this.userType == 3) {
    //   this.application_type = 1
    // } else {
    //   this.application_type = 2

    // }
    // const data = {
    //   page: this.currentPage
    // }
    this.permitService.getPermitApplication({ application_type: this.application_type }).subscribe(data => {
      this.applictionDetails = data.response;
      this.dwlApplication = this.applictionDetails.filter(data => {
        if (data.status == null && data.application_type == 2) {
          return data
        }
      })
      // console.log(this.dwlApplication)
      // this.offset = data.offset;
      // this.totalPagination = data.total
      // this.currentPage = data.currentPage;
    })
  }

  // address_id: [''],
  // street_one: [''],
  // address_join: [''],
  // street_two: [''],
  // work_description: ['', Validators.required],
  // parcel_number: [''],
  // layout_number: [''],
  // permit_number: [''],
  // sub_contractor: [''],
  // sub_contractor_phone: [''],
  // work_category: [''],
  // also_know_as: [''],
  public id: number
  public dwl_id: number
  editAppliction(value) {
    debugger
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

      this.dwlForm.controls.parcel_number.setValue(value.application_daily_work_location.parcel_number)
      this.dwlForm.controls.permit_number.setValue(value.application_daily_work_location.permit_number)
      this.dwlForm.controls.layout_number.setValue(value.application_daily_work_location.layout_number)

    }
    else if (this.location_type == 1) {
      this.dwlForm.controls.work_category.setValue(value.application_daily_work_location.work_category)

      this.dwlForm.controls.work_description.setValue(value.application_daily_work_location.work_description)
      this.dwlForm.controls.parcel_number.setValue(value.application_daily_work_location.parcel_number)
      this.dwlForm.controls.permit_number.setValue(value.application_daily_work_location.permit_number)
      this.dwlForm.controls.layout_number.setValue(value.application_daily_work_location.layout_number)
      this.dwlForm.controls.address_id.setValue(value.application_daily_work_location.address_id)


    }
  }

  deleteApplication(id) {
    debugger
    this.permitService.deleteDailyWorklocation(id).subscribe(data => {
      this.toasterService.success('Delete Succesfully');
      this.getPermitApplication()
    })
  }

}
