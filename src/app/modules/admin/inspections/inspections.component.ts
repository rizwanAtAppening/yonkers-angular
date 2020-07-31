import { Component, Output, OnInit, EventEmitter, Input, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { ApplicationService } from 'src/app/core/services/admin/application.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { appToaster, settingConfig } from 'src/app/configs';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

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
  public imageUpload: FormGroup
  public env: any
  public inspections = []
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
      
      this.inspections = (this.applicationDetails.inspections);
      if (this.inspections.length > 0) {
        this.inspections.map(data => {
          if (data.document != null)
            data.newDoc = JSON.parse(data.document)
          // console.log(data.document)
          return data;
        })
        console.log(this.inspections, '++++++++++++++++++++++++')
      }
      if (this.applicationDetails) {
        this.selectSpecialCondition();
      }
    });
    this.onInIt();
    this.env = environment;

  }
  onInIt() {
    this.formData = new FormData()
    this.inspectionFormControl();
    // this.uploadImage();
  }

  // uploadImage() {
  //   this.imageUpload = this.fb.group({
  //     imageName: ['', Validators.required]
  //   })
  // }

  //get imageCon() { return this.imageUpload.controls }

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
    //  var formData = new FormData();
    //formData.append('document', this.attachment)
    // this.formData.append('image', this.imageUpload.value.imageName)

    this.formData.append('application_id', this.applicationDetails.id)
    this.formData.append('decision', this.inspectionForm.value.decision)
    this.formData.append('fee', this.inspectionForm.value.amount)
    this.formData.append('type', this.inspectionForm.value.type)
    this.formData.append('date', this.inspectionForm.value.date)
    this.formData.append('remark', this.inspectionForm.value.remark)

    // this.inspectionForm.value.application_id = this.applicationDetails.id;
    // this.inspectionForm.value.decision = Number(this.inspectionForm.value.decision)
    // this.inspectionForm.value.fee = Number(this.inspectionForm.value.amount)

    this.applicationService.inspection(this.formData).subscribe(data => {
      this.inspectionForm.reset();
      this.isInspection = false
      this.formData = new FormData()
      this.allImage = []
      this.messageEvent.emit(this.message);
    },error=>{
      this.formData = new FormData()
      this.allImage = []

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
      if(data.response != null ){
        this.specialCondition = data.response.special_conditions;
      }
      // Object.keys
      // this.specialCondition = this.specialCondition.map(data=>{
      //   return data.special_conditions
      //  })
    })
  }

  public
  submitSpecialCondition(value) {

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
  public isImage = false
  public allImage = []
  public id: number = 1
  public newId: any
  media(event1) {


    // if (this.imageUpload.invalid) {
    //   this.isImage = true
    //   return false
    // }
    this.imageName = event1.target.files[0].name;
    this.attachment = event1.target.files[0];
    //this.id = 1
    if (this.allImage.length == 0) {
      this.allImage.push({ id: this.id, image: this.imageName })
    } else {
      this.newId = this.id + 1
      this.id = this.newId
      this.allImage.push({ id: this.id, image: this.imageName })

    }
    this.formData.append('document', this.attachment)

    var reader = new FileReader();
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.image = event.target.result;
    };
    reader.readAsDataURL(event1.target.files[0]);


  }

  // media(event1, index) {

  //   if (this.imageType != null) {
  //     this.imageName = event1.target.files[0].name;
  //     this.attachment = event1.target.files[0];
  //   //  this.formData = new FormData()
  //   if(this.imageType == 0){
  //     this.formData.append('drawing', this.attachment)

  //   }else{
  //     this.formData.append('certificate', this.attachment)

  //   }
  //     this.name.push({ name: (this.attachment), type: this.imageType })
  //   console.log(this.name)

  //     this.imageType = null

  //     console.log(this.name)
  //     var reader = new FileReader();
  //     var reader = new FileReader();
  //     reader.onload = (event: any) => {
  //       this.image = event.target.result;
  //     };
  //     reader.readAsDataURL(event1.target.files[0]);
  //     this.allImage.map((data: any, i) => {
  //       if (i == index) {
  //         data.imageName = this.imageName;
  //         data.image = this.image
  //       }
  //       console.log(this.allImage)
  //     })


  //   } else {
  //     this.toasterService.error('Please select type then upload image');
  //   }

  // }


  submitImage() {
    this.mediaUploadPopUp.nativeElement.click();
    this.imageName = null;
    this.attachment = null;
    this.image = null
    // this.imageUpload.controls.imageName.setValue(null);
    this.isImage = false
  }

  // deleteImage() {
  //   this.imageName = null;
  //   this.attachment = null;

  // }
  imageEmpty(value) {
    
    this.imageName = null;
    this.attachment = null;
    this.image = null
    if (value) {
      this.allImage.map((data, i) => {
        if (data.id == value.id) {
          this.allImage.splice(i, 1)
        }
      })
    }

  }



}
