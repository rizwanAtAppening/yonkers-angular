import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/core/services';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { FormBuilder, FormGroup, Validators, FormArray, EmailValidator } from '@angular/forms';
import { appToaster, settingConfig } from 'src/app/configs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
    private router: Router,
    private toastService: ToastrService

  ) {
    this.settings = settingConfig;
  }

  ngOnInit(): void {
    this.userService.changeSaveAndExit(true);
    this.profileControl();
    this.getCurrenrUser();

  }


  back() {
    this.router.navigate(['/dashboard/permit'])
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

    this.authService.getUserInfo().subscribe(currentUser => {
      this.currentUserInfo = currentUser;
      if (this.currentUserInfo) {
        this.profileForm.controls.first_name.setValue(this.currentUserInfo.first_name);
        this.profileForm.controls.address.setValue(this.currentUserInfo.address);
        this.profileForm.controls.email.setValue(this.currentUserInfo.email);
        this.profileForm.controls.last_name.setValue(this.currentUserInfo.last_name);
        this.profileForm.controls.mobile_number.setValue(this.currentUserInfo.mobile_number ? this.currentUserInfo.mobile_number : null);
        this.profileForm.controls.phone_number.setValue(this.currentUserInfo.phone_number ? this.currentUserInfo.phone_number :null);
        this.profileForm.controls.company.setValue(this.currentUserInfo.company);
        this.profileForm.controls.job_title.setValue(this.currentUserInfo.job_title);
        this.profileForm.controls.state.setValue(this.currentUserInfo.state);
        this.profileForm.controls.zip.setValue(this.currentUserInfo.zip);
        this.profileForm.controls.city.setValue(this.currentUserInfo.city);


      }
    })
  }

  get profile() { return this.profileForm.controls }
  get profilevalue() { return this.profileForm.value }

  public isSubmit = false;
  updateProfile() {

    if (this.profileForm.invalid) {
      this.isSubmit = true
      return false
    }

    this.userService.updateUserProfile(this.profileForm.value).subscribe(data => {
      console.log(data)
      localStorage.setItem('currentUser', JSON.stringify(data.response));
      this.getCurrenrUser()
      this.toastService.success('profile has been updated')
    })
  }
  public currentUserInfo: any


  phoneNumberFormate(value: string) {
    
    var autoFillValue = '-'
    if (value == 'phone') {
      if (this.profileForm.value.phone_number === null) {
        this.profileForm.controls.phone_number.setValue(this.profileForm.value.phone_number)
      }
      if (this.profileForm.value.phone_number.length === 3) {
        
        this.profileForm.controls.phone_number.setValue(this.profileForm.value.phone_number.concat(autoFillValue))
      }
      if (this.profileForm.value.phone_number.length === 7) {
        this.profileForm.controls.phone_number.setValue(this.profileForm.value.phone_number.concat(autoFillValue))
      }
    
    }
    else if (value == 'mobile') {
      if (this.profileForm.value.mobile_number === null) {
      this.profileForm.controls.mobile_number.setValue(this.profileForm.value.mobile_number)
       }
      if (this.profileForm.value.mobile_number.length === 3) {
        this.profileForm.controls.mobile_number.setValue(this.profileForm.value.mobile_number.concat(autoFillValue))
      }
      if (this.profileForm.value.mobile_number.length === 7) {
        this.profileForm.controls.mobile_number.setValue(this.profileForm.value.mobile_number.concat(autoFillValue))
      }
     
    }
  }


}
