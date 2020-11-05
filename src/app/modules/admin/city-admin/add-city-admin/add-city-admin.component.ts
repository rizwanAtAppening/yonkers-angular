import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { appToaster, settingConfig } from 'src/app/configs';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CityAdminService } from 'src/app/core/services/admin/city-admin.service';
@Component({
  selector: 'app-add-city-admin',
  templateUrl: './add-city-admin.component.html',
  styleUrls: ['./add-city-admin.component.css']
})
export class AddCityAdminComponent implements OnInit {
  public settings: any;
  public addStaffForm: FormGroup;
  public departmentId = 1
  public EMAIL_REGEX = "[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*";
  public isEmailReadOnly = false;
  public allRoles = []
  public allDepartments = []
  public isStaff = false;
  public staffId: number
  constructor(
    private adminAuthService: AuthenticationService,
    private router: Router,
    private FB: FormBuilder,
    private TS: ToastrService,
    private route: ActivatedRoute,
    private cityAdminService: CityAdminService
  ) {
    this.settings = settingConfig;

  }

  ngOnInit(): void {
    this.addStaffCon();
    this.addStaffForm.controls.status.setValue(1)
    this.route.queryParams.subscribe(data => {
      this.staffId = data.staffId;
    })
    if (this.staffId) {
      this.isEmailReadOnly = true
      this.getStaffById();
    }


  }
  addStaffCon() {
    this.addStaffForm = this.FB.group({
      // city_name: ['', Validators.required],
      // email: ['', [Validators.required, Validators.pattern(this.EMAIL_REGEX)]],
      // phone: [],
      // admin_name: ['', Validators.required],
      // isActive: [''],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      // phone: ['', [Validators.required, Validators.pattern('^[0-9]{3}-[0-9]{3}-[0-9]{4}$')]],
      // department_id: ['', [Validators.required]],
      // role_id: ['', [Validators.required]],
      // stripe_account_id: [''],
      city_name: [''],
      status: [''],
    })
  }

  get staffControl() { return this.addStaffForm.controls }


  addCityAdmin() {
    if (this.addStaffForm.invalid) {
      this.isStaff = true
      return false
    }
    this.addStaffForm.value.city = this.addStaffForm.value.city_name
    // this.addStaffForm.value.phone =  '656-455-5858'
    this.cityAdminService.addCityAdmin(this.addStaffForm.value).subscribe(data => {
      this.TS.success("Staff added");
      this.addStaffForm.reset();
    })
  }


  updateCityAdmin() {
    if (this.addStaffForm.invalid) {
      this.isStaff = true
      return false
    }
    this.addStaffForm.value.city = this.addStaffForm.value.city_name
    this.cityAdminService.updateCityAdmin(this.addStaffForm.value, this.staffId).subscribe(data => {
      this.TS.success("Staff update");
      this.router.navigate(['/admin/city-admin-list'])
      this.addStaffForm.reset();
    })
  }


  phoneNumberFormate() {
    var value: string
    var autoFillValue = '-'
    if (this.addStaffForm.value.phone.length === 3) {
      this.addStaffForm.controls.phone.setValue(this.addStaffForm.value.phone.concat(autoFillValue))
    }
    if (this.addStaffForm.value.phone.length === 7) {
      this.addStaffForm.controls.phone.setValue(this.addStaffForm.value.phone.concat(autoFillValue))
    }
  }

  public singleStaffDetails: any
  getStaffById() {
    debugger
    this.cityAdminService.getSingleCityAdmin(this.staffId).subscribe(data => {
      this.singleStaffDetails = data.response;
      if (this.singleStaffDetails) {
        this.fillStaffInfo(this.singleStaffDetails)
      }
    })
  }


  fillStaffInfo(value) {
    debugger
    this.addStaffForm.controls.email.setValue(value.email);
    this.addStaffForm.controls.name.setValue(value.name);
    this.addStaffForm.controls.city_name.setValue(value.name);

    this.addStaffForm.controls.status.setValue(value.status);
    this.addStaffForm.controls.phone.setValue(value.phone);

  }

}
