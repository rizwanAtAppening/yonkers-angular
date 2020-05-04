import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/core/services';
import { PermitService } from 'src/app/core/services/users/permit.service';
import { appToaster, settingConfig } from 'src/app/configs';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';

@Component({
  selector: 'app-permit',
  templateUrl: './permit.component.html',
  styleUrls: ['./permit.component.css']
})
export class PermitComponent implements OnInit {
  public settings: any;
  public applictionDetails = []
  public dwlForm: FormGroup;
  public offset: number = 10;
  public currentPage: number = 1;
  public totalPagination: number;
  public userType: number
  constructor(
    private userService: UsersService,
    private permitService: PermitService,
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthenticationService

  ) {
    this.settings = settingConfig;
  }

  ngOnInit() {
    this.userService.changeSaveAndExit(true);
    this.permitService.deleteSessionApplication();
    this.getPermitApplication();
    this.onInIt();
    this.currentUser()

  }

  onInIt() {
    this.dwlFormControl()
  }

  public currentUserInfo: any
  currentUser() {
    debugger
    this.authService.getUserInfo().subscribe(currentUser => {
      this.currentUserInfo = currentUser
      this.userType = this.currentUserInfo.type
    })
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
      street_one: [''],
      street_two: [],
      address_join: []
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
    })
  }
  public isdwlSubmit = false;
  public dwlApplication = []
  public dwlData = {}
  adddwl() {
    debugger
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
        location_type: this.location_type
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
        // locations: [{
        //   street_one: this.dwlForm.value.street_one ? Number(this.dwlForm.value.street_one) : null, address_join: this.dwlForm.value.address_join ? Number(this.dwlForm.value.address_join) : null,
        //   street_two: this.dwlForm.value.street_two ? Number(this.dwlForm.value.street_two) : null
        // }]
        locations :this.dwlForm.controls.addlocation.value

      }
    }

    this.permitService.addDailyWorkLocation(this.dwlData).subscribe(data => {
      this.dwlApplication = data.response;
      this.isdwlSubmit = false;
      this.dwlForm.reset()
    })
  }

  getPermitApplication() {

    // const data = {
    //   page: this.currentPage
    // }
    this.permitService.getPermitApplication({ page: this.currentPage }).subscribe(data => {
      this.applictionDetails = data.response;
      // this.dwlApplication = this.applictionDetails.filter(data => {
      //   if (data.status == null && data.application_type == 2) {
      //     return data
      //   }
      // })
      console.log(this.dwlApplication)
      this.offset = data.offset;
      this.totalPagination = data.total
      this.currentPage = data.currentPage;
    })
  }

  paginate(page) {
    debugger
    this.currentPage = page
    this.getPermitApplication()
  }
  public searchString: string
  searchApplication() {
    debugger
    const data = {
      search_query: String(this.searchString),
    }
    this.permitService.searchApplication(data).subscribe(data => {
      this.applictionDetails = data.response;
    })
  }

  updateApplication(applicationId) {

    this.router.navigate(['/dashboard/update-application'], { queryParams: { id: applicationId } });
  }
}
