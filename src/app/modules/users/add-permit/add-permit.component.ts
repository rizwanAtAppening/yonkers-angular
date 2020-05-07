import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { PermitService } from 'src/app/core/services/users/permit.service';
import { appToaster, settingConfig } from 'src/app/configs';

@Component({
  selector: 'app-add-permit',
  templateUrl: './add-permit.component.html',
  styleUrls: ['./add-permit.component.css']
})
export class AddPermitComponent implements OnInit {
  public permitForm: FormGroup;
  public settings: any;

  constructor(
    private fb: FormBuilder,
    private permitService: PermitService,
  ) {
    this.settings = settingConfig;

  }

  ngOnInit(): void {
    this.onInIt()
  }


  onInIt() {
    this.pemitFormControl()
  }

  public location_type:any = 1
  selectAddress(value: string) {
    if (value == 'location') {
      this.location_type = 2
    } else {
      this.location_type = 1

    }

  }

  pemitFormControl() {
    this.permitForm = this.fb.group({
      type: ['', Validators.required],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      description: ['', Validators.required],
      address_id: ['', Validators.required],
      layout: ['', Validators.required],
      length: ['', Validators.required],
      width: ['', Validators.required],
      purpose: ['', Validators.required],
      also_know_as: [],
      traffic: ['', Validators.required],



      addlocation: this.fb.array([
        this.addLocationFormGroup(),
      ])
    })
  }
  get permiControl() { return this.permitForm.controls }

  addLocationFormGroup(): FormGroup {
    return this.fb.group({
      street_one: ['', Validators.required],
      street_two: ['', Validators.required],
      address_join: ['', Validators.required]
    })
  }

  get addLocationControls() {
    return this.permitForm.controls.addlocation as FormArray;
  }

  addLocationForm(): void {
    debugger
    this.addLocationControls.push(this.addLocationFormGroup())
  }
  get addCon() {
    return this.permitForm.controls.addlocation;

  }

  remove(index) {
    debugger

    this.addLocationControls.controls.map((data, i) => {
      if (index == i) {
        this.addLocationControls.controls.splice(i, i);
        data['controls'].street_one.setErrors(null)
        data['controls'].street_two.setErrors(null)
        data['controls'].address_join.setErrors(null)

        this.addLocationControls.value.splice(i, i)

      }
    })
  }


  public isPermit = false
  addPermitApplication() {
    debugger
    const data = {

    }
    if (this.location_type == 2) {
     // this.permitForm.value.locations = this.permitForm.value.addlocation
      this.permitForm.value.address_id = null

      this.permitForm.controls.address_id.setErrors(null)
    }
    else if (this.location_type == 1) {
      this.addLocationControls.controls.map((value, i) => {
        value['controls'].street_one.setErrors(null)
      })
    }
    if (this.permitForm.invalid) {
      this.isPermit = true
      return false;

    }
    this.permitForm.value.location_type = this.location_type
    var formData = new FormData();
    formData.append(
          "name",
          this.name
    
        );
        formData.append(
          "type",
          this.permitForm.value.type
        ); 
        formData.append(
          "start_date",
          this.permitForm.value.start_date
        ); 
        formData.append(
          "end_date",
          this.permitForm.value.end_date
        );  formData.append(
          "description",
          this.permitForm.value.description
        );  formData.append(
          "address_id",
          this.permitForm.value.address_id
        );  formData.append(
          "layout",
          this.permitForm.value.layout
        );  formData.append(
          "length",
          this.permitForm.value.length
        );  formData.append(
          "width",
          this.permitForm.value.width
        );  formData.append(
          "purpose",
          this.permitForm.value.purpose
        ); 
        formData.append(
          "also_know_as",
          this.permitForm.value.also_know_as
        ); formData.append(
          "traffic",
          this.permitForm.value.traffic
        ); formData.append(
          "location_type",
          this.location_type
        ); 
        formData.append(
          "locations",
          this.permitForm.value.addlocation
        ); 
       // Object.keys(f)
    this.permitService.addDwlPemitApplication(formData).subscribe(data => {
      this.isPermit = false
      this.permitForm.reset();
    })
  }
  public imageType: number = 1
  selectImageType(value) {
    debugger
    this.imageType = Number(value)
  }

  public allImage = [{}]
  addMoreImage() {
    this.allImage.push({})
  }

  deleteImage(index) {
    this.allImage.map((data, i) => {
      if (i == index) {
        this.allImage.splice(i, 1)
      }
    })
  }

  public imageName: any;
  public attachment: any
  public fileType: any
  public licenseFile: any
  public image: any
  public name:any =  []
  media(event1) {
    debugger
    this.imageName = event1.target.files[0].name;
    this.attachment = event1.target.files[0]
    this.name.push({ name: this.attachment, type: this.imageType })
    console.log(this.name)
    var reader = new FileReader();
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.image = event.target.result;
    };
    reader.readAsDataURL(event1.target.files[0]);
    console.log(this.image)
    console.log(event1.target.files[0])

  }

  //(change)="media($event)"
  // uploadImageAndDocuments() {
  //   const applicationId = this.permitService.getApplicationID()
  //   // let id = (this.certificateDetail.id)
  //   var formData = new FormData();
  //   formData.append(
  //     "name",
  //     this.attachment

  //   );
  //   formData.append(
  //     "type",
  //     this.fileType

  //   );
  //   formData.append(
  //     "application_id",
  //     applicationId,

  //   );
  //   this.permitService.uploadImage(formData).subscribe(data => {
  //     console.log(data)
  //     //this.getApplication()
  //   })
  // }

}
