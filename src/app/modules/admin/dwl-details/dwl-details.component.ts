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
import { UsersService } from 'src/app/core/services';

@Component({
  selector: 'app-dwl-details',
  templateUrl: './dwl-details.component.html',
  styleUrls: ['./dwl-details.component.css']
})
export class DwlDetailsComponent implements OnInit {
  public applicationDetails: any;
  public applicationId: any;
  certificates: any = new Subject<any>();
  public currentUser = {
    role_id: null,
    department: null,
    email: null
  }
  public completIncompletForm: FormGroup;
  public inspectionForm: FormGroup;
  public settings: any
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UsersService,
    private permitService: PermitService,
    private applicationService: ApplicationService,
    private toasterService: ToastrService,
    public adminAuthService: AuthenticationService,

    private FB: FormBuilder
  ) {
    this.settings = settingConfig;
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(data => {
      this.applicationId = data.id;
    })
    this.permitDetails()
    this.getUserInfo();
    this.onInIt();
  }

  onInIt() {
    this.completeIncompletCon()
    this.inspectionFormControl();
  }

  completeIncompletCon() {
    this.completIncompletForm = this.FB.group({
      decision: ['', Validators.required],
      message: [''],
      to: [''],
      cc: [''],
    })
  }

  inspectionFormControl() {
    this.inspectionForm = this.FB.group({
      decision: ['', Validators.required],
      type: ['', Validators.required],
      date: ['', Validators.required],
      amount: [''],
      remark: [''],
    })
  }

  get inspection() { return this.inspectionForm.controls };
  get clerkCon() { return this.completIncompletForm.controls }

  permitDetails() {

    this.applicationService.getApplicationDetails(this.applicationId).subscribe(data => {
      
      this.applicationDetails = data.response;
      if (this.applicationDetails.related_permits && this.applicationDetails.related_permits.length > 0) {
        this.applicationDetails.related_permits.map((data => {
          data.isReleted = false
        }))
        console.log(this.applicationDetails)
      }
      // if (this.message == 'decision') {
      //   this.applicationDetails.isDecision = true;
      //   this.applicationDetails.isInspection = false
      //   this.applicationDetails.isContractor = false
      // } else if (this.message == 'inspection') {
      //   this.applicationDetails.isInspection = true
      //   this.applicationDetails.isContractor = false
      //   this.applicationDetails.isDecision = false;

      // } else if (this.message == 'contractor') {
      //   this.applicationDetails.isInspection = false
      //   this.applicationDetails.isContractor = true
      //   this.applicationDetails.isDecision = false;
      // }
      // if (!this.message) {
      //   this.applicationDetails.isInspection = false
      //   this.applicationDetails.isContractor = false
      //   this.applicationDetails.isDecision = false;
      // }


      this.certificates.next(this.applicationDetails)

      // console.log(this.applicationDetails)
    })
  }


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

    this.completIncompletForm.value.application_id = this.applicationId
    this.applicationService.acceptApplicationByClerk(this.completIncompletForm.value).subscribe(data => {
      this.permitDetails();
      this.completIncompletForm.reset();
      this.isCompletApplication = false;
      this.toasterService.success('Application has been accepted');
    }, error => {
      console.log(error)
    })
  }

  public isInspection = false;

  addInspections() {

    if (this.inspectionForm.invalid) {
      this.isInspection = true;
      return true
    }
    const data = {

    }
    // decision: ['', Validators.required],
    // type: ['', Validators.required],
    // date: ['', Validators.required],
    // amount: [''],
    // remark: [''],
    var formData = new FormData();
    formData.append('document', this.attachment)
    formData.append('application_id', this.applicationDetails.id)
    formData.append('decision', this.inspectionForm.value.decision)
    formData.append('fee', this.inspectionForm.value.amount)
    formData.append('type', this.inspectionForm.value.type)
    formData.append('date', this.inspectionForm.value.date)
    formData.append('remark', this.inspectionForm.value.remark)

    // this.inspectionForm.value.application_id = this.applicationDetails.id;
    // this.inspectionForm.value.decision = Number(this.inspectionForm.value.decision)
    // this.inspectionForm.value.fee = Number(this.inspectionForm.value.amount)

    this.applicationService.inspection(formData).subscribe(data => {
      this.inspectionForm.reset();
      this.isInspection = false
      // this.messageEvent.emit(this.message);
    })
  }

  public imageName: any;
  public attachment: any
  public licenseFile: any
  public image: any
  public formData
  media(event1) {
    this.imageName = event1.target.files[0].name;
    this.attachment = event1.target.files[0]
    // this.formData = new FormData()
    // this.formData.append('name', this.attachment)
    var reader = new FileReader();
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.image = event.target.result;
    };
    reader.readAsDataURL(event1.target.files[0]);
    // if (this.imageType) {
    //   this.uploadImage()
    // }

  }

  public isDwonArrow = false;
  public isSubmition = false;
  public isReletedPermitArrow = false;
  arrowRighDwon(value, condition) {
    //  this.message = null
    if (condition == 'fee') {
      this.isSubmition = !value
      this.isDwonArrow = true

    } else if (condition == 'permit') {
      this.isSubmition = !value
      this.isDwonArrow = true
      this.isReletedPermitArrow = !value
    }
    else {
      this.isDwonArrow = !value
      this.isSubmition = !value

    }
    // if (!this.message) {
    //   this.applicationDetails.isInspection = false
    //   this.applicationDetails.isContractor = false
    //   this.applicationDetails.isDecision = false;
    // }


    this.certificates.next(this.applicationDetails)

  }

  logoutUser() {
    this.adminAuthService.logout().subscribe(res => {
      if (res) {
        this.router.navigate(['/']);

      }
    });
  }

  changeDecision(value) {
    if (value == 1) {
      this.isCompletApplication = true
    }
    else if (value == 2) {
      this.isCompletApplication = false
    }
  }

  voidSubmition(id) {
    
    const data = {
      application_id: this.applicationDetails.id,
      id: id,
    }
    this.permitService.voidSubmition(data).subscribe(data => {
      this.toasterService.success('Submition is voided');
      this.permitDetails();
    })
  }
  public message:any
  receiveMessage(event) {
    this.message = event
    this.isDwonArrow = true;
    this.isSubmition = false;
    this.ngOnInit();
  }
}
