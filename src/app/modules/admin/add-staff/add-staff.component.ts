import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { Router } from '@angular/router';
import { appToaster, settingConfig } from 'src/app/configs';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-staff',
  templateUrl: './add-staff.component.html',
  styleUrls: ['./add-staff.component.css']
})
export class AddStaffComponent implements OnInit {
  public settings: any;
  public currentUser: any;
  public addStaffForm: FormGroup
  constructor(
    private adminAuthService: AuthenticationService,
    private router: Router,
    private FB: FormBuilder

  ) {
    this.settings = settingConfig;

  }

  ngOnInit(): void {
  }

  getUserInfo() {

    this.adminAuthService.getUserInfo().subscribe(data => {
      this.currentUser = data
    })
  }

  addStaffCon() {
    this.addStaffForm = this.FB.group({
      name: [],
      email: [],
      phone: [],
      departments: [],
      role_id: []
    })
  }

  logoutUser() {
    this.adminAuthService.logout().subscribe(res => {
      if (res) {
        this.router.navigate(['/']);

      }
    });
  }

  addStaff() {
    this.adminAuthService.addStaff(this.addStaffForm.value).subscribe(data => {
      this.addStaffForm.reset();
    })
  }

  get staffControl(){return this.addStaffForm.controls}
}
