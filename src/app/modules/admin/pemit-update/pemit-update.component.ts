import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PermitService } from 'src/app/core/services/users/permit.service';
import { ApplicationService } from 'src/app/core/services/admin/application.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { appToaster, settingConfig } from 'src/app/configs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-pemit-update',
  templateUrl: './pemit-update.component.html',
  styleUrls: ['./pemit-update.component.css']
})
export class PemitUpdateComponent implements OnInit {
  public applicationId: number;
  public applicationDetails: any;
  public completIncompletForm: FormGroup;
  public isAccept = false;
  public settings: any
  public isCompletApplication = false;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private permitService: PermitService,
    private applicationService: ApplicationService,
    private toasterService: ToastrService,
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
  }

  permitDetails() {
    this.applicationService.getApplicationDetails(this.applicationId).subscribe(data => {
      this.applicationDetails = data.response
      console.log(this.applicationDetails)
    })
  }

  onInIt() {
    this.completeIncompletCon()
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

  accepetOrDeclineApplication() {
    if (this.completIncompletForm.invalid) {
      this.isAccept = true
      return false
    }
    const data = {

    }
    this.completIncompletForm.value.application_id = this.applicationId
    this.applicationService.acceptApplicationByClerk(this.completIncompletForm.value).subscribe(data => {
      console.log(data)
      this.toasterService.success('Application has been accepted')
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
