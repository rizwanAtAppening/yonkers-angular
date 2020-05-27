import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { appToaster, settingConfig } from 'src/app/configs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApplicationService } from 'src/app/core/services/admin/application.service';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';

@Component({
  selector: 'app-permit-decisions',
  templateUrl: './permit-decisions.component.html',
  styleUrls: ['./permit-decisions.component.css']
})
export class PermitDecisionsComponent implements OnInit {
  @Input() certificatesChild: Observable<any>;
  @Output() messageEvent = new EventEmitter<string>();

  public applicationDetails: any;
  public settings: any;
  public desicionForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private adminAuthService: AuthenticationService,
    private applicationService: ApplicationService
  ) {
    this.settings = settingConfig;
  }

  ngOnInit(): void {
    debugger
    this.certificatesChild.subscribe(data => {
      this.applicationDetails = data;
    })
    this.getInspector();
    this.getUserInfo()
    this.onInIt();
  }


  public currentUser = {
    role_id: null,
    department: null
  }
  getUserInfo() {
    debugger
    this.adminAuthService.getUserInfo().subscribe(data => {
      this.currentUser = data
    })
  }

  onInIt() {
    this.desicionControls();
  }

  desicionControls() {
    this.desicionForm = this.fb.group({
      permit_decision: ['', Validators.required],
      expiration_date: ['', Validators.required],
      inspector: [''],
      remarks: [''],
      day: [],
    })
  }

  public id:any;
  editDecision(value) {
    debugger
    if (value) {
      this.id = value.id
      this.desicionForm.controls.permit_decision.setValue(0);
      this.desicionForm.controls.expiration_date.setValue(new Date(value.expiration_date))
      this.desicionForm.controls.inspector.setValue(value.inspector)


    }
  }

  get desicion() { return this.desicionForm.controls };

  testArray = [{ point: 'hrhk' }, { point: 'hrhk1' }]
  public isDecision = false;
  public data:any;
  decision() {
    debugger
    if (this.desicionForm.invalid) {
      this.isDecision = true
      return false
    }
    if(this.id){
      this.data = {
        special_conditions: this.special_conditions,
        inspector: this.desicionForm.value.inspector,
        permit_decision: this.desicionForm.value.permit_decision,
        application_id: this.applicationDetails.id,
        expiration_date: this.desicionForm.value.expiration_date,
        remarks: this.desicionForm.value.remarks,
        id:(this.id?this.id:null)
      }
    }
    else{
      this.data = {
        special_conditions: this.special_conditions,
        inspector: this.desicionForm.value.inspector,
        permit_decision: this.desicionForm.value.permit_decision,
        application_id: this.applicationDetails.id,
        expiration_date: this.desicionForm.value.expiration_date,
        remarks: this.desicionForm.value.remarks,
      }
    }
   
    this.applicationService.addDecision(this.data).subscribe(data => {
      console.log(data);
      this.desicionForm.reset()
      this.messageEvent.emit(this.message);

    })
  }


  public inspector = []
  getInspector() {
    debugger
    this.applicationService.getInspector().subscribe(data => {
      this.inspector = data.response;
    })
  }

  public special_conditions = []
  addCondition(event, value) {
    debugger
    if (event.target.checked) {
      this.settings.conditions.map((data, i) => {
        if (value.key == data.key) {
          data.isChecked = true
        }
      })
      this.special_conditions.push({ point: value.value, key: value.key, isChecked: true })

    } else {
      if (this.special_conditions.length > 0) {
        this.special_conditions.map((data, i) => {
          if (value.key == data.key) {

            this.special_conditions.splice(i, 1)
          }
        })

        this.settings.conditions.map((data, i) => {
          if (value.key == data.key) {
            data.isChecked = false
          }
        })
      }
    }
  }

  message: string = "Hola Mundo!"
  sendMessage() {
    this.messageEvent.emit(this.message)
  }


}
