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
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-pemit-update',
  templateUrl: './pemit-update.component.html',
  styleUrls: ['./pemit-update.component.css']
})
export class PemitUpdateComponent implements OnInit {
  @ViewChild('applicantPopUp', { static: false }) applicantPopUp: ElementRef;
  @ViewChild('descriptionPopup', { static: false }) descriptionPopup: ElementRef;
  @ViewChild('mailPopUp', { static: false }) mailPopUp: ElementRef;

  @ViewChild('deleteFeePopoUp', { static: false }) deleteFeePopoUp: ElementRef;
  @ViewChild('editFeePopup', { static: false }) editFeePopup: ElementRef;
  @ViewChild('reletedPermitPopUp', { static: false }) reletedPermitPopUp: ElementRef;
  @ViewChild('deleteImagepop', { static: false }) deleteImagepop: ElementRef;

  public lat = 40.730610;
  public long = -73.935242;
  certificates: any = new Subject<any>();
  public env: any
  public applicationId: number;
  public applicationDetails: any;
  public completIncompletForm: FormGroup;
  public editDescriptionForm: FormGroup;
  public addFeeForm: FormGroup;
  public projectDescriptionForm: FormGroup;
  public applicantForm: FormGroup;

  public isAccept = false;
  public settings: any;
  public isFee = false;
  public isCompletApplication = false;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UsersService,
    private permitService: PermitService,
    private applicationService: ApplicationService,
    private toasterService: ToastrService,
    public adminAuthService: AuthenticationService,

