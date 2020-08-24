import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';

@Component({
  selector: 'app-create-password',
  templateUrl: './create-password.component.html',
  styleUrls: ['./create-password.component.css']
})
export class CreatePasswordComponent implements OnInit {
  public newPasswordForm: FormGroup;
  public token: string;
  public id: string

  constructor(
    private fb: FormBuilder,
    private toastService: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private adminAuthService:AuthenticationService
  ) { }

  ngOnInit(): void {
    
    this.psswordFormControls();
    this.route.queryParams.subscribe(data => {
      this.token = data.id;
     // this.id = data.id
      if(this.id){
       // this.crateMemberPassword()
      }
    })
  }

  psswordFormControls() {
    this.newPasswordForm = this.fb.group({
      password: ['', Validators.required],
      cnfPassword: ['', Validators.required],
    })
  }
  public isSubmited = false;
  get newPassword() { return this.newPasswordForm.controls }
 

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

  createNewPass() {

    if (this.newPasswordForm.invalid) {
      this.isSubmited = true;
      return false
    }
    this.newPasswordForm.value.token = (this.token).toString();
    this.adminAuthService.createNewPassword(this.newPasswordForm.value).subscribe(data => {
      this.toastService.success('Password has been created');
      this.newPasswordForm.reset();
      this.isSubmited = false
      this.router.navigate(['/'])
    })
  }

}
