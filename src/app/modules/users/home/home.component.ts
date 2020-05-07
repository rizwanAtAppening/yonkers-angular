// import { routerTransition } from 'src/app/router.animations';
import { AuthenticationService } from './../../../core/authentication/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { appToaster } from 'src/app/configs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
// export class HomeComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }

export class HomeComponent implements OnInit {

  public loginForm: FormGroup;
  public isSubmit: boolean = false;
  public EMAIL_REGEX = "[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*";
  public returnUrl;
  public isAdmin = false
  public formValidations = {
    'email': new FormControl('', [
      Validators.required,
      Validators.maxLength(250),
      Validators.pattern(this.EMAIL_REGEX)
    ]),
    'password': new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ])
  };

  constructor(
    private authenticationService: AuthenticationService,
    private toasterService: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.authenticationService.logout();
    this.loginForm = new FormGroup(this.formValidations);
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/application?tab=what';

  }

  admin(value) {
    debugger
    this.isAdmin = value.target.checked
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit(): boolean {
    this.isSubmit = true;
    if (this.loginForm.invalid) {
      return false;
    }

    if(!this.isAdmin){
      this.authenticationService
      .login(this.loginForm.value)
      .subscribe(res => {
        if (res.status === 'success') {
          this.toasterService.success(appToaster.successHead, appToaster.loginSucess);
          this.router.navigate(['/dashboard/permit']);
          return true;
        }
      })

    } else if(this.isAdmin){
      this.authenticationService
      .adminLogin(this.loginForm.value)
      .subscribe(res => {
        if (res.status === 'success') {
          this.toasterService.success(appToaster.successHead, appToaster.loginSucess);
          this.router.navigate(['/dashboard/permit']);
          return true;
        }
      })

    }
    
  }

}

