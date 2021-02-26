import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { appToaster, settingConfig } from 'src/app/configs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApplicationService } from 'src/app/core/services/admin/application.service';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-permit-decisions',
  templateUrl: './permit-decisions.component.html',
  styleUrls: ['./permit-decisions.component.css']
})
export class PermitDecisionsComponent implements OnInit {
  @Input() certificatesChild: Observable<any>;
  @Output() messageEvent = new EventEmitter<string>();
  term: string;
  public applicationDetails: any;
  public settings: any;
  public desicionForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private adminAuthService: AuthenticationService,
    private applicationService: ApplicationService,
    private _TS: ToastrService
  ) {
    this.settings = settingConfig;
  }

  ngOnInit(): void {

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
      inspector: ['', Validators.required],
      remarks: [''],
      expiration_days: ['', Validators.required],
    })
  }

  public id: any;
  editDecision(value) {
    if (value) {
      this.id = value.id
      this.desicionForm.controls.permit_decision.setValue(0);
      this.desicionForm.controls.expiration_date.setValue(new Date(value.expiration_date))
      this.desicionForm.controls.inspector.setValue(value.inspector)
      this.desicionForm.controls.expiration_days.setValue(value.expiration_days)
      this.desicionForm.controls.remarks.setValue(value.remark)

    }
  }

  get desicion() { return this.desicionForm.controls };

  testArray = [{ point: 'hrhk' }, { point: 'hrhk1' }]
  public isDecision = false;
  public data: any;
  decision() {

    if (this.desicionForm.invalid) {
      this.isDecision = true
      return false
    }
    if (this.id) {
      this.data = {
        special_conditions: this.special_conditions,
        inspector: this.desicionForm.value.inspector,
        permit_decision: this.desicionForm.value.permit_decision,
        application_id: this.applicationDetails.id,
        expiration_date: this.desicionForm.value.expiration_date,
        remark: this.desicionForm.value.remarks,
        id: (this.id ? this.id : null),
        expiration_days: this.desicionForm.value.expiration_days,
      }
    }
    else {
      this.data = {
        special_conditions: this.special_conditions,
        inspector: this.desicionForm.value.inspector,
        permit_decision: this.desicionForm.value.permit_decision,
        application_id: this.applicationDetails.id,
        expiration_date: this.desicionForm.value.expiration_date,
        remark: this.desicionForm.value.remarks,
        expiration_days: this.desicionForm.value.expiration_days,
      }
    }

    this.applicationService.addDecision(this.data).subscribe(data => {
      console.log(data);
      this.desicionForm.reset()
      this.settings.conditions.map((data, i) => {
        data.isChecked = false
      })
      this.special_conditions = []
      this.messageEvent.emit(this.message);

    }, error => {
      this.settings.conditions.map((data, i) => {
        data.isChecked = false
      })
      this.special_conditions = []
      this.desicionForm.reset()
    })
  }


  public inspector = []
  getInspector() {

    this.applicationService.getInspector().subscribe(data => {
      this.inspector = data.response;
    })
  }

  public special_conditions = []
  addCondition(event, value) {

    if (event.target.checked) {
      this.settings.conditions.map((data, i) => {
        if (value.key == data.key) {
          data.isChecked = true
        }
      })
      this.special_conditions.push({ point: value.value, key: value.key, isChecked: true, status: value.status })

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

  arrowRighDwon(value) {
    this.messageEvent.emit('decision')
    this.applicationDetails['isDecision'] = !value
  }
  public actualValue: number;
  public currentDate;
  public currentYear;
  public currntMonth;
  public dayMonthYearName: string
  getDay(value) {

    this.currentDate = new Date()
    this.settings.days.map(data => {
      if (data.key == value) {
        this.actualValue = data.actualValue,
          this.dayMonthYearName = data.name;
      }
    })
    if (this.dayMonthYearName == 'days') {
      this.currentDate.setDate(this.currentDate.getDate() + this.actualValue);
      this.desicionForm.controls.expiration_date.setValue(this.currentDate)
      console.log(this.currentDate)

    }
    else if (this.dayMonthYearName == 'months') {
      this.currentDate.setMonth(this.currentDate.getMonth() + this.actualValue);
      this.desicionForm.controls.expiration_date.setValue(this.currentDate)


    } else if (this.dayMonthYearName == 'years') {
      this.currentDate.setFullYear(this.currentDate.getFullYear() + this.actualValue);
      this.desicionForm.controls.expiration_date.setValue(this.currentDate)

    }

  }

  voidDecision(id) {
    const data = {
      id: id,
      application_id: this.applicationDetails.id
    }
    this.applicationService.voidEngDecision(data).subscribe(data => {
      this._TS.success('Decision have voided')
    })
  }

  unCheacked() {
    this.settings?.conditions.forEach(condititon => {
      condititon.isChecked = false;
      this.special_conditions = []
    })
  }
}
