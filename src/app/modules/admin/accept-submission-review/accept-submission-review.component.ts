import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject, Observable } from 'rxjs';
import { appToaster, settingConfig } from 'src/app/configs';
import { ApplicationService } from 'src/app/core/services/admin/application.service';
import { ToastrService } from 'ngx-toastr';
import { PermitService } from 'src/app/core/services/users/permit.service';

@Component({
  selector: 'app-accept-submission-review',
  templateUrl: './accept-submission-review.component.html',
  styleUrls: ['./accept-submission-review.component.css']
})
export class AcceptSubmissionReviewComponent implements OnInit {
  @Input() certificatesChild: Observable<any>;
  public applicationDetails: any;
  @Output() messageEvent = new EventEmitter<string>();
  public feeId: any
  public fee_Type: any;
  public type: any
  public addFeeForm: any;
  public settings: any;
  public isFee = false;
  public desicionForm: FormGroup;

  public currentUser = {
    role_id: null,
    department: null,
    email: null
  }
  public certificates: any = new Subject<any>();

  public completIncompletForm: FormGroup;
  constructor(
    private adminAuthService: AuthenticationService,
    private FB: FormBuilder,
    private applicationService: ApplicationService,
    private toasterService: ToastrService,
    private permitService:PermitService
  ) {
    this.settings = settingConfig;
  }

  ngOnInit(): void {
    
    this.completeIncompletCon()
    this.feeControls()
    this.desicionControls()
    this.getUserInfo()
    this.certificatesChild.subscribe(data => {
      this.applicationDetails = data;
    });
  }

  desicionControls() {
    this.desicionForm = this.FB.group({
      permit_decision: [''],
      inspector: [''],
      remarks: [''],

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
  feeControls() {
    this.addFeeForm = this.FB.group({
      message: [''],
      amount: ['', Validators.required],
    })
  }

  get fee() { return this.addFeeForm.controls }
  get desicion() { return this.desicionForm.controls };
  get clerkCon() { return this.completIncompletForm.controls }

  getUserInfo() {

    this.adminAuthService.getUserInfo().subscribe(data => {
      this.currentUser = data
    })
  }

  public isAccept = false;
  public isCompletApplication = false;
  accepetOrDeclineApplication() {
    if (this.completIncompletForm.invalid) {
      this.isAccept = true
      return false
    }

    this.completIncompletForm.value.application_id = this.applicationDetails.id
    this.applicationService.acceptApplicationByClerk(this.completIncompletForm.value).subscribe(data => {
      this.messageEvent.emit('hello')
      this.completIncompletForm.reset();
      this.isCompletApplication = false;
      this.toasterService.success('Application has been accepted');
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
      this.messageEvent.emit('hello')
    })
  }


  getFeeId(id, value) {
    this.feeId = id;
    this.fee_Type = value.fee_Type,
      this.type = value.type
  }

  VoidFee(feeId) {
    const data = {
      id:feeId,
      application_id:this.applicationDetails.id
    }
    this.applicationService.voidPaymentFee(data).subscribe(data => {
      this.toasterService.success('Fee have voided');
      this.messageEvent.emit('hello')
    })
  }

  public isDecision = false;
  public data: any;
  decision() {

    if (this.desicionForm.invalid) {
      this.isDecision = true
      return false
    }
    this.data = {
      permit_decision: this.desicionForm.value.permit_decision,
      application_id: this.applicationDetails.id,
      remark: this.desicionForm.value.remarks,

      // expiration_date: this.desicionForm.value.expiration_date,
      // expiration_days: this.desicionForm.value.expiration_days,
      // inspector: this.desicionForm.value.inspector,

    }
    this.applicationService.addDecision(this.data).subscribe(data => {
      console.log(data);
      this.desicionForm.reset()
      this.settings.conditions.map((data, i) => {
        data.isChecked = false
      })
      this.messageEvent.emit('hello');
    }, error => {
      this.settings.conditions.map((data, i) => {
        data.isChecked = false
      })

      this.desicionForm.reset()
    })
  }

  voidDecision(id) {
    const data = {
      id:id,
      application_id:this.applicationDetails.id
    }
    this.applicationService.voidDecision(data).subscribe(data => {
      this.toasterService.success('Decision have voided')
    })
  }

  voidSubmition(id) {

    const data = {
      application_id: this.applicationDetails.id,
      id: id,
    }
    this.permitService.voidSubmition(data).subscribe(data => {
      this.toasterService.success('Submition is voided');
      this.messageEvent.emit('hello')
    })
  }



  
}
