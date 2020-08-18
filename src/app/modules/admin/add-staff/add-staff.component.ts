import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { Router } from '@angular/router';
import { appToaster, settingConfig } from 'src/app/configs';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-staff',
  templateUrl: './add-staff.component.html',
  styleUrls: ['./add-staff.component.css']
})
export class AddStaffComponent implements OnInit {
  public settings: any;
  public addStaffForm: FormGroup;
  public departmentId = 1
  constructor(
    private adminAuthService: AuthenticationService,
    private router: Router,
    private FB: FormBuilder,
    private TS:ToastrService

  ) {
    this.settings = settingConfig;

  }

  ngOnInit(): void {
    this.addStaffCon();
  }



  addStaffCon() {
    this.addStaffForm = this.FB.group({
      name: [],
      email: [],
      phone: [],
      departments: ['', Validators.required],
      role_id: ['', Validators.required],
      isActive: [],
    })
  }


  public isStaff = false
  public departments = [1]
  addStaff() {
    debugger
    if (this.addStaffForm.invalid) {
      this.isStaff = true;
      return false
    }
    this.addStaffForm.value.password = 12345
   this.addStaffForm.value.departments =  this.departments
   
      this.addStaffForm.value.role_id =  Number(this.addStaffForm.value.role_id);


    this.adminAuthService.addStaff(this.addStaffForm.value).subscribe(data => {
      this.addStaffForm.reset();
      this.TS.success('Add staff')
    })
  }

  get staffControl() { return this.addStaffForm.controls }
}
