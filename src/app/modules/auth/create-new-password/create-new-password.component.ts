import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UsersService } from 'src/app/core/services';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-new-password',
  templateUrl: './create-new-password.component.html',
  styleUrls: ['./create-new-password.component.css']
})
export class CreateNewPasswordComponent implements OnInit {
  public newPasswordForm: FormGroup;
  public token: string
  constructor(
    private fb: FormBuilder,
    private userService: UsersService,
    private toastService: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(data => {
      this.token = data.token
    })
    this.psswordFormControls()
  }

  psswordFormControls() {
    this.newPasswordForm = this.fb.group({
      password: ['', Validators.required],
      cnfPassword: ['', Validators.required],
    })
  }

  public isSubmited = false;
  get newPassword() { return this.newPasswordForm.controls }
  createNewPass() {
    
    if (this.newPasswordForm.invalid) {
      this.isSubmited = true;
      return false
    }
    this.newPasswordForm.value.token = (this.token).toString();
    this.userService.createNewPassword(this.newPasswordForm.value).subscribe(data => {
      this.toastService.success('Password has been changed');
      this.newPasswordForm.reset();
      this.isSubmited = false
      this.router.navigate(['/'])
    })
  }

  passwordMatch(value: string) {
    if (value == 'conpass') {
      return this.newPasswordForm.controls.password.value === this.newPasswordForm.controls.cnfPassword.value
        ? false : this.newPasswordForm.get('cnfPassword').setErrors({ 'incorrect': true });
    } else if (value == 'pass' && this.newPasswordForm.controls.password.value === this.newPasswordForm.controls.cnfPassword.value) {
      this.newPasswordForm.get('cnfPassword').setErrors(null);
    } else if (value == 'pass' && this.newPasswordForm.controls.password.value != this.newPasswordForm.controls.cnfPassword.value) {
      this.newPasswordForm.get('cnfPassword').setErrors({ 'incorrect': true });
    }
  }

}
