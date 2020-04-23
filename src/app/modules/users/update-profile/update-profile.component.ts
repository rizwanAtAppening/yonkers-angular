import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/core/services';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { FormBuilder, FormGroup, Validators, FormArray, EmailValidator } from '@angular/forms';
import { appToaster, settingConfig } from 'src/app/configs';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {
  public settings: any;

  profileForm: FormGroup;
  constructor(
    private userService: UsersService,
    private authService: AuthenticationService,
    private formBuilder: FormBuilder,

  ) {    this.settings = settingConfig;
  }

  ngOnInit(): void {
    this.userService.changeSaveAndExit(true);
    this.profileControl();
    this.getCurrenrUser();

  }


  profileControl() {
    this.profileForm = this.formBuilder.group({
      address: [''],
      email: [''],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      mobile_number: ['', Validators.required],
      phone_number: [''],
      company: [''],
      job_title: [''],
      state: [''],
      zip: [''],
      city: [''],
    })
  }

  getCurrenrUser() {
    debugger
    this.authService.getUserInfo().subscribe(currentUser => {
      this.currentUserInfo = currentUser;
      if (this.currentUserInfo) {
        this.profileForm.controls.first_name.setValue(this.currentUserInfo.first_name);
        this.profileForm.controls.address.setValue(this.currentUserInfo.address);
        this.profileForm.controls.email.setValue(this.currentUserInfo.email);
        this.profileForm.controls.last_name.setValue(this.currentUserInfo.last_name);
        this.profileForm.controls.mobile_number.setValue(this.currentUserInfo.mobile_number);
        this.profileForm.controls.phone_number.setValue(this.currentUserInfo.phone_number);
        this.profileForm.controls.company.setValue(this.currentUserInfo.company);
        this.profileForm.controls.job_title.setValue(this.currentUserInfo.job_title);
        this.profileForm.controls.state.setValue(this.currentUserInfo.state);
        this.profileForm.controls.zip.setValue(this.currentUserInfo.zip);
        this.profileForm.controls.city.setValue(this.currentUserInfo.city);


      }
    })
  }

  get profile() { return this.profileForm.controls }

  public isSubmit = false;
  updateProfile() {
    debugger
    if (this.profileForm.invalid) {
      this.isSubmit = true
      return false
    }

    this.userService.updateUserProfile(this.profileForm.value).subscribe(data => {
      console.log(data)
      localStorage.setItem('currentUser', JSON.stringify(data.response));
      this.getCurrenrUser()
    })
  }
  public currentUserInfo: any


}
