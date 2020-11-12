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
  public staffId: number;
  public isChecked = true
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
  // public isChecked = true
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
    this.addStaffForm.controls.payment_account_type.setValue(true)

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
      payment_account_type: [''],
      stripe_account_id: ['', Validators.required],
      city_name: ['', Validators.required],
      status: [''],
    })
  }

  get staffControl() { return this.addStaffForm.controls }


  addCityAdmin() {
    debugger
    if (this.addStaffForm.value.payment_account_type == 2) {
      this.addStaffForm.controls.stripe_account_id.setErrors(null)
    }
    if (this.addStaffForm.invalid) {
      this.isStaff = true
      return false
    }
    // if (this.addStaffForm.value.payment_account_type) {
    //   this.addStaffForm.value.payment_account_type = 1
    // }
    if (this.addStaffForm.value.status) {
      this.addStaffForm.value.status = 1
    } else if (!this.addStaffForm.value.status) {
      this.addStaffForm.value.status = 0
    }
    this.addStaffForm.value.city = this.addStaffForm.value.city_name
    // this.addStaffForm.value.phone =  '656-455-5858'
    this.cityAdminService.addCityAdmin(this.addStaffForm.value).subscribe(data => {
      this.TS.success("Staff added");
      this.isStaff = false;
      this.router.navigate(['/admin/city-admin-list'])
      this.addStaffForm.reset();
    })
  }


  updateCityAdmin() {
    debugger
    if (this.addStaffForm.value.payment_account_type == 2) {
      this.addStaffForm.controls.stripe_account_id.setErrors(null)
      // this.addStaffForm.controls.stripe_account_id.setValue(null)

    }
    if (this.addStaffForm.invalid) {
      this.isStaff = true
      return false
    }
    if (this.addStaffForm.value.payment_account_type) {
      this.addStaffForm.value.payment_account_type = 1
    }
    if (this.addStaffForm.value.status) {
      this.addStaffForm.value.status = 1
    } else if (!this.addStaffForm.value.status) {
      this.addStaffForm.value.status = 0
    }
    this.addStaffForm.value.city = this.addStaffForm.value.city_name
    this.cityAdminService.updateCityAdmin(this.addStaffForm.value, this.staffId).subscribe(data => {
      this.TS.success("Staff update");
      this.isStaff = false
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
    this.addStaffForm.controls.stripe_account_id.setValue(value.stripe_account_id);
    if (value.payment_account_type == 1) {
      this.isChecked = true
    } else {
      this.isChecked = false
      this.isStripe = false
    }

  }
  public isStripe = true
  selectStripAc(value: string) {
    debugger
    if (value == '1') {
      this.addStaffForm.controls.payment_account_type.setValue(1)
      this.isStripe = true
    }
    else if (value == '2') {
      this.addStaffForm.controls.payment_account_type.setValue(2)
      this.addStaffForm.controls.stripe_account_id.setValue(null)
      this.isStripe = false

    }
  }

}
