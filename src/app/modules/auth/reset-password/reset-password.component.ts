import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UsersService } from 'src/app/core/services';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  public resetForm: FormGroup;
  public isSubmited = false;
  public EMAIL_REGEX = "[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*";

  constructor(
    private fb: FormBuilder,
    private userService: UsersService,
    private toasterService: ToastrService,
    private router:Router


  ) { }

  ngOnInit(): void {
    this.resetFormControls();
  }


  resetFormControls() {
    this.resetForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.maxLength(250),
        Validators.pattern(this.EMAIL_REGEX)
      ]]
    })
  }

  get resetControls() { return this.resetForm.controls };

  resetPassword() {
    if (this.resetForm.invalid) {
      this.isSubmited = true;
      return false
    }
    this.userService.resetPassword(this.resetForm.value).subscribe(data => {
      this.toasterService.success("Link send your email. Please check your email")
      this.resetForm.reset();
      this.isSubmited = false;
    })
  }

  reset(){
    this.resetForm.reset();
    this.router.navigate(['/'])
  }
}
