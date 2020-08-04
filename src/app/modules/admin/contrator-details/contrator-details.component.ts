import { Component, Output, OnInit, EventEmitter, ElementRef, ViewChild, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ApplicationService } from 'src/app/core/services/admin/application.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { appToaster, settingConfig } from 'src/app/configs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contrator-details',
  templateUrl: './contrator-details.component.html',
  styleUrls: ['./contrator-details.component.css']
})
export class ContratorDetailsComponent implements OnInit {
  @ViewChild('licensePopUp', { static: false }) licensePopUp: ElementRef;
  @ViewChild('updateCon', { static: false }) updateCon: ElementRef;
  public EMAIL_REGEX = "[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*";

  public contractorForm: FormGroup
  public applicationDetails: any;
  public settings: any;
  @Output() messageEvent = new EventEmitter<string>();
  @Input() certificatesChild: Observable<any>;
  public inspectionForm: FormGroup;
  public licenseForm: FormGroup;
  public emailFormGroup: FormGroup;
  constructor(
    private applicationService: ApplicationService,
    private fb: FormBuilder,
    private TS: ToastrService
  ) {
    this.settings = settingConfig;

  }

  ngOnInit(): void {
    this.certificatesChild.subscribe(data => {
      this.applicationDetails = data;
      if (this.applicationDetails) {
        this.compareDate();
        this.emailFormGroup.controls.to.setValue(1);
        this.emailFormGroup.controls.from.setValue(1)

      }
    });
    this.onInIt();

  }


  compareDate() {
    var currentDate
    var date
    date = new Date()
    currentDate = date.toISOString();
    console.log(currentDate)
    if (this.applicationDetails && this.applicationDetails.license_details)
      this.applicationDetails.license_details.map(data => {
        if (currentDate > data.expiration_date) {
          data.isExpiry = true
        } else {
          data.isExpiry = false
        }
      })
    console.log(this.applicationDetails)
  }

  contractorFormControl() {
    this.contractorForm = this.fb.group({
      contractor_name: ['', Validators.required],
      contractor_lastname: ['', Validators.required],

      contractor_email: ['', [Validators.required, Validators.pattern(this.EMAIL_REGEX)]],
      contractor_business: ['', Validators.required],
      contractor_address: ['', Validators.required],
      contractor_phone: ['', Validators.required],
      contractor_city: ['', Validators.required],
      contractor_state: ['', Validators.required],
      contractor_zip: ['', Validators.required],
    })
  }

  get contrator() { return this.contractorForm.controls }
  fillContractorForm() {

    // this.contractorForm.controls.contractor_for_job.setValue(this.applicationDetails.contractor_details.contractor_for_job)
    this.contractorForm.controls.contractor_name.setValue(this.applicationDetails.contractor_details.contractor_name)
    this.contractorForm.controls.contractor_email.setValue(this.applicationDetails.contractor_details.contractor_email)
    this.contractorForm.controls.contractor_business.setValue(this.applicationDetails.contractor_details.contractor_business)
    this.contractorForm.controls.contractor_address.setValue(this.applicationDetails.contractor_details.contractor_address)
    this.contractorForm.controls.contractor_phone.setValue(this.applicationDetails.contractor_details.contractor_phone)
    this.contractorForm.controls.contractor_city.setValue(this.applicationDetails.contractor_details.contractor_city)
    this.contractorForm.controls.contractor_state.setValue(this.applicationDetails.contractor_details.contractor_state)
    this.contractorForm.controls.contractor_zip.setValue(this.applicationDetails.contractor_details.contractor_zip)
  }


  public isContractor = false;
  updateContratorDetails() {
    if (this.contractorForm.invalid) {
      this.isContractor = true
      return false
    }
    this.contractorForm.value.application_id = this.applicationDetails.id
    this.applicationService.updateContratorInfo(this.contractorForm.value).subscribe(data => {
      this.updateCon.nativeElement.click();
      this.messageEvent.emit('hello')
    })
  }

