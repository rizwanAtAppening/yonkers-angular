import { Component, Output, OnInit, EventEmitter, Input, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { ApplicationService } from 'src/app/core/services/admin/application.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { appToaster, settingConfig } from 'src/app/configs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-inspections',
  templateUrl: './inspections.component.html',
  styleUrls: ['./inspections.component.css']
})
export class InspectionsComponent implements OnInit {
  public applicationDetails: any;
  public settings: any;
  @ViewChild('mediaUploadPopUp', { static: false }) mediaUploadPopUp: ElementRef;

  @Output() messageEvent = new EventEmitter<string>();
  @Input() certificatesChild: Observable<any>;
  public inspectionForm: FormGroup
  constructor(
    private applicationService: ApplicationService,
    private ts: ToastrService,
    private fb: FormBuilder
  ) {
    this.settings = settingConfig;

  }

  ngOnInit(): void {
    this.certificatesChild.subscribe(data => {
      this.applicationDetails = data;
      if (this.applicationDetails) {
        this.selectSpecialCondition();
      }
    });
    this.onInIt()
  }
  onInIt() {
    this.inspectionFormControl();
  }

  inspectionFormControl() {
    this.inspectionForm = this.fb.group({
      decision: ['', Validators.required],
      type: ['', Validators.required],
      date: ['', Validators.required],
      amount: [''],
      remark: [''],
    })
  }

  get inspection() { return this.inspectionForm.controls };

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
      this.messageEvent.emit(this.message);
    })
  }

  getInspection() {
    this.applicationService.getInspection().subscribe(data => {

    })
  }
  message: string = "Hola Mundo!"
  voidInspection(id) {
    const data = {
      id: id,
      application_id: this.applicationDetails.id,
    }
    this.applicationService.voidInspection(data).subscribe(data => {
      this.ts.success('Inspection Void')
      this.messageEvent.emit(this.message);

    })
  }

  public isDwonArrow = false;
  arrowRighDwon(value) {
    this.messageEvent.emit('inspection')
    this.applicationDetails.isInspection = !value
  }

  public specialCondition = []
  selectSpecialCondition() {
    this.applicationService.selectSpecialCondition(this.applicationDetails.id).subscribe(data => {
      this.specialCondition = data.response.special_conditions;
      // Object.keys
      // this.specialCondition = this.specialCondition.map(data=>{
      //   return data.special_conditions
      //  })
    })
  }

  public
  submitSpecialCondition(value) {
    debugger
    this.settings.inspection_type.map(data => {
      if (data.key == value.key) {
        this.inspectionForm.controls.type.setValue(value.key)
      }
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


  }


  goToLink() {
    window.open(this.image, "_blank");
  }
  submitImage() {
    this.mediaUploadPopUp.nativeElement.click();
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



}
