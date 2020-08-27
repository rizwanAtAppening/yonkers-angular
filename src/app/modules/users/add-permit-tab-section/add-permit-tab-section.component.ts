import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { UsersService } from 'src/app/core/services';
import { appToaster, settingConfig } from 'src/app/configs';
import { FormBuilder, FormGroup, Validators, FormArray, EmailValidator } from '@angular/forms';
import { PermitService } from 'src/app/core/services/users/permit.service';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { thistle } from 'color-name';

@Component({
  selector: 'app-add-permit-tab-section',
  templateUrl: './add-permit-tab-section.component.html',
  styleUrls: ['./add-permit-tab-section.component.css']
})
export class AddPermitTabSectionComponent implements OnInit {
  public settings: any;
  public env: any;
  public isSubmit = false;
  public data: any
  public isContractor = false;
  public application: any;
  public addInsuranseForm: FormGroup
  public duplimesterForm: FormGroup
  public uploadForm: FormGroup

  public imageBasePath: string = `${environment.host}${environment.imageBasePath}`;
  @ViewChild('checklist', { static: false }) checklist: ElementRef;
  @ViewChild('licensePopUp', { static: false }) licensePopUp: ElementRef;
  @ViewChild('duplimesterPop', { static: false }) duplimesterPop: ElementRef;


  public whatForm: FormGroup;
  public whereForm: FormGroup;
  public applicantForm: FormGroup;
  public contractorForm: FormGroup;
  public projectDetailsForm: FormGroup;
  public location = [{}];
  public application_id: number
  public states: string[] = [
    'Alabama',
    'Alaska',
    'Arizona',
    'Arkansas',
    'California',
    'Colorado',
    'Connecticut',
    'Delaware',
    'shivam'
  ]

  public states1: string[] = [
    'Alabama',
    'Alaska',
    'Arizona',
    'Arkansas',
    'California',
    'Colorado',
    'Connecticut',
    'Delaware',
    'shivam'
  ]
  constructor(
    private userService: UsersService,
    private formBuilder: FormBuilder,
    private permitService: PermitService,
    private authService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    private toasterService: ToastrService,
  ) {
    this.settings = settingConfig;

  }
  public minDate: Date;
  ngOnInit() {
    this.minDate = new Date();

    this.getDuplimester();
    this.route.queryParams.subscribe(data => {
      this.application_id = data.id;
    })
    if (this.application_id) {
      this.updateAppliction()
    }
    this.env = environment;

    this.userService.changeSaveAndExit(false);
    this.onInIt();

    console.log(this.whereForm.controls)
    this.getApplication();
    this.allBussiness();


    this.getCurrentTab();
    this.getLicenseDetails()
    console.log(this.currentTab)
    if (this.currentTab == 'applicant') {
      this.getCurrentUser()
    }
    this.checkTab(this.currentTab)
  }

  public locations = []


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
  public applicationState: number
  public isDrawing = false;
  public isCertificate = false;
  public contractorDetails: any
  getApplication() {
    this.application = this.permitService.getApplication();
    this.addressId = this.addressId ? this.addressId : this.application.address_id
    this.selectedValue = this.selectedValue ? this.selectedValue : this.application.address
    if (this.application.applicant_details) {
      this.applicationState = Number(this.application.applicant_details.applicant_state)
    }
    if (this.application.contractor_details) {
      this.contractorDetails = Number(this.application.contractor_details.contractor_state)
    }
    if (this.application.upload_detail && this.application.upload_detail.length > 0) {
      this.allImage = []
      if (this.application.upload_detail) {
        this.application.upload_detail.map(data => {
          this.allImage.push(data)
          if (data.type == 1) {
            this.isCertificate = true
          }
          if (data.type == 0) {
            this.isDrawing = true

          }
        })
        console.log(this.allImage)
        this.application['drawings'] = `${this.imageBasePath}${this.application.upload_detail[0].name}`
        if (this.application.upload_detail.length > 1) {
          this.application['CertificateofInsurance'] = `${this.imageBasePath}${this.application.upload_detail[1].name}`
        }
      }

      console.log(this.application)
    }
    if (this.currentTab == "projectDetail") {

      if (this.application.role == 2) {
        this.isContractor = true
      } else {
        this.projectDetailsForm.controls.dig_safely_no.setErrors(null),
          this.projectDetailsForm.controls.opening_number.setErrors(null)
        this.projectDetailsForm.controls.opening_size.setErrors(null)
        this.projectDetailsForm.controls.pavement_type.setErrors(null)
      }
    }

    console.log(this.application)
  }
  public permitType: any;
  getCurrentTab() {

    // if (this.permitService.getCurrentTab()) {
    //   this.currentTab = this.permitService.getCurrentTab()
    // }
    this.route.queryParams.subscribe(data => {
      this.currentTab = data.tab
      if (data.permitType) {
        this.permitType = data.permitType
      }
      if (!this.permitType) {
        this.permitType = this.application.permit_type
      }

    })
  }

  onInIt() {
    this.whatFormControl();
    this.whereFormContrl();
    this.applicantFormControl();
    this.contractorFormControl();
    this.proectControls();
    this.addInsuranseFormCon();
    this.duplimesterFormCon();
    //this.uploadFormCon();
  }

  // uploadFormCon() {
  //   this.uploadForm = this.formBuilder.group({
  //     upload: ['']
  //   })
  // }

