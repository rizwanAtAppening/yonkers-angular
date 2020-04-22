import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/core/services';
import { appToaster, settingConfig } from 'src/app/configs';
import { FormBuilder, FormGroup, Validators, FormArray, EmailValidator } from '@angular/forms';
import { PermitService } from 'src/app/core/services/users/permit.service';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

@Component({
  selector: 'app-add-permit-tab-section',
  templateUrl: './add-permit-tab-section.component.html',
  styleUrls: ['./add-permit-tab-section.component.css']
})
export class AddPermitTabSectionComponent implements OnInit {
  public settings: any;
  public whatForm: FormGroup;
  public whereForm: FormGroup;
  public applicantForm: FormGroup;
  public contractorForm: FormGroup;
  public projectDetailsForm: FormGroup;
  public location = [{}]
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
  ) {
    this.settings = settingConfig;

  }

  ngOnInit() {
    // this.route.queryParams.subscribe(data=>{
    //   this.currentTab = data.tab;
    // })
    this.userService.changeSaveAndExit(false);
    this.onInIt();
    this.getCurrentTab()
    this.getApplication()
    console.log(this.currentTab)
    if (this.currentTab == 'applicant') {
      this.getCurrentUser()
    }
    this.checkTab(this.currentTab)
  }

public locations  = []
  addLocation() {
    if(this.isLocation){
      this.whereForm.controls.address_id.setErrors(null)
    }
    if(this.whereForm.invalid){
      this.isSubmit = true
      return false
    }
    if(this.location)
    this.locations.push({street_one:this.whereForm.value.street_one,address_join:this.whereForm.value.address_join,street_two:this.whereForm.value.street_two})
    this.location.push({})
    console.log(this.locations)
  }

  remove(index) {
    debugger
    this.location.map((data, i) => {
      if (index == i) {
        this.location.splice(i, 1)
      }
    })
  }
  getApplication() {
    this.application = this.permitService.getApplication();
    console.log(this.application)
  }
  getCurrentTab() {

    // if (this.permitService.getCurrentTab()) {
    //   this.currentTab = this.permitService.getCurrentTab()
    // }
    this.route.queryParams.subscribe(data => {
      this.currentTab = data.tab
    })
  }

  onInIt() {
    this.whatFormControl();
    this.whereFormContrl();
    this.applicantFormControl();
    this.contractorFormControl();
    this.proectControls();

  }


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
      street_one: ['', Validators.required],
      street_two: [''],
      address_join: [''],

    })
  }

  applicantFormControl() {
    this.applicantForm = this.formBuilder.group({
      applicant_role: ['', Validators.required],
      applicant_name: ['', Validators.required],
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


  public isSubmit = false;
  public data: any
  public isContractor = false;
  public application: any;
  addPermitApplication(formGroup, nextTab) {
    const application = this.permitService.getApplication()
    if (application.role == 2) {
      this.isContractor = true
    } else {
      this.projectDetailsForm.controls.dig_safely_no.setErrors(null),
        this.projectDetailsForm.controls.opening_number.setErrors(null)
      this.projectDetailsForm.controls.opening_size.setErrors(null)
      this.projectDetailsForm.controls.pavement_type.setErrors(null)

    }

    if (nextTab == 'review' && application) {
      this.application = this.permitService.getApplication();
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
      this.data = {
        role: Number(this.whatForm.value.role),
        type: Number(this.whatForm.value.type),
        model: 1
      }
    }
    else if (formGroup == 'whereForm' || this.currentTab == 'where') {
      if (this.isLocation ) {
        
        this.whereForm.controls.address_id.setErrors(null)
        if(this.locations.length == 0){
          this.locations.push({street_one:this.whereForm.value.street_one,address_join:this.whereForm.value.address_join,street_two:this.whereForm.value.street_two})
        }
        this.data = {
          model: 2,
         locations:this.locations,
          location_type: this.location_type,
        }
      } else {
        this.whereForm.controls.street_one.setErrors(null)
        this.data = {
          model: 2,
          address_id: Number(this.whereForm.value.address_id),
          location_type: this.location_type,

        }
      }
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
      if (this.contractorForm.invalid) {
        this.isSubmit = true;
        return false
      }
      this.contractorForm.value.model = 4
      this.data = this.contractorForm.value
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
      this.data = this.projectDetailsForm.value
    }
    this.permitService.addPermitApplication(this.data).subscribe(data => {
      this.currentTab = nextTab
      this.isSubmit = false
      this.checkTab(this.currentTab)

      this.router.navigate(['/dashboard/add-permit'], { queryParams: { tab: this.currentTab } })
      // this.permitService.saveCurrentTab(this.currentTab);
    })
  }
  public currentUserInfo: any
  getCurrentUser() {

    const application = this.permitService.getApplication()
    this.applicantForm.controls.applicant_role.setValue(application.role);
    if (application.applicant_details) {
      this.applicantForm.controls.applicant_name.setValue(application.applicant_details.applicant_name)
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
          this.applicantForm.controls.applicant_name.setValue(this.currentUserInfo.name)
          this.applicantForm.controls.applicant_email.setValue(this.currentUserInfo.email)
          this.applicantForm.controls.applicant_business.setValue(this.currentUserInfo.nameofBussiness)
          this.applicantForm.controls.applicant_address.setValue(this.currentUserInfo.address)
          this.applicantForm.controls.applicant_phone.setValue(this.currentUserInfo.phone)
          this.applicantForm.controls.applicant_city.setValue(this.currentUserInfo.city)
          this.applicantForm.controls.applicant_state.setValue(this.currentUserInfo.state)
          this.applicantForm.controls.applicant_zip.setValue(this.currentUserInfo.zip)
        }
      })
    }
  }

  whereTab() {

    const application = this.permitService.getApplication()
    if (application.address_id) {
      this.whereForm.controls.street_one.setErrors(null)
    }
    else if (application.street_one) {
      this.whereForm.controls.address_id.setErrors(null)

    }
    this.whereForm.controls.address_id.setValue(application.address_id);
    this.whereForm.controls.street_one.setValue(application.street_one);
  }

  whatTab() {
    const application = this.permitService.getApplication()
    this.whatForm.controls.role.setValue(application.role);
    this.whatForm.controls.type.setValue(application.type);
  }

  // getApplicationFormSessionStorage() {
  //   
  //   const application = this.permitService.getApplication()
  //   this.applicantForm.controls.applicant_role.setValue(application.role)
  // }

  contractorTab() {
    const application = this.permitService.getApplication()
    if (application.contractor_details) {
      this.contractorForm.controls.contractor_for_job.setValue(application.contractor_details.contractor_for_job)

      this.contractorForm.controls.contractor_name.setValue(application.contractor_details.contractor_name)
      this.contractorForm.controls.contractor_email.setValue(application.contractor_details.contractor_email)
      this.contractorForm.controls.contractor_business.setValue(application.contractor_details.contractor_business)
      this.contractorForm.controls.contractor_address.setValue(application.contractor_details.contractor_address)
      this.contractorForm.controls.contractor_phone.setValue(application.contractor_details.contractor_phone)
      this.contractorForm.controls.contractor_city.setValue(application.contractor_details.contractor_state)
      this.contractorForm.controls.contractor_state.setValue(application.contractor_details.contractor_city)
      this.contractorForm.controls.contractor_zip.setValue(application.contractor_details.contractor_zipy)
    }

  }


  // purpose: ['', Validators.required],
  // dig_safely_no: ['', Validators.required],
  // traffic_control: ['', Validators.required],
  // length: ['', Validators.required],
  // width: ['', Validators.required],
  // depth: ['', Validators.required],
  // opening_size: ['', Validators.required],
  // opening_number: ['', Validators.required],
  // pavement_type: ['', Validators.required],
  // start_date: ['', Validators.required],
  // end_date: ['', Validators.required],
  // description: ['', Validators.required],
  projectDetailsTab() {
    const application = this.permitService.getApplication()
    if (application.project_detail) {
      this.projectDetailsForm.controls.purpose.setValue(application.project_detail.purpose),
        this.projectDetailsForm.controls.dig_safely_no.setValue(application.project_detail.dig_safely_no),
        this.projectDetailsForm.controls.traffic_control.setValue(application.project_detail.traffic_control),
        this.projectDetailsForm.controls.length.setValue(application.project_detail.length),
        this.projectDetailsForm.controls.width.setValue(application.project_detail.width),
        this.projectDetailsForm.controls.opening_size.setValue(application.project_detail.opening_size),
        this.projectDetailsForm.controls.opening_number.setValue(application.project_detail.opening_number),
        this.projectDetailsForm.controls.pavement_type.setValue(application.project_detail.pavement_type),
        this.projectDetailsForm.controls.start_date.setValue(application.project_detail.start_date),
        this.projectDetailsForm.controls.end_date.setValue(application.project_detail.end_date),
        this.projectDetailsForm.controls.description.setValue(application.project_detail.description)

    }
  }

  goToBack(formGroup, tab) {

    console.log(this[formGroup])
    // if (this[formGroup].invalid) {
    //   this.isSubmit = true
    //   return false
    // }
    this.currentTab = tab
    if (this.currentTab == 'what') {
      this.whatTab()
    }

    if (this.currentTab == 'applicant') {
      this.getCurrentUser();
      this.router.navigate(['/dashboard/add-permit'], { queryParams: { tab: this.currentTab } })
    }
    if (this.currentTab == 'where') {
      this.whereTab()
    }
    if (this.currentTab == 'contrator') {
      this.contractorTab()
    }

    if (this.currentTab == 'projectDetail') {
      this.projectDetailsTab()
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
      // if (this.contractorForm.invalid) {
      //   this.isSubmit = true
      //   return false
      // }
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
        this.whereForm.controls.street_one.setErrors(null)

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

      this.application = this.permitService.getApplication();
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
  }


  public imageName: any;
  public attachment: any
  public fileType: any
  media(event1, fileType) {

    this.fileType = fileType
    this.imageName = event1.target.files[0].name;
    this.attachment = event1.target.files[0]

    // var reader = new FileReader();
    // var reader = new FileReader();
    // reader.onload = (event: any) => {
    //   this.image = event.target.result;
    // };
    // reader.readAsDataURL(event1.target.files[0]);
    // console.log(this.image)
    // console.log(event1.target.files[0])
    if (this.attachment) {
      this.uploadImageAndDocuments();
    }
  }

  //(change)="media($event)"
  public image: any
  uploadImageAndDocuments() {
    const applicationId = this.permitService.getApplicationID()
    // let id = (this.certificateDetail.id)
    var formData = new FormData();
    formData.append(
      "name",
      this.attachment

    );
    formData.append(
      "type",
      this.fileType

    );
    formData.append(
      "application_id",
      applicationId,

    );
    this.permitService.uploadImage(formData).subscribe(data => {
      console.log(data)
      this.getApplication()
    })
  }


}


