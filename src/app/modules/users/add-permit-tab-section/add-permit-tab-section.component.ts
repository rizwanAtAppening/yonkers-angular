import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/core/services';
import { appToaster, settingConfig } from 'src/app/configs';
import { FormBuilder, FormGroup, Validators, FormArray, EmailValidator } from '@angular/forms';
import { PermitService } from 'src/app/core/services/users/permit.service';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';

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
    private authService: AuthenticationService
  ) {
    this.settings = settingConfig;

  }

  ngOnInit() {
    this.userService.changeSaveAndExit(false);
    this.onInIt();
    this.getCurrentTab()
    if (this.currentTab == 'applicant') {
      this.getCurrentUser()
    }


  }

  getCurrentTab() {
    debugger
    if (this.permitService.getCurrentTab()) {
      this.currentTab = this.permitService.getCurrentTab()
    }
  }

  onInIt() {
    this.whatFormControl();
    this.whereFormContrl();
    this.applicantFormControl();
    this.contractorFormControl();

  }


  public currentTab: string = 'what'
  nextTab(value) {
    debugger
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
      address: ['', Validators.required],
      also_known_as: [''],
      street_name: ['', Validators.required],
      select_rang: [''],

    })
  }

  applicantFormControl() {
    this.applicantForm = this.formBuilder.group({
      role: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', Validators.required],
      nameofBussiness: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required],
    })
  }

  contractorFormControl() {
    this.contractorForm = this.formBuilder.group({
      job: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', Validators.required],
      nameofBussiness: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required],
    })

  }

  get whatControls() { return this.whatForm.controls }
  get whereControls() { return this.whereForm.controls }
  get applicantControls() { return this.applicantForm.controls }
  get contratorControl() { return this.contractorForm.controls }

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
  addPermitApplication(formGroup, nextTab) {

    debugger
    if (formGroup == 'whereForm') {
     // this.getCurrentUser()
    }
    if (formGroup == 'whatForm') {
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
    else if (formGroup == 'whereForm') {
      if (this.isLocation) {
        this.whereForm.controls.address.setErrors(null)
        this.data = {
          model: 2,
          street_one: this.whereForm.value.street_name,
          street_two: 'ccjjc',
          location_type: this.location_type,
        }
      } else {
        this.whereForm.controls.street_name.setErrors(null)
        this.data = {
          model: 2,
          address_id: Number(this.whereForm.value.address),
          location_type: this.location_type,

        }
      }
      if (this.whereForm.invalid) {
        this.isSubmit = true;
        return false
      }


    }

    else if (formGroup == 'applicantForm') {
      if (this.applicantForm.invalid) {
        this.isSubmit = true;
        return false
      }
      this.data = {
        model:3,
        name: this.applicantForm.value.name,
        email: this.applicantForm.value.email,
        nameofBussiness: this.applicantForm.value.nameofBussiness,
        address: this.applicantForm.value.address,
        phone: this.applicantForm.value.phone,
        city: this.applicantForm.value.city,
        state: this.applicantForm.value.state,
        zip: this.applicantForm.value.zip

      }
    }

    else if (formGroup == 'contractorForm') {
      if (this.contractorForm.invalid) {
        this.isSubmit = true;
        return false
      }
    }
    this.permitService.addPermitApplication(this.data).subscribe(data => {
      this.currentTab = nextTab
      this.permitService.saveCurrentTab(this.currentTab);
    })
  }
  public currentUserInfo:any
  getCurrentUser() {
    this.getApplicationFormSessionStorage();
    debugger
    this.authService.getUserInfo().subscribe(currentUser => {
      this.currentUserInfo = currentUser
      if (this.currentUserInfo) {
        this.applicantForm.controls.name.setValue(this.currentUserInfo.name)
        this.applicantForm.controls.email.setValue(this.currentUserInfo.email)
        this.applicantForm.controls.nameofBussiness.setValue(this.currentUserInfo.nameofBussiness)
        this.applicantForm.controls.address.setValue(this.currentUserInfo.address)
        this.applicantForm.controls.phone.setValue(this.currentUserInfo.phone)
        this.applicantForm.controls.city.setValue(this.currentUserInfo.city)
        this.applicantForm.controls.state.setValue(this.currentUserInfo.state)
        this.applicantForm.controls.zip.setValue(this.currentUserInfo.zip)
      }
    })
  }

  getApplicationFormSessionStorage() {
    debugger
  const application =   this.permitService.getApplication()
  this.applicantForm.controls.role.setValue(application.role)
  }

}

// role: ['', Validators.required],
// name: ['', Validators.required],
// email: ['', Validators.required],
// nameofBussiness: ['', Validators.required],
// address: ['', Validators.required],
// phone: ['', Validators.required],
// city: ['', Validators.required],
// state: ['', Validators.required],
// zip: ['', Validators.required],
