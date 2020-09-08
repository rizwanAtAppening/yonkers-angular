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
  selector: 'app-dwl-details',
  templateUrl: './dwl-details.component.html',
  styleUrls: ['./dwl-details.component.css']
})
export class DwlDetailsComponent implements OnInit {
  public applicationDetails: any;
  public applicantForm: FormGroup;
  public sendEmialForm: FormGroup;
  public editDescriptionForm: FormGroup;
  public projectDescriptionForm: FormGroup;
  @ViewChild('applicantPopUp', { static: false }) applicantPopUp: ElementRef;
  @ViewChild('mailPopUp', { static: false }) mailPopUp: ElementRef;
  @ViewChild('deleteImagepop', { static: false }) deleteImagepop: ElementRef;
  @ViewChild('contactorDetailsPopUp', { static: false }) contactorDetailsPopUp: ElementRef;
  @ViewChild('descriptionPopup', { static: false }) descriptionPopup: ElementRef;

  public applicationId: any;
  public lat = 40.730610;
  public long = -73.935242;
  certificates: any = new Subject<any>();
  public currentUser = {
    role_id: null,
    department: null,
    email: null
  }
  public allMails = []
  public env: any
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
    this.env = environment;
    this.route.queryParams.subscribe(data => {
      this.applicationId = data.id;
    })
    this.permitDetails()
    this.getUserInfo();
    this.onInIt();
  }

  onInIt() {
    // this.completeIncompletCon()
    this.inspectionFormControl();
    this.applicantControl();
    this.mailControl();
    this.projectDescriptionControl()
    this.description()
  }

  description() {
    this.editDescriptionForm = this.FB.group({
      description: [''],
    })
  }

  fillDescriptionForm() {
    if (this.applicationDetails && this.applicationDetails.project_detail) {
      this.editDescriptionForm.controls.description.setValue(this.applicationDetails.project_detail.description)
    }
  }

  editDescription() {
    this.applicationService.editDescription(this.editDescriptionForm.value, this.applicationId).subscribe(data => {
      this.descriptionPopup.nativeElement.click();
      this.permitDetails();
      this.toasterService.success('Application description updated');
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
  get projectCon() { return this.projectDescriptionForm.controls }


  // completeIncompletCon() {
  //   this.completIncompletForm = this.FB.group({
  //     decision: ['', Validators.required],
  //     message: [''],
  //     to: [''],
  //     cc: [''],
  //   })
  // }
  mailControl() {
    this.sendEmialForm = this.FB.group({
      cc: [''],
      to: ['', Validators.required],
      subject: ['', Validators.required],
      description: ['', Validators.required],
    })
  }

  get mailCon() { return this.sendEmialForm.controls }

  inspectionFormControl() {
    this.inspectionForm = this.FB.group({
      decision: ['', Validators.required],
      type: ['', Validators.required],
      date: ['', Validators.required],
      amount: [''],
      remark: [''],
    })
  }

  applicantControl() {
    this.applicantForm = this.FB.group({
      applicant_name: ['', Validators.required],
      applicant_role: ['', Validators.required],
      applicant_phone: ['', Validators.required],
      applicant_address: ['', Validators.required],
    })
  }
  get applicant() { return this.applicantForm.controls };


  get inspection() { return this.inspectionForm.controls };
  // get clerkCon() { return this.completIncompletForm.controls }

  permitDetails() {
    
    this.applicationService.getApplicationDetails(this.applicationId).subscribe(data => {

      this.applicationDetails = data.response;
      if (this.applicationDetails.applicant_details) {
        this.allMails.push(this.applicationDetails.applicant_details.applicant_email)

      }
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

  // public isAccept = false;
  // public isCompletApplication = false;
  // accepetOrDeclineApplication() {
  //   if (this.completIncompletForm.invalid) {
  //     this.isAccept = true
  //     return false
  //   }

  //   this.completIncompletForm.value.application_id = this.applicationId
  //   this.applicationService.acceptApplicationByClerk(this.completIncompletForm.value).subscribe(data => {
  //     this.permitDetails();
  //     this.completIncompletForm.reset();
  //     this.isCompletApplication = false;
  //     this.toasterService.success('Application has been accepted');
  //   }, error => {
  //     console.log(error)
  //   })
  // }

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

  // changeDecision(value) {
  //   if (value == 1) {
  //     this.isCompletApplication = true
  //   }
  //   else if (value == 2) {
  //     this.isCompletApplication = false
  //   }
  // }


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
  public message: any
  receiveMessage(event) {
    this.message = event
    this.isDwonArrow = true;
    this.isSubmition = false;
    this.ngOnInit();
  }

  addApplicant() {
    this.applicantForm.value.applicant_type = this.applicantForm.value.applicant_role
    this.applicationService.applicantUpdate(this.applicantForm.value, this.applicationDetails.id).subscribe(data => {
      this.applicantPopUp.nativeElement.click();
      this.toasterService.success('Applicant  details have been updated')
      this.permitDetails()
    })
  }

  fillApplicant() {

    this.applicantForm.controls.applicant_name.setValue(this.applicationDetails.applicant_details && this.applicationDetails.applicant_details.applicant_name);
    this.applicantForm.controls.applicant_role.setValue(this.applicationDetails.applicant_details && this.applicationDetails.applicant_details.applicant_role)
    this.applicantForm.controls.applicant_address.setValue(this.applicationDetails.applicant_details && this.applicationDetails.applicant_details.applicant_address)
    this.applicantForm.controls.applicant_phone.setValue(this.applicationDetails.applicant_details && this.applicationDetails.applicant_details.applicant_phone)

  }

  mediaDocuments(event1) {
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
      this.permitDetails();
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
  public document: any;
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
      // this.getReletedPermit();
      this.permitDetails()
    })
  }

  public isDescription = false;
  saveProjectDescription() {
    this.projectDescriptionForm.controls.dig_safely_no.setErrors(null);
    this.projectDescriptionForm.controls.traffic_control.setErrors(null);
    this.projectDescriptionForm.controls.length.setErrors(null);
    this.projectDescriptionForm.controls.width.setErrors(null);
    this.projectDescriptionForm.controls.depth.setErrors(null);
    this.projectDescriptionForm.controls.opening_size.setErrors(null);
    this.projectDescriptionForm.controls.layout_number.setErrors(null);
    this.projectDescriptionForm.controls.gas_leak_number.setErrors(null);
    this.projectDescriptionForm.controls.opening_number.setErrors(null);
    this.projectDescriptionForm.controls.description.setErrors(null);
    this.projectDescriptionForm.controls.is_notifiable.setErrors(null);
    this.projectDescriptionForm.controls.start_date.setErrors(null);
    this.projectDescriptionForm.controls.end_date.setErrors(null);
    if (this.projectDescriptionForm.invalid) {
      this.isDescription = true
      return false
    }
    this.projectDescriptionForm.value.is_notifiable = 1
    this.applicationService.saveProjectInfo(this.projectDescriptionForm.value, this.applicationDetails.id).subscribe(data => {
      this.toasterService.success('Information Updated')
      this.contactorDetailsPopUp.nativeElement.click();
      this.permitDetails()

    })
  }


  public isShowMoreAndLess = false;
  showMoreAndShowLess(value) {
    this.isShowMoreAndLess = value
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

  canclePopUp(){
    this.deleteImagepop.nativeElement.click();
  }
}
