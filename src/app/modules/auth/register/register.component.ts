import { Register } from './../../../shared/models/register.model';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { appToaster } from 'src/app/configs';
import { UsersService } from 'src/app/core/services';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {

  public registerForm: FormGroup;
  public isSubmit: boolean = false;
  public EMAIL_REGEX = "[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*";
  public usaPhoneFormat = ['+', '1', ' ', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];


  constructor(
    private authenticationService: AuthenticationService,
    private toasterService: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UsersService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.authenticationService.logout();
    this.initForm();

  }

  get email() { return this.registerForm.get('email') }
  get password() { return this.registerForm.get('password') }
  //get phoneNumber() { return this.registerForm.get('phoneNumber') }
  get confirmPassword() { return this.registerForm.get('confirmPassword') }
  get first_name() { return this.registerForm.get('first_name') }
  get last_name() { return this.registerForm.get('last_name') }
  //get address() { return this.registerForm.get('address') }
  get agree() { return this.registerForm.get('agree') }

  
  private initForm(): void {
    const formValidations = {
      'first_name': new FormControl('', [
        Validators.required,
        Validators.maxLength(250),
        Validators.minLength(3),
      ]),
      'last_name': new FormControl('', [
        Validators.required,
        Validators.maxLength(250),
        Validators.minLength(3),
      ]),
      // 'phoneNumber': new FormControl('', [
      //   Validators.required,
      //   Validators.minLength(10),
      //   Validators.maxLength(10),
      // ]),
      // 'address': new FormControl('', [
      //   Validators.required,
      //   Validators.minLength(3),
      // ]),
      'email': new FormControl('', [
        Validators.required,
        Validators.maxLength(250),
        Validators.pattern(this.EMAIL_REGEX)
      ]),
      'password': new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      'confirmPassword': new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      'agree': new FormControl('', Validators.requiredTrue),
    };

    this.registerForm = new FormGroup(formValidations);
  }

  private pwdMatchValidator() {
    return this.registerForm.get('password').value === this.registerForm.get('confirmPassword').value
      ? false : this.registerForm.get('confirmPassword').setErrors({ 'incorrect': true });
  }

  passwordMatch(value: string) {
    if (value == 'conpass') {
      return this.registerForm.controls.password.value === this.registerForm.controls.confirmPassword.value
        ? false : this.registerForm.get('confirmPassword').setErrors({ 'incorrect': true });
    } else if (value == 'pass' && this.registerForm.controls.password.value === this.registerForm.controls.confirmPassword.value) {
      this.registerForm.get('confirmPassword').setErrors(null);
    } else if (value == 'pass' && this.registerForm.controls.password.value != this.registerForm.controls.confirmPassword.value) {
      this.registerForm.get('confirmPassword').setErrors({ 'incorrect': true });
    }
  }



  onSubmit(): boolean {
    debugger
    this.isSubmit = true;
    if (this.registerForm.invalid) {
      return false;
    }
    this.userService.registerUser(this.registerForm.value)
      .subscribe((res) => {
        if (res.status === 'success') {
          this.toasterService.success(appToaster.successHead, res.message);
          this.router.navigate(['/dashboard/permit']);
        } else {
          this.toasterService.error(appToaster.errorHead, res.message);
          this.router.navigate(['/auth/register']);
        }
      });

  }

}