  onInIt() {
    this.licenseControl();
    this.contractorFormControl();
    this.emailControls();
    this.notes();
  }

  public notesFormGroup: FormGroup
  notes() {
    this.notesFormGroup = this.fb.group({
      note: ['', Validators.required]
    })
  }

  emailControls() {
    
    this.emailFormGroup = this.fb.group({
      to: ['', Validators.required],
      from: ['', Validators.required],
      subject: ['', Validators.required],
      body: ['', Validators.required],
      standard_message: ['', Validators.required],

    })
  }

  get emailPickUp() { return this.emailFormGroup.controls }
  get notesCon() { return this.notesFormGroup.controls }

  licenseControl() {
    this.licenseForm = this.fb.group({
      type: ['', Validators.required],
      license_number: ['', Validators.required],
      expiration_date: ['', Validators.required],
      municipality: ['', Validators.required],
    })
  }


  public licenseId: any
  editLicense(value) {

    this.licenseId = value.id
    this.licenseForm.controls.type.setValue(value.type)
    this.licenseForm.controls.license_number.setValue(value.license_number)
    this.licenseForm.controls.expiration_date.setValue(new Date(value.expiration_date))
    this.licenseForm.controls.municipality.setValue(value.municipality)


  }
  get licenseCon() { return this.licenseForm.controls }

  public isLicense = false
  addLicense() {

    if (this.licenseForm.invalid) {
      this.isLicense = true;
      return false
    }
    var formData = new FormData();
    formData.append(
      "name",
      this.attachment

    );
    formData.append(
      "type",
      this.licenseForm.value.type

    );
    formData.append(
      "license_number",
      this.licenseForm.value.license_number

    );
    formData.append(
      "expiration_date",
      this.licenseForm.value.expiration_date

    );
    formData.append(
      "municipality",
      this.licenseForm.value.municipality

    );
    formData.append(
      "application_id",
      this.applicationDetails.id

    );
    if (!this.licenseId) {
      this.applicationService.addLicenseDetails(formData).subscribe(data => {
        this.licenseForm.reset();
        this.TS.success('License added')
        this.licensePopUp.nativeElement.click();
        this.messageEvent.emit('hello')
        this.licenseId = null
      })
    } else {
      this.applicationService.updateLicenseDetails(formData, this.licenseId).subscribe(data => {
        this.licenseForm.reset();
        this.TS.success('License added')
        this.licensePopUp.nativeElement.click();
        this.messageEvent.emit('hello')
        this.licenseId = null
      })
    }

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


  }

  imageEmpty() {
    this.image = '';
  }

  arrowRighDwon(value) {
    this.messageEvent.emit('contractor')
    this.applicationDetails.isContractor = !value
  }

  arrowRighDwonEmial(value) {
    this.messageEvent.emit('email')
    this.applicationDetails.isEmail = !value
  }

  public isEmail = false;
  addEmialAndPickUp() {
    
    if (this.emailFormGroup.invalid) {
      this.isEmail = true
      return false
    }
    this.emailFormGroup.value.application_id = this.applicationDetails.id;
    this.emailFormGroup.value.to = this.applicationDetails.applicant_details.applicant_email;
    this.emailFormGroup.value.from = this.applicationDetails.contractor_details.contractor_email;

    this.applicationService.emailAndPickUp(this.emailFormGroup.value).subscribe(daa => {
      // this.emailFormGroup.controls.subject.setValue(null)
      // //this.emailFormGroup.controls.standard_message.setValue(null)
      // this.emailFormGroup.controls.body.setValue(null)
      this.emailFormGroup.reset()
       this.isEmail = false

      this.messageEvent.emit('hello')


    })
  }

  addNotes() {
    
    if (this.notesFormGroup.invalid) {
      return false
    }
    this.notesFormGroup.value.application_id = this.applicationDetails.id;
    this.applicationService.addNotes(this.notesFormGroup.value).subscribe(data => {
      this.notesFormGroup.reset();
      this.messageEvent.emit('hello')

    })
  }

}
