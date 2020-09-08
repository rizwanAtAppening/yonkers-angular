import { Component, Output, OnInit, EventEmitter, Input, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { ApplicationService } from 'src/app/core/services/admin/application.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { appToaster, settingConfig } from 'src/app/configs';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';

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
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.settings = settingConfig;

  }

  public inspectionId: any;
  ngOnInit(): void {
    this.certificatesChild.subscribe(data => {
      this.applicationDetails = data;
      // this.route.queryParams.subscribe(data => {
      //   this.inspectionId = data.inspectionId;

      // })
      this.inspections = (this.applicationDetails.inspections);
     // if (this.inspectionId) {
      //   if (this.inspections.length > 0) {
      //     this.inspections.map(data => {
      //       if (data.id == this.inspectionId) {
      //         this.fillInspectionDetails(data);
      //       }
      //     })
      //   }
      // }
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
    this.uploadImage();
  }

  uploadImage() {
    this.imageUpload = this.fb.group({
      name: ['', Validators.required]
    })
  }

  get imageControls() { return this.imageUpload.controls }

  inspectionFormControl() {
    this.inspectionForm = this.fb.group({
      decision: ['', Validators.required],
      type: ['', Validators.required],
      date: ['', Validators.required],
      amount: [''],
      remark: [''],
    })
  }

  // fillInspectionDetails(inspectionDetails) {
    
  //   this.allImage = []
  //   this.inspectionForm.controls.decision.setValue(inspectionDetails.decision);
  //   this.inspectionForm.controls.type.setValue(inspectionDetails.type);
  //   this.inspectionForm.controls.date.setValue(new Date(inspectionDetails.date));
  //   this.inspectionForm.controls.amount.setValue(inspectionDetails.fee);
  //   this.inspectionForm.controls.remark.setValue(inspectionDetails.remark);
  //   var data = JSON.parse(inspectionDetails.document)
  //   if (data.length == 1) {
  //     this.allImage.push({ id: this.id, image: data[0].document })
  //   } else {
  //     data.map(value => {
  //       this.newId = this.id + 1
  //       this.id = this.newId
  //       this.allImage.push({ id: this.id, image: value.document })
  //     })


  //   }
  //   // this.allImage = data;

  // }

  get inspection() { return this.inspectionForm.controls };

  public isInspection = false;
  addInspections() {

    if (this.inspectionForm.invalid) {
      this.isInspection = true;
      return true
    }
    const data = {

    }
    // this.documents.forEach((data, i) => {
    //   this.formData.append('documents[' + i + '][name]', data.name)
    //   this.formData.append('documents[' + i + '][document]', data.document)

    // })
    if (this.inspectionId) {
      this.formData.append('id', this.inspectionId)
    }
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
      if (this.inspectionId) {
        this.router.navigate(['/admin/permit/permitDetails'], { queryParams: { id: this.applicationDetails.id } })
      }
    }, error => {
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
      if (data.response != null) {
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
  public documents = []
  media(event1) {

    
    // if (this.imageUpload.invalid) {
    //   this.isImage = true
    //   return false
    // }

    //if (this.imageUpload.value.name != '' && this.imageUpload.value.name != null) {
      this.imageName = event1.target.files[0].name;
      this.attachment = event1.target.files[0];
     // this.documents.push({ name: this.imageUpload.value.name, document: this.attachment })
      console.log(this.documents)
      var reader = new FileReader();
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.image = event.target.result;
      };
      reader.readAsDataURL(this.attachment);
    // } else {
    //   this.ts.error('Please enter name then upload image');

    // }



  }



  submitImage() {
    
    if (this.imageName) {
      if (this.allImage.length == 0) {
        this.allImage.push({ id: this.id, name: this.imageUpload.value.name, image: this.imageName })
      } else {
        this.newId = this.id + 1
        this.id = this.newId
        this.allImage.push({ id: this.id, name: this.imageUpload.value.name, image: this.imageName })

      }
      this.imageUpload.reset();

        this.formData.append('document', this.attachment)
      this.imageName = null;
      this.attachment = null;
      this.image = null
      var reader = new FileReader();
      var reader = new FileReader();
      this.mediaUploadPopUp.nativeElement.click();

      reader.onload = (event: any) => {
        this.image = event.target.result;
      };
      reader.readAsDataURL(this.attachment);

    } else {
      this.ts.error('Please select image');
    }



    // this.isImage = false
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

      this.documents.map((data, i) => {
        if (data.id == value.id) {
          this.documents.splice(i, 1)
        }
      })
    }

  }


  cancelImage() {
    this.imageName = null;
    this.attachment = null;
    this.image = null
    this.mediaUploadPopUp.nativeElement.click();

    // if (value) {
    //   this.allImage.map((data, i) => {
    //     if (data.id == value.id) {
    //       this.allImage.splice(i, 1)
    //     }
    //   })
    // }
  }



}
