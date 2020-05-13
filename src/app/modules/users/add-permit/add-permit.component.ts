import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { PermitService } from 'src/app/core/services/users/permit.service';
import { appToaster, settingConfig } from 'src/app/configs';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-permit',
  templateUrl: './add-permit.component.html',
  styleUrls: ['./add-permit.component.css']
})
export class AddPermitComponent implements OnInit {
  public permitForm: FormGroup;
  public settings: any;
  public applicationId: any;
  public dwlType: any;
  constructor(
    private fb: FormBuilder,
    private permitService: PermitService,
    private router: Router,
    private toasterService: ToastrService,
    private route: ActivatedRoute,
  ) {
    this.settings = settingConfig;

  }

  ngOnInit(): void {
    debugger
    this.onInIt()
    this.getPermitApplication();
    this.route.queryParams.subscribe(data => {
      this.applicationId = data.id,
        this.id = data.id;
      this.dwlType = data.type;
      if (this.dwlType) {
        localStorage.setItem('dwlType', this.dwlType);
      }
      if (this.applicationId) {
        this.getApplication()
      }
    })
  }


  onInIt() {
    this.pemitFormControl()
  }

  public location_type: any = 1
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
      traffic_control: ['', Validators.required],



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

    this.addLocationControls.push(this.addLocationFormGroup())
  }
  get addCon() {
    return this.permitForm.controls.addlocation;

  }

  remove(index) {


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

    const data = {

    }
    if (this.location_type == 2) {
      this.permitForm.value.locations = this.permitForm.value.addlocation
      this.permitForm.value.address_id = null

      this.permitForm.controls.address_id.setErrors(null)
    }
    else if (this.location_type == 1) {
      this.addLocationControls.controls.map((value, i) => {
        value['controls'].street_one.setErrors(null)
        value['controls'].address_join.setErrors(null)
        value['controls'].street_two.setErrors(null)

      })
      // this.addLocationControls.controls.map((value, i) => {
      //   value['controls'].address_join.setErrors(null)
      // })
      // this.addLocationControls.controls.map((value, i) => {
      //   value['controls'].street_two.setErrors(null)
      // })
    }
    if (this.permitForm.invalid) {
      this.isPermit = true
      return false;

    }
    if (this.id) {
      this.permitForm.value.id = this.id
    }
    this.permitForm.value.location_type = this.location_type
    this.permitForm.value.layout_number = this.permitForm.value.layout
    this.permitForm.value.permit_type = 1
    var formData = new FormData();
    if (this.location_type == 2) {
      // formData.append(
      //   "name",
      //   // JSON.stringify(this.name)

      //   new Blob(this.name)
      // );
      //   for(let i =0; i < files.length; i++){
      //     formData.append("uploads[]", files[i], files[i]['name']);
      // }
      // name:[{name:'',}]

      if (this.name.length > 0) {
        formData.append(
          "name",
          new Blob(this.name)
        );
      }
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
      ); formData.append(
        "description",
        this.permitForm.value.description
        // );  formData.append(
        //   "address_id",
        // (this.permitForm.value.address_id)
      ); formData.append(
        "layout_number",
        this.permitForm.value.layout
      ); formData.append(
        "length",
        this.permitForm.value.length
      ); formData.append(
        "width",
        this.permitForm.value.width
      ); formData.append(
        "purpose",
        this.permitForm.value.purpose
      );
      formData.append(
        "also_know_as",
        this.permitForm.value.also_know_as
      ); formData.append(
        "traffic_control",
        this.permitForm.value.traffic_control
      ); formData.append(
        "location_type",
        this.location_type
      );
      formData.append(
        "locations",
        JSON.stringify(this.permitForm.value.addlocation),
      );
      formData.append(
        "imageType",
        this.imageType,
      );


    } else if (this.location_type == 1) {
      if (this.name.length > 0) {
        formData.append(
          "name",
          new Blob(this.name)
        );
      }

      //   for(let i =0; i < files.length; i++){
      //     formData.append("uploads[]", files[i], files[i]['name']);
      // }
      // name:[{name:'',}]


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
      ); formData.append(
        "description",
        this.permitForm.value.description
      ); formData.append(
        "address_id",
        (this.permitForm.value.address_id)
      ); formData.append(
        "layout_number",
        this.permitForm.value.layout
      ); formData.append(
        "length",
        this.permitForm.value.length
      ); formData.append(
        "width",
        this.permitForm.value.width
      ); formData.append(
        "purpose",
        this.permitForm.value.purpose
      );
      formData.append(
        "also_know_as",
        this.permitForm.value.also_know_as
      ); formData.append(
        "traffic_control",
        this.permitForm.value.traffic_control
      ); formData.append(
        "location_type",
        this.location_type
      );

      formData.append(
        "imageType",
        this.imageType,
      );


    }

    // this.permitForm.value.addlocation.map(data=>{
    //   formData.append('locations',JSON.stringify(data))
    // })
    // Object.keys(f)
    this.permitService.addDwlPemitApplication(this.permitForm.value).subscribe(data => {
      this.peritApplication = (data.response)
      this.getPermitApplication();
      if(this.applicationId){
        this.submitDailyWorkLocation();
      }
      this.isPermit = false
      this.permitForm.reset();
    })
  }

  public peritApplication = []
  public imageType: any = 1
  selectImageType(value) {

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
  public name: any = []
  media(event1) {

    this.imageName = event1.target.files[0].name;
    this.attachment = event1.target.files[0]
    this.name.push({ name: (this.attachment), type: this.imageType })
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

  public applictionDetails = []
  application_type: number = 1
  // currentPage = 1
  public dwlApplication = []
  getPermitApplication() {

    this.permitService.getPermitApplication({ application_type: this.application_type }).subscribe(data => {
      this.applictionDetails = data.response;
      this.dwlApplication = this.applictionDetails.filter(data => {
        if (data.status == null && data.application_type == 1) {
          data.isSingleAddress = true
          return data
        }

      })
      console.log(this.dwlApplication)

    })
  }

  public submitApplication = {}
  public updateValueDwl = []
  submitDailyWorkLocation() {
    debugger
    if(this.applicationId){
      this.updateValueDwl = [{id:this.applicationId}]
      this.submitApplication = {
        application:this.updateValueDwl
      }
    }
    else{
      this.submitApplication = {
        application: this.dwlApplication
      }
    }
    this.permitService.submitDailyWorkLocation(this.submitApplication).subscribe(data => {
      console.log(data)
      this.router.navigate(['/dashboard/permit'])

    })
  }

  

  public id: number
  public dwl_id: number
  editAppliction(value) {
    this.location_type = 2
    this.id = value.id;
    if (value.application_daily_work_location && value.application_daily_work_location.id)
      this.dwl_id = value.application_daily_work_location.id
    if (this.location_type == 2) {
      if (value.location.length > 1) {
        for (let index = 0; index < value.location.length - 1; index++) {
          if (value.location.length != this.addLocationControls.value.length) {
            this.addLocationControls.push(this.addLocationFormGroup())
          }
          value.location.map((data, i) => {
            this.addLocationControls.controls.map((value, j) => {
              if (i == j) {
                value['controls'].street_one.setValue(data.street_one)
                value['controls'].street_two.setValue(data.street_two)
                value['controls'].address_join.setValue(data.address_join)
              }
            })
          })

        }
      }
      else {
        value.location.map((data, i) => {
          this.addLocationControls.controls.map((value, j) => {
            if (i == j) {
              value['controls'].street_one.setValue(data.street_one)
              value['controls'].street_two.setValue(data.street_two)
              value['controls'].address_join.setValue(data.address_join)
            }
          })
        })
      }

      this.permitForm.controls.type.setValue(value.type);
      this.permitForm.controls.start_date.setValue(new Date(value.project_detail.start_date));
      this.permitForm.controls.end_date.setValue(new Date(value.project_detail.end_date));
      this.permitForm.controls.description.setValue(value.project_detail.description);
      this.permitForm.controls.layout.setValue(value.project_detail.layout_number);
      this.permitForm.controls.length.setValue(value.project_detail.length);
      this.permitForm.controls.width.setValue(value.project_detail.width);
      this.permitForm.controls.purpose.setValue(value.project_detail.purpose);
      this.permitForm.controls.also_know_as.setValue(value.also_know_as);
      this.permitForm.controls.traffic_control.setValue(value.project_detail.traffic_control);
    }
    else if (this.location_type == 1) {

      this.permitForm.controls.address_id.setValue(value.address_id);
      this.permitForm.controls.type.setValue(value.type);
      this.permitForm.controls.start_date.setValue(new Date(value.project_detail.start_date));
      this.permitForm.controls.end_date.setValue(new Date(value.project_detail.end_date));
      this.permitForm.controls.description.setValue(value.project_detail.description);
      this.permitForm.controls.layout.setValue(value.project_detail.layout_number);
      this.permitForm.controls.length.setValue(value.project_detail.length);
      this.permitForm.controls.width.setValue(value.project_detail.width);
      this.permitForm.controls.purpose.setValue(value.project_detail.purpose);
      this.permitForm.controls.also_know_as.setValue(value.also_know_as);
      this.permitForm.controls.traffic_control.setValue(value.project_detail.traffic_control);


    }
  }

  deleteApplication(id) {

    this.permitService.deleteDailyWorklocation(id).subscribe(data => {
      this.toasterService.success('Delete Succesfully');
      this.getPermitApplication()
    })
  }

  showMoreLocation(value, id) {
    debugger
    this.dwlApplication.map(data => {
      if (data.id == id && data.status == null && data.application_type == 1) {
        data.isSingleAddress = value

      } else {
        data.isSingleAddress = !value

      }
    })

  }


  public layOutData: any;
  fillDataByLayOutNumber() {
    debugger
    const value = this.permitForm.value.layout
    this.permitService.getDetailByLayOutNumber({ layout: value }).subscribe(data => {
      this.layOutData = data.response;
      this.location(this.layOutData)
    })
  }

  location(value) {
    this.layOutData = value
    if (this.layOutData) {
      if (this.layOutData.location_type) {
        this.location_type = this.layOutData.location_type;
      }
      this.permitForm.controls.type.setValue(this.layOutData.type)
      if (this.layOutData.project_detail) {
        this.permitForm.controls.length.setValue(this.layOutData.project_detail.length)
        this.permitForm.controls.width.setValue(this.layOutData.project_detail.width)
        this.permitForm.controls.purpose.setValue(this.layOutData.project_detail.purpose)
        this.permitForm.controls.start_date.setValue(new Date(this.layOutData.project_detail.start_date))
        this.permitForm.controls.end_date.setValue(new Date(this.layOutData.project_detail.end_date))
        this.permitForm.controls.traffic_control.setValue(this.layOutData.project_detail.traffic_control)
        this.permitForm.controls.layout.setValue(this.layOutData.project_detail.layout_number)
        this.permitForm.controls.description.setValue(this.layOutData.project_detail.description)
      }

      this.permitForm.controls.also_know_as.setValue(this.layOutData.also_know_as)
      if (this.location_type == 2) {
        if (this.layOutData.location.length > 1) {
          for (let index = 0; index < this.layOutData.location.length - 1; index++) {
            if (this.layOutData.location.length != this.addLocationControls.value.length) {
              this.addLocationControls.push(this.addLocationFormGroup())
            }
            this.layOutData.location.map((data, i) => {
              this.addLocationControls.controls.map((value, j) => {
                if (i == j) {
                  value['controls'].street_one.setValue(data.street_one)
                  value['controls'].street_two.setValue(data.street_two)
                  value['controls'].address_join.setValue(data.address_join)
                }
              })
            })

          }
        }
        else {
          this.layOutData.location.map((data, i) => {
            this.addLocationControls.controls.map((value, j) => {
              if (i == j) {
                debugger
                value['controls'].street_one.setValue(data.street_one)
                value['controls'].street_two.setValue(data.street_two)
                value['controls'].address_join.setValue(data.address_join)
              }
            })
          })
        }
      } else {
        if (this.layOutData) {
          this.permitForm.controls.address_id.setValue(this.layOutData.address_id)

        }
      }

    } else {
      this.permitForm.controls.type.setValue(null)
      this.permitForm.controls.length.setValue(null)
      this.permitForm.controls.width.setValue(null)
      this.permitForm.controls.purpose.setValue(null)
      this.permitForm.controls.start_date.setValue(null)
      this.permitForm.controls.end_date.setValue(null)
      this.permitForm.controls.traffic_control.setValue(null)
      // this.permitForm.controls.layout.setValue(null)
      this.permitForm.controls.description.setValue(null)
      this.permitForm.controls.also_know_as.setValue(null)
      this.removeAnResetForm()
    }

  }

  removeAnResetForm() {

    // this.dwlForm.reset();
    if (this.addLocationControls.controls.length > 1) {
      this.addLocationControls.controls.map((data, i) => {
        this.remove(i);
        if (this.addLocationControls.controls.length == 1) {
          data['controls'].street_one.setValue(null)
          data['controls'].street_two.setValue(null)
          data['controls'].address_join.setValue(null)
          return false
        }
      })
    } else {
      this.addLocationControls.controls.map((data, i) => {
        if (this.addLocationControls.controls.length == 1) {
          data['controls'].street_one.setValue(null)
          data['controls'].street_two.setValue(null)
          data['controls'].address_join.setValue(null)
          return false
        }
      })
    }

  }

  public applicationDetail: any;
  getApplication() {
    debugger
    this.permitService.getApplicationById(this.applicationId).subscribe(data => {
      this.applicationDetail = data.response;
      if (this.applicationDetail.application_daily_work_location) {
        this.dwl_id = this.applicationDetail.application_daily_work_location.id
      }
      if (this.applicationDetail) {
        this.location(this.applicationDetail)
      }
    })
  }
}
