import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PermitService } from 'src/app/core/services/users/permit.service';
import { ApplicationService } from 'src/app/core/services/admin/application.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { appToaster, settingConfig } from 'src/app/configs';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { error } from 'util';

@Component({
  selector: 'app-pemit-update',
  templateUrl: './pemit-update.component.html',
  styleUrls: ['./pemit-update.component.css']
})
export class PemitUpdateComponent implements OnInit {
  @ViewChild('descriptionPopup', { static: false }) descriptionPopup: ElementRef;
  @ViewChild('deleteFeePopoUp', { static: false }) deleteFeePopoUp: ElementRef;
  @ViewChild('editFeePopup', { static: false }) editFeePopup: ElementRef;

  certificates: any = new Subject<any>();

  public applicationId: number;
  public applicationDetails: any;
  public completIncompletForm: FormGroup;
  public editDescriptionForm: FormGroup;
  public addFeeForm: FormGroup;
  public isAccept = false;
  public settings: any;
  public isFee = false;
  public isCompletApplication = false;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private permitService: PermitService,
    private applicationService: ApplicationService,
    private toasterService: ToastrService,
    public adminAuthService: AuthenticationService,

    private FB: FormBuilder
  ) { this.settings = settingConfig; }

  ngOnInit(): void {
    this.onInIt()
    this.route.queryParams.subscribe(data => {
      this.applicationId = data.id;
    })
    if (this.applicationId) {
      this.permitDetails()
    }
    this.getUserInfo();
  }

  public currentUser = {
    role_id: null,
    department: null
  }
  getUserInfo() {
    debugger
    this.adminAuthService.getUserInfo().subscribe(data => {
      this.currentUser = data
    })
  }

  feeControls() {
    this.addFeeForm = this.FB.group({
      feeType: ['', Validators.required],
      paymetType: ['', Validators.required],
      amount: ['', Validators.required],
    })
  }

  get fee() { return this.addFeeForm.controls }

  addFee() {
    if (this.addFeeForm.invalid) {
      this.isFee = true;
      return false
    }
    this.addFeeForm.value.application_id = this.applicationDetails.id
    this.addFeeForm.value.type = this.addFeeForm.value.paymetType
    this.addFeeForm.value.fee_Type = this.addFeeForm.value.feeType

    this.applicationService.addFee(this.addFeeForm.value).subscribe(data => {
      this.addFeeForm.reset()
      this.permitDetails();
    })
  }

  public isUpdateFee = false;
  updateFee() {
    this.addFeeForm.controls.feeType.setErrors(null)
    this.addFeeForm.controls.paymetType.setErrors(null)
    if (this.addFeeForm.invalid) {
      this.isUpdateFee = true;
      return false
    }
    const data = {
      amount: Number(this.addFeeForm.value.amount),
      application_id: this.applicationDetails.id,
      id: this.feeId,
      fee_Type:this.fee_Type,
      type:this.type

    }
    this.applicationService.addFee(data).subscribe(data => {
      this.addFeeForm.reset()
      this.editFeePopup.nativeElement.click();
      this.isUpdateFee = false
      this.permitDetails();
    })
  }
  public feeId: any
  public fee_Type:any;
  public type:any
  getFeeId(id,value) {
    this.feeId = id;
    this.fee_Type = value.fee_Type,
    this.type = value.type
  }

  deleteFee() {
    const data = {
      id: this.feeId,
      application_id: this.applicationDetails.id
    }
    this.applicationService.feeDelete(data).subscribe(data => {
      this.toasterService.success('Fee has been deleted')
      this.deleteFeePopoUp.nativeElement.click()
      this.feeId = null
      this.permitDetails();
    })
  }
  permitDetails() {
    debugger
    this.applicationService.getApplicationDetails(this.applicationId).subscribe(data => {
      this.applicationDetails = data.response
      this.certificates.next(this.applicationDetails)

      console.log(this.applicationDetails)
    })
  }

  onInIt() {
    this.completeIncompletCon();
    this.description();
    this.feeControls();
  }



  description() {
    this.editDescriptionForm = this.FB.group({
      description: [''],
    })
  }

  completeIncompletCon() {
    this.completIncompletForm = this.FB.group({
      decision: ['', Validators.required],
      message: [''],
      to: [''],
      cc: [''],
    })
  }

  fillDescriptionForm() {
    if (this.applicationDetails && this.applicationDetails.project_detail) {
      this.editDescriptionForm.controls.description.setValue(this.applicationDetails.project_detail.description)

    }
  }

  message: string;
  receiveMessage($event) {
    this.message = $event
    this.ngOnInit();
  }
  editDescription() {
    debugger
    this.applicationService.editDescription(this.editDescriptionForm.value, this.applicationId).subscribe(data => {
      this.descriptionPopup.nativeElement.click();
      this.permitDetails();
      this.toasterService.success('Application description updated');
    })
  }

  get clerkCon() { return this.completIncompletForm.controls }

  accepetOrDeclineApplication() {
    debugger
    if (this.completIncompletForm.invalid) {
      this.isAccept = true
      return false
    }
    const data = {

    }
    this.completIncompletForm.value.application_id = this.applicationId
    this.applicationService.acceptApplicationByClerk(this.completIncompletForm.value).subscribe(data => {
      console.log(data)
      this.completIncompletForm.reset();
      this.isCompletApplication = false
      this.toasterService.success('Application has been accepted')
    }, error => {
      console.log(error)
    })
  }

  changeDecision(value) {
    if (value == 1) {
      this.isCompletApplication = true
    }
    else if (value == 2) {
      this.isCompletApplication = false
    }
  }

  public isShowMoreAndLess = false;
  showMoreAndShowLess(value) {
    this.isShowMoreAndLess = value
  }

  public selectfeeType: number = 2
  feeType(value) {
    debugger
    this.selectfeeType = value
  }
}