  duplimesterFormCon() {
    this.duplimesterForm = this.formBuilder.group({
      dumpster_first_name: ['', Validators.required],
      dumpster_last_name: ['', Validators.required],
      dumpster_business: ['', Validators.required],
      dumpster_phone: ['', Validators.required],
      // dumpster_mobile: ['', Validators.required],
      dumpster_address: ['', Validators.required],
      dumpster_state: ['', Validators.required],
      dumpster_city: ['', Validators.required],
      dumpster_zip: ['', Validators.required],
      dumpster_email: ['', Validators.required],
    })
  }
  get duplimesterCon() { return this.duplimesterForm.controls }

  addInsuranseFormCon() {
    this.addInsuranseForm = this.formBuilder.group({
      type: ['', Validators.required],
      license_number: ['', Validators.required],
      expiration_date: ['', Validators.required],

    })
  }
  public isLicense = false
  addLicense() {
    if (this.addInsuranseForm.invalid) {
      this.isLicense = true
      return false
    }
    var formData = new FormData();
    formData.append(
      "name",
      this.licenseFile

    );
    formData.append(
      "type",
      this.addInsuranseForm.value.type

    );
    formData.append(
      "application_id",
      this.application.id

    );
    formData.append(
      "license_number",
      this.addInsuranseForm.value.license_number

    );
    formData.append(
      "expiration_date",
      this.addInsuranseForm.value.expiration_date

    );

    this.permitService.addLicenseDetails(formData).subscribe(data => {
      this.addInsuranseForm.reset();
      this.getLicenseDetails()
      this.licensePopUp.nativeElement.click()
      this.image = null
      this.isLicense = false
    })

  }

  public licenseDetails = []
  getLicenseDetails() {
debugger
    this.permitService.getLicenseDetails().subscribe(data => {
      this.licenseDetails = data.response
      var currentDate
      var date
      date = new Date()
      currentDate = date.toISOString();
      if (this.licenseDetails && this.licenseDetails.length > 0) {
        this.licenseDetails.map(data => {
          if (currentDate > data.expiration_date) {
            data.isExpiry = true
          } else {
            data.isExpiry = false
          }
        })
      }
    })
  }

  // compareDate() {
  //   var currentDate
  //   var date
  //   date = new Date()
  //   currentDate  = date.toISOString();
  //   console.log(currentDate)
  //   if (this.applicationDetails && this.applicationDetails.license_details)
  //     this.applicationDetails.license_details.map(data => {
  //       if (currentDate > data.expiration_date) {
  //         data.isExpiry = true
  //       }else{
  //         data.isExpiry = false
  //       }
  //     })
  //     console.log(this.applicationDetails)
  // }

  get licenseCon() { return this.addInsuranseForm.controls }

  public currentTab: string = 'what'
  nextTab(value) {
    this.currentTab = value
  }
  whatFormControl() {
    this.whatForm = this.formBuilder.group({
      role: ['', Validators.required],
      type: ['', Validators.required]
    })
  }

  whereFormContrl() {
    this.whereForm = this.formBuilder.group({
      address_id: ['', Validators.required],
      also_known_as: [''],
      address: ['', Validators.required],
      // street_one: ['', Validators.required],
      // street_two: [''],
      // address_join: [''],
      addlocation: this.formBuilder.array([
        this.addLocationFormGroup(),
      ]

      )

    })
  }


  get addLocationControls() {
    return this.whereForm.controls.addlocation as FormArray;
  }

  get addCon() {
    return this.whereForm.controls.addlocation;

  }
  addLocationFormGroup(): FormGroup {
    return this.formBuilder.group({
      street_one: ['', Validators.required],
      street_two: ['', Validators.required],
      address_join: ['', Validators.required]
    })
  }

  addLocationForm(): void {

    this.addLocationControls.push(this.addLocationFormGroup())
  }



  applicantFormControl() {
    this.applicantForm = this.formBuilder.group({
      applicant_role: ['', Validators.required],
      applicant_name: ['', Validators.required],
      applican_last_name: ['',],
      applicant_email: ['', Validators.required],
      applicant_business: ['', Validators.required],
      applicant_address: ['', Validators.required],
      applicant_phone: ['', Validators.required],
      applicant_city: ['', Validators.required],
      applicant_state: ['', Validators.required],
      applicant_zip: ['', Validators.required],
    })
  }

  contractorFormControl() {
    this.contractorForm = this.formBuilder.group({
      contractor_for_job: ['', Validators.required],
      contractor_name: ['', Validators.required],
      contractor_email: ['', Validators.required],
      contractor_business: ['', Validators.required],
      contractor_address: ['', Validators.required],
      contractor_phone: ['', Validators.required],
      contractor_city: ['', Validators.required],
      contractor_state: ['', Validators.required],
      contractor_zip: ['', Validators.required],
    })
  }

  proectControls() {
    this.projectDetailsForm = this.formBuilder.group({
      purpose: ['', Validators.required],
      dig_safely_no: [''],
      traffic_control: [''],
      length: [''],
      width: [''],
      depth: [''],
      opening_size: [''],
      opening_number: [''],
      pavement_type: [''],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      description: ['', Validators.required],


    })
  }

  get whatControls() { return this.whatForm.controls }
  get whereControls() { return this.whereForm.controls }
  get applicantControls() { return this.applicantForm.controls }
  get contratorControl() { return this.contractorForm.controls }
  get projectDetail() { return this.projectDetailsForm.controls }


