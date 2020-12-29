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
  @ViewChild('adminCity', { static: false }) adminCity: ElementRef;

  @ViewChild('adminCity2', { static: false }) adminCity2: ElementRef;

  public applicationId: number;
  public intialFeeType = 3
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
  public currentTab: string = '1'
  ngOnInit() {

    if (localStorage.getItem('dwlType') || localStorage.getItem('currentTab')) {
      this.dwlType = (localStorage.getItem('dwlType'));
      this.currentTab = (localStorage.getItem('currentTab'))
      localStorage.removeItem('dwlType');
      localStorage.removeItem('currentTab');

    }


    this.userService.changeSaveAndExit(true);
    this.permitService.deleteSessionApplication();
    this.getPermitApplication(this.dwlType, this.currentTab ? this.currentTab : 1);
    this.onInIt();
    this.currentUser()
    this.cityAdminList()
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
  public meterPermit = []
  public hydrantPermit = []
  public engineeringPermit = []
  public sizePemit = []
  public permit_type: any
  getPermitApplication(dwlType: any, permit_type: any) {

    this.dwlType = dwlType
    this.permit_type = permit_type
    this.currentUser()
    if (this.dwlType == '1') {
      this.application_type = 1
    } else if (this.dwlType == '2') {
      this.application_type = 2

    }
    // const data = {
    //   page: this.currentPage
    // }
    this.permitService.getPermitApplication({ page: this.currentPage, application_type: this.application_type, permit_type: this.permit_type }).subscribe(data => {
      this.applictionDetails = data.response;
      // this.dwlApplication = this.applictionDetails.filter(data => {
      //   if (data.status == null && data.application_type == 2) {
      //     return data
      //   }
      // })

      this.engineeringPermit = this.applictionDetails.filter(data => {
        if (data.permit_type == 1) {
          return data;
        }

      })
      this.meterPermit = this.applictionDetails.filter(data => {
        if (data.permit_type == 2) {
          return data;
        }

      })

      this.hydrantPermit = this.applictionDetails.filter(data => {
        if (data.permit_type == 3) {
          return data;
        }

      })
      this.sizePemit = this.applictionDetails.filter(data => {
        if (data.permit_type == 4) {
          return data;
        }

      })
      console.log(this.meterPermit, '++++++++++++++++++++++858+==================');
      this.applictionDetails.map(data => {
        data.isSingleAddress = true
      })
      console.log(this.dwlApplication)
      this.offset = data.offset;
      this.totalPagination = data.total
      this.currentPage = data.currentPage;
      this.checkPayments()
    })
  }


  checkPayments() {


    this.applictionDetails.forEach(value => {
      value.addByAdminPayment = [];
      value.expirtDate = []
      if (value.application_fees.length > 0) {
        value.application_fees.every(paymentValue => {
          if ((paymentValue.fee_Type == 1 || paymentValue.fee_Type == 2 || paymentValue.fee_Type == 4) && paymentValue.payment_status != 3) {
            value.addByAdminPayment.push(paymentValue)
            return false
          } else {
            return true
          }
        })
      }
      value.application_issue_permits.every(exp => {
        if (exp.status == 0) {
          value.expirtDate.push(exp)
          return false
        } else {
          return true
        }
      })
    })
    console.log(this.applictionDetails, "_++++++++++_+_____________+_++_+_+_+_+_+_+-=-")
  }

  paginate(page, dwlType, permit_type) {
    this.dwlType = dwlType

    this.currentPage = page
    this.getPermitApplication(this.dwlType, permit_type)
  }
  public searchString: string
  public searchData = {}


  searchApplication() {

    if (this.dwlType == '1') {
      this.application_type = 1
    } else if (this.dwlType == '2') {
      this.application_type = 2

    }
    if (this.searchString.length > 0) {
      this.searchData = {
        search_query: String(this.searchString),
        application_type: this.application_type,
        permit_type: 1
      }
    } else {
      this.searchData = {
        application_type: this.application_type,
        permit_type: 1
      }
    }

    this.permitService.searchApplication(this.searchData).subscribe(data => {
      this.applictionDetails = data.response;
      // console.log(this.dwlApplication)
      this.offset = data.offset;
      this.totalPagination = data.total
      this.currentPage = data.currentPage;
    })
  }

  updateApplication(application) {
    if (application.status != 3) {
      this.router.navigate(['/dashboard/update-application'], { queryParams: { id: application.id } });
    } else if (application.status == 3) {
      this.toastService.error('You can not modify your application, because application have cancled.')
    }
  }
  public navigaetValue: any
  navigate(value) {
    this.navigaetValue = value
  }
  navigatetoDwl() {
    if (this.cityId) {
      this.adminCity2.nativeElement.click()
      if (this.navigaetValue == 1) {
        this.router.navigate(['/dashboard/add-user-permit'], { queryParams: { type: this.navigaetValue, cityId: this.cityId } })
        localStorage.setItem('dwlType', '1');

      }
      else {
        this.router.navigate(['/dashboard/daily-work-location'], { queryParams: { type: this.navigaetValue, cityId: this.cityId } })
        localStorage.setItem('dwlType', '2');


      }
    } else {
      this.toastService.error('Please select city')
    }

  }
  getApplicationId(id) {
    this.applicationId = id
  }

  convertPermitApplication() {

    this.permitService.convertPermitApplication(this.applicationId).subscribe(data => {
      this.confirmPopUp.nativeElement.click();
      this.toastService.success('Application have beed converted');

      this.getPermitApplication(this.dwlType, this.permit_type);
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
      this.getPermitApplication(this.dwlType, this.permit_type);
      this.cancelConfirmPopUp.nativeElement.click();
    })
  }

  withdrawPermit() {

    this.permitService.withDrawPermit(this.applicationId).subscribe(data => {
      this.toastService.success('Application withdraw');
      this.getPermitApplication(this.dwlType, this.permit_type)
      this.withdrawConfirmPopUp.nativeElement.click();

    })
  }

  navigateTopaymentPage(id, permit_type, fee_Type) {
    localStorage.setItem('currentTab', permit_type);

    this.router.navigate(['/dashboard/payment'], { queryParams: { id: id, fee_type: fee_Type } })
  }

  updateMeterPermitAndHydrant(application: any, value: string, pemit: string, permit_type: any) {
    localStorage.setItem('currentTab', permit_type);
    if(application.status != 3){
      if (pemit == 'meter') {
        this.router.navigate(['/dashboard/add-meter-permit'], { queryParams: { application_id: application.id, tab: value } })
  
      }
      else if (pemit == 'hydrant') {
        this.router.navigate(['/dashboard/add-hydrant-permit'], { queryParams: { application_id: application.id, tab: value } })
  
      }
  
      else if (pemit == 'oversize') {
        this.router.navigate(['/dashboard/add-oversize-permit'], { queryParams: { application_id: application.id, tab: value } })
  
      }
    }else{
      this.toastService.error('You can not modify your application, because application have cancled.')

    }
    
  }
  public cityId: number
  selectCity(cityId) {
    this.cityId = cityId

  }
  selectType() {
    if (this.cityId) {
      this.adminCity.nativeElement.click()
      this.router.navigate(['/dashboard/add-permit-selectType'], { queryParams: { cityId: this.cityId } })
    } else {
      this.toastService.error('Please select city');

    }

  }

  public cityAdmin = []
  cityAdminList() {

    this.permitService.cityAdminList().subscribe(data => {
      this.cityAdmin = data.response;
    })
  }
}
