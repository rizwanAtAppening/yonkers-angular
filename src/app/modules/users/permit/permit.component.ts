import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { UsersService } from 'src/app/core/services';
import { PermitService } from 'src/app/core/services/users/permit.service';
import { appToaster, settingConfig } from 'src/app/configs';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-permit',
  templateUrl: './permit.component.html',
  styleUrls: ['./permit.component.css']
})
export class PermitComponent implements OnInit {
  @ViewChild('confirmPopUp', { static: false }) confirmPopUp: ElementRef;
  @ViewChild('cancelConfirmPopUp', { static: false }) cancelConfirmPopUp: ElementRef;
  @ViewChild('withdrawConfirmPopUp', { static: false }) withdrawConfirmPopUp: ElementRef;

  public applicationId: number;

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
    private authService: AuthenticationService,
    private toastService: ToastrService

  ) {
    this.settings = settingConfig;
  }

  public dwlType: string = '1'
  ngOnInit() {
    if (localStorage.getItem('dwlType')) {
      this.dwlType = (localStorage.getItem('dwlType'));
      localStorage.removeItem('dwlType');
    }


    this.userService.changeSaveAndExit(true);
    this.permitService.deleteSessionApplication();
    this.getPermitApplication(this.dwlType);
    this.onInIt();
    this.currentUser()

  }

  onInIt() {
    this.dwlFormControl()
  }

  public currentUserInfo: any
  currentUser() {

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

    this.addLocationControls.push(this.addLocationFormGroup())
  }


  remove(index) {


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
        locations: this.dwlForm.controls.addlocation.value

      }
    }

    this.permitService.addDailyWorkLocation(this.dwlData).subscribe(data => {
      this.dwlApplication = data.response;
      this.isdwlSubmit = false;
      this.dwlForm.reset()
    })
  }

  public application_type: number
  getPermitApplication(dwlType) {
debugger
    this.dwlType = dwlType
    this.currentUser()
    if (this.dwlType == '1') {
      this.application_type = 1
    } else if (this.dwlType == '2') {
      this.application_type = 2

    }
    // const data = {
    //   page: this.currentPage
    // }
    this.permitService.getPermitApplication({ page: this.currentPage, application_type: this.application_type }).subscribe(data => {
      this.applictionDetails = data.response;
      // this.dwlApplication = this.applictionDetails.filter(data => {
      //   if (data.status == null && data.application_type == 2) {
      //     return data
      //   }
      // })
      this.applictionDetails.map(data => {
        data.isSingleAddress = true
      })
      console.log(this.dwlApplication)
      this.offset = data.offset;
      this.totalPagination = data.total
      this.currentPage = data.currentPage;
    })
  }

  paginate(page, dwlType) {
    this.dwlType = dwlType

    this.currentPage = page
    this.getPermitApplication(this.dwlType)
  }
  public searchString: string
  searchApplication() {
debugger
    if (this.dwlType == '1') {
      this.application_type = 1
    } else if (this.dwlType == '2') {
      this.application_type = 2

    }
    const data = {
      search_query: String(this.searchString),
      application_type: this.application_type
    }
    this.permitService.searchApplication(data).subscribe(data => {
      this.applictionDetails = data.response;
      // console.log(this.dwlApplication)
      this.offset = data.offset;
      this.totalPagination = data.total
      this.currentPage = data.currentPage;
    })
  }

  updateApplication(applicationId) {

    this.router.navigate(['/dashboard/update-application'], { queryParams: { id: applicationId } });
  }
  navigate(value) {
    if (value == 1) {
      this.router.navigate(['/dashboard/add-user-permit'], { queryParams: { type: value } })
      localStorage.setItem('dwlType', '1');

    }
    else {
      this.router.navigate(['/dashboard/daily-work-location'], { queryParams: { type: value } })
      localStorage.setItem('dwlType', '2');


    }
  }
  getApplicationId(id) {

    this.applicationId = id
  }

  convertPermitApplication() {
    debugger
    this.permitService.convertPermitApplication(this.applicationId).subscribe(data => {
      this.confirmPopUp.nativeElement.click();
      this.toastService.success('Application have beed converted');

      this.getPermitApplication(this.dwlType);
      //this.router.navigate(['/dashboard/add-user-permit'], { queryParams: { type: 1 } })
    })
  }

  public isSingleAddress = true;
  public currentId: number
  showMoreLocation(value, id) {

    this.currentId = id
    this.applictionDetails.map(data => {
      if (data.id == id) {
        data.isSingleAddress = value

      } else {
        data.isSingleAddress = !value
      }
    })

  }
  naviagetByUrl(url, id, type) {
    this.router.navigate([url], { queryParams: { type: type, id: id } })
  }

  cancelPermit() {

    this.permitService.cancelPermit(this.applicationId).subscribe(data => {
      this.toastService.success('Application canceled');
      this.getPermitApplication(this.dwlType);
      this.cancelConfirmPopUp.nativeElement.click();
    })
  }

  withdrawPermit() {

    this.permitService.withDrawPermit(this.applicationId).subscribe(data => {
      this.toastService.success('Application withdraw');
      this.getPermitApplication(this.dwlType)
      this.withdrawConfirmPopUp.nativeElement.click();

    })
  }

  navigateTopaymentPage(id) {
    this.router.navigate(['/dashboard/payment'], { queryParams: { id: id } })
  }
}