  public isLocation = false;
  public location_type = 1

  selectAddress(value: string) {

    if (value == 'location') {
      this.isLocation = true
      this.location_type = 2
    } else {
      this.isLocation = false
      this.location_type = 1

    }

  }

  public isSaveAndExit = false;
  saveAndExit(value: boolean) {

    if (this.currentTab == 'upload' || this.currentTab == 'review') {
      this.router.navigate(['/dashboard/permit'])
      return false
    }
    this.isSaveAndExit = value;
    this.addPermitApplication('', this.currentTab)
  }


  addPermitApplication(formGroup, nextTab) {

    if (this.currentTab == 'upload' && (this.allImage && this.allImage[0].name == null)) {
      this.toasterService.error('Please upload image')
      return false
    }
    //const application = this.permitService.getApplication()
    this.getApplication()

    if (this.application.role == 2) {
      this.isContractor = true
    } else {
      this.projectDetailsForm.controls.dig_safely_no.setErrors(null),
        this.projectDetailsForm.controls.opening_number.setErrors(null)
      this.projectDetailsForm.controls.opening_size.setErrors(null)
      this.projectDetailsForm.controls.pavement_type.setErrors(null)

    }

    if (nextTab == 'review' && this.application) {
      this.currentTab = nextTab
      this.getApplication()
      this.router.navigate(['/dashboard/add-permit'], { queryParams: { tab: this.currentTab } })
      return false

    }

    if (this.currentTab == 'where') {
      this.getCurrentUser()
    }
    if (formGroup == 'whatForm' || this.currentTab == 'what') {
      if (this.whatForm.invalid) {
        this.isSubmit = true
        return false
      }

      //this.updateAppliction()

      // if(this.application.permit_type){

      //   this.permitType = this.application.permit_type
      // }
      this.permitType = 1
      if (this.application_id) {
        this.data = {
          role: Number(this.whatForm.value.role),
          type: Number(this.whatForm.value.type),
          model: 1,
          id: Number(this.application_id),
          permit_type: Number(this.permitType)
        }
      } else {
        this.data = {
          role: Number(this.whatForm.value.role),
          type: Number(this.whatForm.value.type),
          model: 1,
          permit_type: Number(this.permitType)
        }
      }

    }
    else if (formGroup == 'whereForm' || this.currentTab == 'where') {
      if (this.isLocation && this.isAddressFound) {

        this.whereForm.controls.address_id.setErrors(null)
        this.whereForm.controls.address.setErrors(null)
        this.whereForm.controls.also_known_as.setErrors(null)

        // if (this.locations.length == 0) {
        // this.locations.push({ street_one: this.whereForm.controls.addlocation.value.street_one, address_join: this.whereForm.controls.addlocation.value.address_join ? this.whereForm.controls.addlocation.value.address_join : null, street_two: this.whereForm.controls.addlocation.value.street_two ? this.whereForm.controls.addlocation.value.street_two : null })
        this.locations = this.whereForm.controls.addlocation.value
        //}
        this.data = {
          model: 2,
          locations: this.locations,
          location_type: this.location_type,
        }
      } else if (!this.isLocation && this.isAddressFound) {
        this.addLocationControls.controls.map((value, i) => {
          value['controls'].street_one.setErrors(null)
          value['controls'].street_two.setErrors(null)
          value['controls'].address_join.setErrors(null)

        })

        this.whereForm.controls.address.setErrors(null)

        this.data = {
          model: 2,
          // address_id: (this.whereForm.value.address_id),
          address_id: this.addressId,
          address:this.selectedValue,
          location_type: this.location_type,
          also_know_as: this.whereForm.value.also_known_as,
          locations: this.whereForm.controls.addlocation.value,


        }
      }
      if (!this.isAddressFound) {
        this.addLocationControls.controls.map((value, i) => {
          value['controls'].street_one.setErrors(null)
          value['controls'].address_join.setErrors(null)
          value['controls'].street_two.setErrors(null)
        })
        this.whereForm.controls.address_id.setErrors(null)
        this.data = {
          model: 2,
          address: (this.whereForm.value.address),
          location_type: 3,

        }

      }
      this.whereForm.controls.also_known_as.setErrors(null)
      if (this.whereForm.invalid) {
        this.isSubmit = true;
        return false
      }
    }

    else if (formGroup == 'applicantForm' || this.currentTab == 'applicant') {
      if (this.applicantForm.invalid) {
        this.isSubmit = true;
        return false
      }
      this.applicantForm.value.model = 3
      this.data = this.applicantForm.value
    }

    else if (formGroup == 'contractorForm' || this.currentTab == 'contrator') {

      if ((this.application.role != 1 || this.application.role != 3) && this.application.type != 4 || (this.application.role == 2 && this.application.role == 4)) {
        this.contractorForm.value.model = 4
        this.data = this.contractorForm.value
      }
      else if (this.application.role != 2 && this.application.type == 4) {
        if (!this.dumpster_id) {
          this.dumpster_id = this.application.dumpster_id
        }
        this.contractorForm.controls.contractor_for_job.setErrors(null)
        this.contractorForm.controls.contractor_name.setErrors(null)
        this.contractorForm.controls.contractor_email.setErrors(null)
        this.contractorForm.controls.contractor_business.setErrors(null)
        this.contractorForm.controls.contractor_address.setErrors(null)
        this.contractorForm.controls.contractor_phone.setErrors(null)
        this.contractorForm.controls.contractor_city.setErrors(null)
        this.contractorForm.controls.contractor_state.setErrors(null)
        this.contractorForm.controls.contractor_zip.setErrors(null)
        this.data = {
          dumpster_id: this.dumpster_id,
          model: 4,
          contractor_for_job: 0
        }
      }

      if (this.contractorForm.invalid) {
        this.isSubmit = true;
        return false
      }

    }

    else if (formGroup == 'projectDetailsForm' || this.currentTab == 'projectDetail') {
      // const application = this.permitService.getApplication()
      // if (application.role == 2) {
      //   this.isContractor = true
      // } else {
      //   this.projectDetailsForm.controls.dig_safely_no.setErrors(null),
      //     this.projectDetailsForm.controls.opening_number.setErrors(null)
      //   this.projectDetailsForm.controls.opening_size.setErrors(null)
      //   this.projectDetailsForm.controls.pavement_type.setErrors(null)

      // }
      if (this.projectDetailsForm.invalid) {
        this.isSubmit = true;
        return false
      }
      this.projectDetailsForm.value.model = 5
      if (this.application.role != 2) {
        this.projectDetailsForm.value.pavement_type = null
      }
      this.projectDetailsForm.value.purpose = Number(this.projectDetailsForm.value.purpose);
      this.projectDetailsForm.value.pavement_type = Number(this.projectDetailsForm.value.pavement_type);
      this.projectDetailsForm.value.traffic_control = Number(this.projectDetailsForm.value.traffic_control);
      this.projectDetailsForm.value.start_date = (this.projectDetailsForm.value.start_date);
      this.projectDetailsForm.value.end_date = (this.projectDetailsForm.value.end_date);

      if (this.projectDetailsForm.value.pavement_type == "") {
        this.projectDetailsForm.value.pavement_type = null
      }
      if (this.projectDetailsForm.value.traffic_control == "") {
        this.projectDetailsForm.value.traffic_control = null
      }
      this.data = this.projectDetailsForm.value
    }
    this.permitService.addPermitApplication(this.data).subscribe(data => {
      if (this.currentTab == 'where' || this.currentTab == 'contrator') {
        this.getApplication()
      }
      this.currentTab = nextTab
      this.isSubmit = false
      this.checkTab(this.currentTab)
      this.windowScroll()
      if (this.isSaveAndExit) {
        this.isSaveAndExit = false
        this.router.navigate(['/dashboard/permit'])
        return false

      }
      this.router.navigate(['/dashboard/add-permit'], { queryParams: { tab: this.currentTab } })
      // this.permitService.saveCurrentTab(this.currentTab);
    })
  }

  
  windowScroll() {
    window.scroll(0, 0)
  }
  public currentUserInfo: any
  getCurrentUser() {

    const application = this.permitService.getApplication()
    this.applicantForm.controls.applicant_role.setValue(application.role);
    if (application.applicant_details) {
      this.applicantForm.controls.applicant_name.setValue(application.applicant_details.applicant_name)
      this.applicantForm.controls.applican_last_name.setValue(application.applicant_details.applican_last_name)

      this.applicantForm.controls.applicant_email.setValue(application.applicant_details.applicant_email)
      this.applicantForm.controls.applicant_business.setValue(application.applicant_details.applicant_business)
      this.applicantForm.controls.applicant_address.setValue(application.applicant_details.applicant_address)
      this.applicantForm.controls.applicant_phone.setValue(application.applicant_details.applicant_phone)
      this.applicantForm.controls.applicant_city.setValue(application.applicant_details.applicant_city)
      this.applicantForm.controls.applicant_state.setValue(application.applicant_details.applicant_state)
      this.applicantForm.controls.applicant_zip.setValue(application.applicant_details.applicant_zip)
    } else {
      this.authService.getUserInfo().subscribe(currentUser => {
        this.currentUserInfo = currentUser
        if (this.currentUserInfo) {
          this.applicantForm.controls.applicant_name.setValue(this.currentUserInfo.first_name)
          this.applicantForm.controls.applican_last_name.setValue(this.currentUserInfo.last_name)

          this.applicantForm.controls.applicant_email.setValue(this.currentUserInfo.email)
          this.applicantForm.controls.applicant_business.setValue(this.currentUserInfo.company)
          this.applicantForm.controls.applicant_address.setValue(this.currentUserInfo.address)
          this.applicantForm.controls.applicant_phone.setValue(this.currentUserInfo.phone_number)
          this.applicantForm.controls.applicant_city.setValue(this.currentUserInfo.city)
          this.applicantForm.controls.applicant_state.setValue(this.currentUserInfo.state)
          this.applicantForm.controls.applicant_zip.setValue(this.currentUserInfo.zip)
        }
      })
    }
  }