    private FB: FormBuilder
  ) { this.settings = settingConfig; }

  ngOnInit(): void {
    this.env = environment;
    this.onInIt()
    this.route.queryParams.subscribe(data => {
      this.applicationId = data.id;
    })
    if (this.applicationId) {
      this.permitDetails()
    }
    this.getUserInfo();
  }
  public reletedPermits = []
  getReletedPermit() {
    
    this.applicationService.reletedPermit(this.applicationDetails.id).subscribe(data => {
      this.reletedPermits= data.response;
      console.log(this.reletedPermits)
    })
  }

  public currentUser = {
    role_id: null,
    department: null,
    email: null
  }
  getUserInfo() {

    this.adminAuthService.getUserInfo().subscribe(data => {
      this.currentUser = data
    })
  }


  projectDescriptionControl() {
    this.projectDescriptionForm = this.FB.group({
      purpose: ['', Validators.required],
      dig_safely_no: [''],
      traffic_control: [''],
      length: [''],
      width: [''],
      depth: [''],
      opening_size: [''],
      layout_number: [''],
      gas_leak_number: [''],
      opening_number: [''],
      pavement_type: [''],
      description: [''],
      is_notifiable: [''],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
    })
  }

  fillProjectdes() {
    this.projectDescriptionForm.controls.purpose.setValue(this.applicationDetails.project_detail.purpose)
    this.projectDescriptionForm.controls.dig_safely_no.setValue(this.applicationDetails.project_detail.dig_safely_no)
    this.projectDescriptionForm.controls.traffic_control.setValue(this.applicationDetails.project_detail.traffic_control)
    this.projectDescriptionForm.controls.length.setValue(this.applicationDetails.project_detail.length)
    this.projectDescriptionForm.controls.width.setValue(this.applicationDetails.project_detail.width)
    this.projectDescriptionForm.controls.depth.setValue(this.applicationDetails.project_detail.depth)
    this.projectDescriptionForm.controls.opening_size.setValue(this.applicationDetails.project_detail.opening_size)
    this.projectDescriptionForm.controls.layout_number.setValue(this.applicationDetails.project_detail.layout_number)
    this.projectDescriptionForm.controls.gas_leak_number.setValue(this.applicationDetails.project_detail.gas_leak_number)
    this.projectDescriptionForm.controls.opening_number.setValue(this.applicationDetails.project_detail.opening_number)
    this.projectDescriptionForm.controls.pavement_type.setValue(this.applicationDetails.project_detail.pavement_type)
    this.projectDescriptionForm.controls.start_date.setValue(new Date(this.applicationDetails.project_detail.start_date))
    this.projectDescriptionForm.controls.is_notifiable.setValue(this.applicationDetails.project_detail.is_notifiable)
    this.projectDescriptionForm.controls.end_date.setValue(new Date(this.applicationDetails.project_detail.end_date))

  }

  get projectCon() { return this.projectDescriptionForm.controls }

  public isDescription = false;
  saveProjectDescription() {

    if (this.projectDescriptionForm.invalid) {
      this.isDescription = true
      return false
    }
    this.projectDescriptionForm.value.is_notifiable = 1
    this.applicationService.saveProjectInfo(this.projectDescriptionForm.value, this.applicationDetails.id).subscribe(data => {
      this.toasterService.success('Information Updated')
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
      fee_Type: this.fee_Type,
      type: this.type

    }
    this.applicationService.addFee(data).subscribe(data => {
      this.addFeeForm.reset()
      this.editFeePopup.nativeElement.click();
      this.isUpdateFee = false
      this.permitDetails();
    })
  }
  public feeId: any
  public fee_Type: any;
  public type: any
  getFeeId(id, value) {
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
  public allMails = []
  public allRelatedPermit = []
  permitDetails() {
    
    this.applicationService.getApplicationDetails(this.applicationId).subscribe(data => {

      this.applicationDetails = data.response;
      if (this.applicationDetails.applicant_details) {
        this.allMails.push(this.applicationDetails.applicant_details.applicant_email)

      }
      if (this.applicationDetails.contractor_details) {
        this.allMails.push(this.applicationDetails.contractor_details.contractor_email)
      }

      this.getReletedPermit();
      if (this.applicationDetails.related_permits && this.applicationDetails.related_permits.length > 0) {
        this.applicationDetails.related_permits.map((data => {
          data.isReleted = false
        }))
        this.allRelatedPermit =  this.applicationDetails.related_permits
        console.log(this.allRelatedPermit)
      }
      if (this.message == 'decision') {
        this.applicationDetails.isDecision = true;
        this.applicationDetails.isInspection = false
        this.applicationDetails.isContractor = false
      } else if (this.message == 'inspection') {
        this.applicationDetails.isInspection = true
        this.applicationDetails.isContractor = false
        this.applicationDetails.isDecision = false;

      } else if (this.message == 'contractor') {
        this.applicationDetails.isInspection = false
        this.applicationDetails.isContractor = true
        this.applicationDetails.isDecision = false;
      }
      else if (this.message == 'email') {
        this.applicationDetails.isInspection = false
        this.applicationDetails.isContractor = false
        this.applicationDetails.isEmail = true

        this.applicationDetails.isDecision = false;
      }
      if (!this.message) {
        this.applicationDetails.isInspection = false
        this.applicationDetails.isContractor = false
        this.applicationDetails.isEmail = false

        this.applicationDetails.isDecision = false;
      }


      this.certificates.next(this.applicationDetails)

      console.log(this.applicationDetails)
    })
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


  public related_permit: any
  check(data, value) {

    this.related_permit = value.id
    if (this.applicationDetails.related_permits && this.applicationDetails.related_permits.length > 0) {
      this.applicationDetails.related_permits.map((data => {
        if (value.id == data.id) {
          data.isReleted = data.checked
        }
        else {
          data.isReleted = !data.checked

        }
      }))
      console.log(this.applicationDetails)
    }
  }

  addReletedPermit() {
    if (this.related_permit) {
      const data = {
        related_permit: this.related_permit,
        application_id: this.applicationDetails.id,
      }
      this.applicationService.addReltedPemrit(data).subscribe(data => {
        this.reletedPermitPopUp.nativeElement.reset();
      })
    } else {
      this.toasterService.error('Plz select permit');
    }

  }
  public sendEmialForm: FormGroup
  onInIt() {
    this.completeIncompletCon();
    this.description();
    this.feeControls();
    this.projectDescriptionControl();
    this.applicantControl();
    this.mailControl();
  }


  mailControl() {
    this.sendEmialForm = this.FB.group({
      cc: [''],
      to: ['',Validators.required],
      subject: ['',Validators.required],
      description: ['', Validators.required],
    })
  }

  get mailCon() { return this.sendEmialForm.controls }


  applicantControl() {
    this.applicantForm = this.FB.group({
      applicant_name: ['', Validators.required],
      applicant_role: ['', Validators.required],
      applicant_phone: ['', Validators.required],
      applicant_address: ['', Validators.required],
    })
  }
  get applicant() { return this.applicantForm.controls };

  addApplicant() {
    this.applicantForm.value.applicant_type = this.applicantForm.value.applicant_role
    this.applicationService.applicantUpdate(this.applicantForm.value, this.applicationDetails.id).subscribe(data => {
      this.applicantPopUp.nativeElement.click();
      this.toasterService.success('Applicant  details have been updated')
      this.permitDetails()
    })
  }

  fillApplicant() {

    this.applicantForm.controls.applicant_name.setValue(this.applicationDetails.applicant_details.applicant_name);
    this.applicantForm.controls.applicant_role.setValue(this.applicationDetails.applicant_details.applicant_role)
    this.applicantForm.controls.applicant_address.setValue(this.applicationDetails.applicant_details.applicant_address)
    this.applicantForm.controls.applicant_phone.setValue(this.applicationDetails.applicant_details.applicant_phone)

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

  receiveMessage(event) {
    this.message = event
    this.isDwonArrow = true;
    this.isSubmition = false;
    this.ngOnInit();
  }
  editDescription() {
    this.applicationService.editDescription(this.editDescriptionForm.value, this.applicationId).subscribe(data => {
      this.descriptionPopup.nativeElement.click();
      this.permitDetails();
      this.toasterService.success('Application description updated');
    })
  }

  get clerkCon() { return this.completIncompletForm.controls }

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

    this.selectfeeType = value
  }

  logoutUser() {
    this.adminAuthService.logout().subscribe(res => {
      if (res) {
        this.router.navigate(['/']);

      }
    });
  }

  public isDwonArrow = false;
  public isSubmition = false;
  public isReletedPermitArrow = false;
  arrowRighDwon(value, condition) {
    this.message = null
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
    if (!this.message) {
      this.applicationDetails.isInspection = false
      this.applicationDetails.isContractor = false
      this.applicationDetails.isDecision = false;
    }


    this.certificates.next(this.applicationDetails)

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
    if (this.imageType) {
      this.uploadImage()
    }

  }
  public imageType: string
  selectImageType(type) {
    var type = type
    this.imageType = type
    if (type == 0) {
      this.imageType = type
    } else {
      this.imageType = type

    }

  }

  uploadImage() {

    var formData = new FormData();
    formData.append('application_id', this.applicationDetails.id);
    formData.append('name', this.attachment);
    formData.append('type', this.imageType);
    this.permitService.uploadImageByAdmin(formData).subscribe(data => {
      this.image = null;
      this.toasterService.success('Image upload successfuly');
    })
  }




  deleteImage() {
    this.imageName = null;
    this.attachment = null;
  }
  imageEmpty() {
    this.imageName = null;
    this.attachment = null;
    this.image = null
  }

  public documentId: any
  public document:any;
  docId(file) {
    this.documentId = file.id;
    this.document = file.name
  }

  public isSendEmail = false
  sendEmail() {
    
   // this.sendEmialForm.controls.to.setErrors(null)
    this.sendEmialForm.controls.cc.setErrors(null)

    if (this.sendEmialForm.invalid) {
      this.isSendEmail = true
      return false
    }

    const data = {
      application_id: this.applicationDetails.id,
      subject: this.sendEmialForm.value.subject,
      to: this.sendEmialForm.value.to,
      cc: this.sendEmialForm.value.cc,
      doc_id: this.documentId,
      discription: this.sendEmialForm.value.description

    }

    this.sendEmialForm.value.applicantId = this.applicationDetails.id
    this.permitService.sendMail(data).subscribe(data => {
      this.sendEmialForm.reset()
      this.mailPopUp.nativeElement.click();
      this.isSendEmail = false;
      this.toasterService.success('Mail have beed send')
    })
  }


  deleteDocuments() {
    const data = {
      document_id: this.documentId,
      application_id: this.applicationDetails.id,
    }
    this.permitService.deleteDocuments(data).subscribe(data => {
      this.toasterService.success('Delete Successful')
      this.deleteImagepop.nativeElement.click();
      this.getReletedPermit();
    })
  }
} 
