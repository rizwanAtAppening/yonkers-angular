import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject, Observable } from 'rxjs';
import { appToaster, settingConfig } from 'src/app/configs';
import { ApplicationService } from 'src/app/core/services/admin/application.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-accept-submission-review',
  templateUrl: './accept-submission-review.component.html',
  styleUrls: ['./accept-submission-review.component.css']
})
export class AcceptSubmissionReviewComponent implements OnInit {
  @Input() certificatesChild: Observable<any>;
  public applicationDetails:any
  public settings: any;
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
  ) {
    this.settings = settingConfig;
  }

  ngOnInit(): void {
    debugger
    this.completeIncompletCon()
    this.getUserInfo()
    this.certificatesChild.subscribe(data => {
      this.applicationDetails = data;
      // this.contractorState = Number  ( this.applicationDetails.contractor_details && this.applicationDetails.contractor_details.contractor_state);
      // this.dumsterState = Number  ( this.applicationDetails.dumpsters_details && this.applicationDetails.dumpsters_details.dumpster_state);

      // if (this.applicationDetails) {
      //   this.compareDate();
      //   this.emailFormGroup.controls.to.setValue(null);
      //   this.emailFormGroup.controls.from.setValue(null)

      // }
    });
  }

  completeIncompletCon() {
    this.completIncompletForm = this.FB.group({
      decision: ['', Validators.required],
      message: [''],
      to: [''],
      cc: [''],
    })
  }

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
      //this.permitDetails();
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
}
