import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
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
  public EMAIL_REGEX = "[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*";
  public isEmailReadOnly = false;
  constructor(
    private adminAuthService: AuthenticationService,
    private router: Router,
    private FB: FormBuilder,
    private TS: ToastrService,
    private route: ActivatedRoute

  ) {
    this.settings = settingConfig;

  }
  public staffId: number
  ngOnInit(): void {
    this.addStaffCon();
    this.route.queryParams.subscribe(data => {
      this.staffId = data.staffId
    })
    
    if (this.staffId) {
      this.isEmailReadOnly = true
      this.getStaffById();
    }

    this.addStaffForm.controls.isActive.setValue(1)
  }



  addStaffCon() {
    this.addStaffForm = this.FB.group({
      name: [''],
      email: ['', [Validators.required, Validators.pattern(this.EMAIL_REGEX)]],
      phone: [],
      departments: [''],
      role_id: [''],
      isActive: [''],
    })
  }

  public singleStaffDetails: any
  getStaffById() {
    this.adminAuthService.getStaffById(this.staffId).subscribe(data => {
      this.singleStaffDetails = data.response;
      if (this.singleStaffDetails) {
        this.fillStaffInfo(this.singleStaffDetails)
      }
    })
  }


  fillStaffInfo(value) {
    this.addStaffForm.controls.email.setValue(value.email);
    this.addStaffForm.controls.name.setValue(value.name);
    this.addStaffForm.controls.isActive.setValue(value.status);
    this.addStaffForm.controls.phone.setValue(value.phone);

  }

  public isStaff = false
  public departments = [1]
  public status: number = 1
  addStaff() {
    
    this.addStaffForm.controls.name.setErrors(null);
    this.addStaffForm.controls.phone.setErrors(null);
   // this.addStaffForm.controls.name.setErrors(null);

    if (this.addStaffForm.invalid) {
      this.isStaff = true;
      return false
    }

    if (this.addStaffForm.value.isActive == null || this.addStaffForm.value.isActive == false) {
      this.status = 0
    } else if (this.addStaffForm.value.isActive == true) {
      this.status = 1
    }
    this.addStaffForm.value.departments = this.departments

    // this.addStaffForm.value.role_id = 4;

    const data = {
      role_id: 4,
      departments: this.departments,
      status: this.status,
      password: 123456,
      email: this.addStaffForm.value.email,
      name: this.addStaffForm.value.name,
      phone: this.addStaffForm.value.phone,

    }

    if (this.staffId) {
      this.adminAuthService.updateStaff(data, this.staffId).subscribe(data => {
        this.addStaffForm.reset();
        this.TS.success('Staff updated');
        this.router.navigate(['/admin/staff-list'])
      })
    }
    else {
      this.adminAuthService.addStaff(data).subscribe(data => {
        this.addStaffForm.reset();
        this.TS.success('Staff added and sent invitation on your email');
        this.router.navigate(['/admin/staff-list'])
      })
    }

  }

  get staffControl() { return this.addStaffForm.controls }
}
