import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/core/services';
import { FormBuilder, FormGroup, Validators, FormArray, EmailValidator } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  public changePasswordForm: FormGroup;
  public isOldPasswordIsHide: boolean = false;
  public isNewPasswordIsHide: boolean = false;
  public isNewPasswordConfirmIsHide: boolean = false;
  constructor(
    private userService: UsersService,
    private toasterService: ToastrService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.userService.changeSaveAndExit(true);
    this.changePasswoedCont();
  }

  oldPasswordToggle(field: any) {
    if (field.type == 'password') {
      this.isOldPasswordIsHide = true;
    }
    if (field.type == 'text') {
      this.isOldPasswordIsHide = false;
    }
  }

  newPasswordToggle(field: any) {
    if (field.type == 'password') {
      this.isNewPasswordIsHide = true;
    }
    if (field.type == 'text') {
      this.isNewPasswordIsHide = false;
    }
  }

  newConfirmPasswordToggle(field: any) {
    if (field.type == 'password') {
      this.isNewPasswordConfirmIsHide = true;
    }
    if (field.type == 'text') {
      this.isNewPasswordConfirmIsHide = false;
    }
  }
  changePasswoedCont() {
    this.changePasswordForm = this.formBuilder.group({
      oldPassword: ['', [
        Validators.required,
        Validators.minLength(6),
      ]],
      newPassword: ['', [
        Validators.required,
        Validators.minLength(6),
      ]],
      cnfpassword: ['', [
        Validators.required,
        Validators.minLength(6),
      ]]
    })

  }

  get password() { return this.changePasswordForm.controls }

  public isSubmit = false
  changePassword() {
    if (this.changePasswordForm.invalid) {
      this.isSubmit = true
      return false
    }
    const data = {

    }
    this.changePasswordForm.value.cnfPassword = this.changePasswordForm.value.cnfpassword
    this.userService.changePassword(this.changePasswordForm.value).subscribe(data => {
      this.toasterService.success('password has been changed');
      this.router.navigate(['/dashboard/permit'])
      console.log(data)
    })
  }

  back(){
    this.router.navigate(['/dashboard/permit'])
  }

  passwordMatch(value: string) {
    if (value == 'conpass') {
      return this.changePasswordForm.controls.newpassword.value === this.changePasswordForm.controls.cnfpassword.value
        ? false : this.changePasswordForm.get('cnfpassword').setErrors({ 'incorrect': true });
    } else if (value == 'pass' && this.changePasswordForm.controls.newpassword.value === this.changePasswordForm.controls.cnfpassword.value) {
      this.changePasswordForm.get('cnfpassword').setErrors(null);
    } else if (value == 'pass' && this.changePasswordForm.controls.newpassword.value != this.changePasswordForm.controls.cnfpassword.value) {
      this.changePasswordForm.get('cnfpassword').setErrors({ 'incorrect': true });
    }
  }

}