  whereTab() {

    const application = this.permitService.getApplication()
    if (application.location_type) {
      this.location_type = application.location_type

    }
    if (application.location_type == 3) {
      this.isAddressFound = false
      this.isLocation = false
      this.whereForm.controls.address.setValue(application.address);
      return false
    }
    if (application.location_type == 1) {
      this.whereForm.controls.address_id.setValue(application.address_details.szFullAddress);
      this.whereForm.controls.also_known_as.setValue(application.also_know_as);
      this.addLocationControls.controls.map((value, i) => {
        value['controls'].street_one.setErrors(null)
        value['controls'].street_two.setErrors(null)
        value['controls'].address_join.setErrors(null)
      })
    }
    else if (application.location_type == 2 && application.location.length > 0) {
      if (application.location.length > 1) {
        for (let index = 0; index < application.location.length - 1; index++) {
          if (application.location.length != this.addLocationControls.value.length) {
            this.addLocationControls.push(this.addLocationFormGroup())
          }
          application.location.map((data, i) => {
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
        application.location.map((data, i) => {
          this.addLocationControls.controls.map((value, j) => {
            if (i == j) {
              value['controls'].street_one.setValue(data.street_one)
              value['controls'].street_two.setValue(data.street_two)
              value['controls'].address_join.setValue(data.address_join)
            }
          })
        })
      }
      this.whereForm.controls.address_id.setErrors(null)

    } else if (this.application.address) {
      this.whereForm.controls.address.setValue(this.application.address)

    }
    // this.whereForm.controls.address_id.setValue(application.address_id);
    // this.whereForm.controls.street_one.setValue(application.street_one);
  }

  whatTab() {
    // const application = this.permitService.getApplication()
    this.whatForm.controls.role.setValue(this.application.role);
    this.whatForm.controls.type.setValue(this.application.type);
  }

  // getApplicationFormSessionStorage() {
  //   
  //   const application = this.permitService.getApplication()
  //   this.applicantForm.controls.applicant_role.setValue(application.role)
  // }
  public isDisabled = false;
  contractorTab() {
debugger
//const application = this.permitService.getApplication()
    this.getApplication()
    this.authService.getUserInfo().subscribe(currentUser => {
      this.currentUserInfo = currentUser
    })

    if (this.application.dumpster_id) {
      this.getDuplimester();

    }
    if(this.currentUserInfo && (this.application.role == 1) && !this.application.contractor_details){
      this.contractorForm.controls.contractor_for_job.setValue(1)

    }
    if (this.currentUserInfo && (this.application.role == 2) && !this.application.contractor_details) {

      if (this.application.role == 2) {
        this.isDisabled = true
      } else {
        this.isDisabled = false
      }

      this.getLicenseDetails();
      debugger
      this.contractorForm.controls.contractor_for_job.setValue(1)
      this.contractorForm.controls.contractor_name.setValue(this.currentUserInfo.first_name,this.currentUserInfo.last_name)
      this.contractorForm.controls.contractor_email.setValue(this.currentUserInfo.email)
      this.contractorForm.controls.contractor_business.setValue(this.currentUserInfo.company)
      this.contractorForm.controls.contractor_address.setValue(this.currentUserInfo.address)
      this.contractorForm.controls.contractor_phone.setValue(this.currentUserInfo.phone_number)
      this.contractorForm.controls.contractor_city.setValue(this.currentUserInfo.city)
      this.contractorForm.controls.contractor_state.setValue(this.currentUserInfo.state)
      this.contractorForm.controls.contractor_zip.setValue(this.currentUserInfo.zip)
    } else {
      const application = this.permitService.getApplication()
      if (application.contractor_details) {
        this.isDisabled = false
        this.contractorForm.controls.contractor_for_job.setValue(application.contractor_details.contractor_for_job)
        this.contractorForm.controls.contractor_name.setValue(application.contractor_details.contractor_name)
        this.contractorForm.controls.contractor_email.setValue(application.contractor_details.contractor_email)
        this.contractorForm.controls.contractor_business.setValue(application.contractor_details.contractor_business)
        this.contractorForm.controls.contractor_address.setValue(application.contractor_details.contractor_address)
        this.contractorForm.controls.contractor_phone.setValue(application.contractor_details.contractor_phone)
        this.contractorForm.controls.contractor_city.setValue(application.contractor_details.contractor_city)
        this.contractorForm.controls.contractor_state.setValue(application.contractor_details.contractor_state)
        this.contractorForm.controls.contractor_zip.setValue(application.contractor_details.contractor_zip)
      }
    }


  }

  fillDetails(){
    debugger
    //this.contractorForm.controls.contractor_for_job.setValue(1)
    if(this.contractorForm.value.contractor_for_job == 2){
      this.contractorForm.controls.contractor_name.setValue(this.currentUserInfo.last_name,this.currentUserInfo.last_name)
      this.contractorForm.controls.contractor_email.setValue(this.currentUserInfo.email)
      this.contractorForm.controls.contractor_business.setValue(this.currentUserInfo.company)
      this.contractorForm.controls.contractor_address.setValue(this.currentUserInfo.address)
      this.contractorForm.controls.contractor_phone.setValue(this.currentUserInfo.phone_number)
      this.contractorForm.controls.contractor_city.setValue(this.currentUserInfo.city)
      this.contractorForm.controls.contractor_state.setValue(this.currentUserInfo.state)
      this.contractorForm.controls.contractor_zip.setValue(this.currentUserInfo.zip) 
    }else{
      this.contractorForm.controls.contractor_name.setValue(null)
      this.contractorForm.controls.contractor_email.setValue(null)
      this.contractorForm.controls.contractor_business.setValue(null)
      this.contractorForm.controls.contractor_address.setValue(null)
      this.contractorForm.controls.contractor_phone.setValue(null)
      this.contractorForm.controls.contractor_city.setValue(null)
      this.contractorForm.controls.contractor_state.setValue(null)
      this.contractorForm.controls.contractor_zip.setValue(null) 
    }
     
  }


  projectDetailsTab() {
    const application = this.permitService.getApplication()
    if (application.project_detail) {
      this.projectDetailsForm.controls.purpose.setValue(application.project_detail.purpose),
        this.projectDetailsForm.controls.dig_safely_no.setValue(application.project_detail.dig_safely_no),
        this.projectDetailsForm.controls.traffic_control.setValue(application.project_detail.traffic_control),
        this.projectDetailsForm.controls.length.setValue(application.project_detail.length),
        this.projectDetailsForm.controls.width.setValue(application.project_detail.width),
        this.projectDetailsForm.controls.depth.setValue(application.project_detail.depth),

        this.projectDetailsForm.controls.opening_size.setValue(application.project_detail.opening_size),
        this.projectDetailsForm.controls.opening_number.setValue(application.project_detail.opening_number),
        this.projectDetailsForm.controls.pavement_type.setValue(application.project_detail.pavement_type),
        this.projectDetailsForm.controls.start_date.setValue(new Date(application.project_detail.start_date)),
        this.projectDetailsForm.controls.end_date.setValue(new Date(application.project_detail.end_date)),
        this.projectDetailsForm.controls.description.setValue(application.project_detail.description)

    }
  }

  goToBack(formGroup, tab) {

    if (this.currentTab == 'upload') {
      this.checkTab(tab)
      this.currentTab = tab;
      this.router.navigate(['/dashboard/add-permit'], { queryParams: { tab: this.currentTab } })
      return false
    }
    if (this.currentTab == 'what') {
      this.currentTab = tab
      this.router.navigate(['/dashboard/add-permit-selectType'])
      return false


    }

    if (this.currentTab == 'applicant') {
      //this.getCurrentUser();
      // this.addPermitApplication('', tab);
      this.checkTab(tab)
      this.currentTab = tab
      this.router.navigate(['/dashboard/add-permit'], { queryParams: { tab: this.currentTab } })
    }
    if (this.currentTab == 'where') {
      if (this.isLocation) {
        this.whereForm.controls.address_id.setErrors(null)
      } else {
        this.addLocationControls.controls.map((value, i) => {
          value['controls'].street_one.setErrors(null)
          value['controls'].address_join.setErrors(null)
          value['controls'].street_two.setErrors(null)

        })

      }
      this.checkTab(tab)
      this.currentTab = tab
    }
    if (this.currentTab == 'contrator') {
      this.checkTab(tab)
      this.currentTab = tab
    }

    if (this.currentTab == 'projectDetail') {
      this.checkTab(tab)
      this.currentTab = tab
    }

    this.router.navigate(['/dashboard/add-permit'], { queryParams: { tab: this.currentTab } })
  }


  hitOnTab(formGroup, tab) {

    if (this.currentTab == 'applicant') {
      if (this.applicantForm.invalid) {
        this.isSubmit = true
        return false
      }
      this.addPermitApplication('', tab);
      this.checkTab(tab)
      this.currentTab = tab;
      this.router.navigate(['/dashboard/add-permit'], { queryParams: { tab: this.currentTab } })
      return false

    }

    if (this.currentTab == 'projectDetail') {
      if (this.projectDetailsForm.invalid) {
        this.isSubmit = true
        return false
      }
      this.addPermitApplication('', tab);
      this.checkTab(tab)
      this.currentTab = tab;
      this.router.navigate(['/dashboard/add-permit'], { queryParams: { tab: this.currentTab } })
      return false

    }

    if (this.currentTab == 'contrator') {
      if (this.application.dumpster_id) {
        this.contractorForm.controls.contractor_for_job.setErrors(null)
        this.contractorForm.controls.contractor_name.setErrors(null)
        this.contractorForm.controls.contractor_email.setErrors(null)
        this.contractorForm.controls.contractor_business.setErrors(null)
        this.contractorForm.controls.contractor_address.setErrors(null)
        this.contractorForm.controls.contractor_phone.setErrors(null)
        this.contractorForm.controls.contractor_city.setErrors(null)
        this.contractorForm.controls.contractor_state.setErrors(null)
        this.contractorForm.controls.contractor_zip.setErrors(null)
      }
      if (this.contractorForm.invalid) {
        this.isSubmit = true
        return false
      }

      this.addPermitApplication('', tab);
      this.checkTab(tab)
      this.currentTab = tab;
      this.router.navigate(['/dashboard/add-permit'], { queryParams: { tab: this.currentTab } })
      return false

    }

    if (this.currentTab == 'where') {
      if (this.isLocation) {
        this.whereForm.controls.address_id.setErrors(null)
      } else {
        this.addLocationControls.controls.map((value, i) => {
          value['controls'].street_one.setErrors(null)
          value['controls'].address_join.setErrors(null)
          value['controls'].street_two.setErrors(null)

        })

      }
      if (this.whereForm.invalid) {
        this.isSubmit = true

        return false
      }
      this.addPermitApplication('', tab)
      this.checkTab(tab)

      this.currentTab = tab;
      this.router.navigate(['/dashboard/add-permit'], { queryParams: { tab: this.currentTab } })
      return false

    }

    if (this.currentTab == 'what') {
      if (this.whatForm.invalid) {
        this.isSubmit = true

        return false
      }
      this.addPermitApplication('', tab)
      this.checkTab(tab)
      this.currentTab = tab;
      this.router.navigate(['/dashboard/add-permit'], { queryParams: { tab: this.currentTab } })
      return false
    }

    if (this.currentTab == 'upload') {
      this.checkTab(tab)
      this.currentTab = tab;
      this.router.navigate(['/dashboard/add-permit'], { queryParams: { tab: this.currentTab } })

    }

    if (tab == 'review' || this.currentTab == 'review') {

      this.getApplication()
      this.checkTab(tab)
      this.currentTab = tab;
      this.router.navigate(['/dashboard/add-permit'], { queryParams: { tab: this.currentTab } })


    }
  }


  checkTab(tab) {
    if (tab == 'what') {
      this.whatTab();
    }
    else if (tab == 'where') {
      this.whereTab()
    } else if (tab == 'applicant') {
      this.getCurrentUser();
    } else if (tab == 'contrator') {
      this.contractorTab()
    }
    else if (tab == 'projectDetail') {
      this.projectDetailsTab()

    }
    else if (tab == 'upload') {
      this.getApplication()

    }
  }

  imageEmpty() {
    this.image = ''
  }

  public imageName: any;
  public attachment: any
  public fileType: any
  public licenseFile: any
  public image: any
  public name = []
  public formData
  media(event1, index, fileName) {

    if (fileName == 'license') {
      this.imageType = 1
    }
    if (this.imageType != null) {
      this.imageName = event1.target.files[0].name;
      this.attachment = event1.target.files[0]
      this.name.push({ name: (this.attachment), type: this.imageType })
      this.formData = new FormData()
      // if(this.imageType == 0){
      this.formData.append('type', this.imageType)
      this.formData.append('name', this.attachment)
      // }else{
      //}
      console.log(this.name)
      // this.name.map(data => {
      //   this.formData.append('name[name][]', data.name)
      //   this.formData.append('name[imageType][]', data.type)

      // })
      //  let hh = [{name:'value',type:1},{name:'value1',type:1}]
      this.imageType = null
      var reader = new FileReader();
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.image = event.target.result;
      };
      reader.readAsDataURL(event1.target.files[0]);
      this.allImage.map((data: any, i) => {
        if (i == index) {
          data.imageName = this.imageName;
          data.image = this.image
        }
        console.log(this.allImage)
      })

      if (this.attachment && fileName == 'upload') {
        this.uploadImageAndDocuments();
      }
      else if (this.attachment && fileName == 'license') {
        this.licenseFile = this.attachment
      }
    } else {
      this.toasterService.error('Please select type then upload image');
    }


  }

  uploadImageAndDocuments() {
    const applicationId = this.permitService.getApplicationID()
    // let id = (this.certificateDetail.id)
    // var formData = new FormData();

    this.formData.append(
      "application_id",
      applicationId,

    );
    this.permitService.uploadImage(this.formData).subscribe(data => {
      console.log(data)
      this.getApplication()
    })
  }

  editByReviewPage(tab) {
    this.currentTab = tab
    this.checkTab(this.currentTab);
    this.router.navigate(['/dashboard/add-permit'], { queryParams: { tab: this.currentTab } })

  }

  public submitApplicationValue = []
  public index: number
  submitApplication(value, form) {

    if (this.submitApplicationValue.length == 0) {
      this.submitApplicationValue.push({ value: value, key: form })
    }

    if (this.submitApplicationValue.length > 0) {
      const found = this.submitApplicationValue.find((element, i) => {
        this.index = i
        console.log(this.index)
        return element.key == form;
      })

      if (found) {
        this.submitApplicationValue.splice(this.index, 1)
        console.log(this.submitApplicationValue)
      }
      this.submitApplicationValue.push({ value: value, key: form })
      console.log(this.submitApplicationValue)


    }
  }

  submitApplicationAfterReview() {
    if (this.submitApplicationValue.length == 7) {
      this.checklist.nativeElement.click()
      this.submitApplications()
      this.router.navigate(['/dashboard/submit-application'], { queryParams: { id: this.application.id } });

    }
    else {
      this.toasterService.error('Please review all tab then submit application')
    }
  }

  deleteImage(id, i) {


    const data = {
      id: id
    }
    this.permitService.deleteImage(data).subscribe(data => {
      this.getApplication();
      if (this.application && this.application.upload_detail) {
        this.application.upload_detail.map((data, k) => {
          if (i == k) {
            this.application.upload_detail.splice(i, 1)
            sessionStorage.setItem('application', JSON.stringify(this.application));
          }
        })
        this.allImage.map((data, j) => {
          if (j == i) {
            this.allImage.splice(j, 1)
          }
        })
      }

      console.log(this.application)
    })
  }

  updateAppliction() {
    this.permitService.updateApplication(this.application_id).subscribe(data => {
      this.application = data.response;
      if(this.application){
        sessionStorage.setItem('application', JSON.stringify(this.application));

      }
      // if(this.application){
      //   this.permitType = this.application.permit_type
      // }
      this.checkTab(this.currentTab)
    })
  }

  public isAddressFound = true
  addressNotFound(value: boolean) {
    this.isAddressFound = value
  }

  public duplimester = []
  getDuplimester() {

    this.permitService.getDuplimester().subscribe(data => {
      this.duplimester = data.response;
      this.duplimester.map(data => {
        data.checked = false
      })
      if (this.application.dumpster_id) {
        this.duplimester.map((data, i) => {
          if (data.id == this.application.dumpster_id) {
            data.checked = true
          }
        })
      }

    })
  }

  public dumpster_id: any
  selectDuplimester(value, index, duplimesterId) {

    this.duplimester.map((data, i) => {
      if (index == i) {
        data.checked = value.target.checked
      } else {
        data.checked = false
      }
    })
    this.dumpster_id = duplimesterId
  }

  public isDuplimester = false;
  addDuplimester() {

    if (this.duplimesterForm.invalid) {
      this.isDuplimester = true;
      return false
    }
    const data = {

    }
    this.duplimesterForm.value.dumpster_mobile = 7858254585
    this.permitService.addDuplimester(this.duplimesterForm.value).subscribe(data => {
      this.duplimesterForm.reset();
      this.isDuplimester = false;
      this.duplimesterPop.nativeElement.click();
      this.getDuplimester();
    })

  }

  submitApplications() {

    this.permitService.submitAppliction({ application_id: this.application.id }).subscribe(data => {
      this.router.navigate(['/dashboard/submit-application'], { queryParams: { id: this.application.id } })
    })
  }

  public allImage = [{ name: null }]
  addMoreImage() {
    this.allImage.push({ name: null })
  }

  deleteImage1(index) {
    this.allImage.map((data, i) => {
      if (i == index) {
        this.allImage.splice(i, 1)
      }
    })
  }

  public imageType: any = null
  selectImageType(value) {
    this.formData = new FormData()

    this.imageType = Number(value)

  }

  public searchDetails: any = []
  public searchDetail: any = []
  searchBussiness(value) {

    var value = value
    // const data = {
    //   search_query: this.contractorForm.value.contractor_business
    // }
    this.permitService.searchBussiness({ search_query: this.contractorForm.value.contractor_business }).subscribe(data => {
      this.searchDetail = data.response;
      if (this.searchDetail.length > 1) {
        //  var searchValue =  this.searchDetail[0]
        // this.contractorForm.controls.contractor_business.setValue(searchValue.company);
        this.searchDetail.map(data => {
          if (value == data.company) {
            //  this.contractorForm.controls.contractor_for_job.setValue(data.job_title)
            this.contractorForm.controls.contractor_name.setValue(data.first_name)
            this.contractorForm.controls.contractor_email.setValue(data.email)
            this.contractorForm.controls.contractor_address.setValue(data.address)
            this.contractorForm.controls.contractor_phone.setValue(data.phone_number)
            this.contractorForm.controls.contractor_city.setValue(data.city)
            this.contractorForm.controls.contractor_state.setValue(data.state)
            this.contractorForm.controls.contractor_zip.setValue(data.zip)


          }
        })

      } else {
        this.searchDetail.map(data => {
          if (value == data.company) {
            this.contractorForm.controls.contractor_name.setValue(data.first_name)
            this.contractorForm.controls.contractor_email.setValue(data.email)
            this.contractorForm.controls.contractor_address.setValue(data.address)
            this.contractorForm.controls.contractor_phone.setValue(data.phone_number)
            this.contractorForm.controls.contractor_city.setValue(data.city)
            this.contractorForm.controls.contractor_state.setValue(data.state)
            this.contractorForm.controls.contractor_zip.setValue(data.zip)
          }
        })
      }
    })
  }



  // public searchDetails: any
  data3 = ['shivam', 'chauhan', 'alok', 'singh', 'kumar']
  allBussiness() {

    // const data = {
    //   search_query: this.contractorForm.value.contractor_business
    // }
    this.permitService.allBussiness().subscribe(data => {
      this.searchDetails = data.response;
      this.searchDetails = this.searchDetails.map(data => {
        return data.company
      })
      console.log(this.searchDetails)
    })
  }

  public isSingleAddress = false;
  public currentId: number
  showMoreLocation(value, id) {

    this.currentId = id
    this.isSingleAddress = value
    // this.applictionDetails.map(data => {
    //   if (data.id == id) {
    //     data.isSingleAddress = value

    //   } else {
    //     data.isSingleAddress = !value
    //   }
    // })

  }

  public searchString: string
  searchAddress(sendValue: string, index) {
    //this.address = []
    var value: string

    if (sendValue == 'exact') {
      value = this.whereForm.value.address_id
      this.searchString = value;

      if (this.searchString.length > 1) {
        this.exextAddress(this.searchString)
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
        this.exextAddress(this.searchString)
      }
    }
    if (sendValue == 'locationtwo') {
      // value = this.addLocationControls.value.street_one
      // this.searchString = value;
      this.addLocationControls.value.map((data, i) => {
        if (index == i) {
          this.searchString = (data.street_two).toString()
        }
      })
      if (this.searchString.length > 1) {
        this.exextAddress(this.searchString)
      }
    }

  }

  public exactAddress = [];
  public address = new Subject<any>();
  public addressOne = [];
  public addressTwo = []
  public selectadd = []
  //private subject = new Subject<any>();
  exextAddress(value) {
    const data = {
      query: value,
    }
    this.permitService.exextAddress(data).subscribe(data => {
      this.exactAddress = data.response;
      if (this.exactAddress.length > 0) {
        this.selectadd = this.exactAddress.map(data => {
          return data.szFullAddress
        })
        this.address.next(this.selectadd)
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

  public addressId: number;
  public addressOneId: number;
  public addressTwoId: number;
  public selectedValue: any;
  typeaheadOnSelect(e: TypeaheadMatch, value: string, address: string): void {
    this.selectedValue = e.value
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