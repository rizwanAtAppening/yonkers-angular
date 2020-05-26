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
      feeType: [],
      paymetType: [],
      amount: [],
    })
  }

  get fee() { return this.addFeeForm.controls }

  
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
}
