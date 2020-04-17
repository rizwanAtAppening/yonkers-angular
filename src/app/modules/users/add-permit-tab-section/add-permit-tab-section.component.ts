import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/core/services';
import { appToaster, settingConfig } from 'src/app/configs';
import { FormBuilder, FormGroup, Validators, FormArray, EmailValidator } from '@angular/forms';
import { PermitService } from 'src/app/core/services/users/permit.service';

@Component({
  selector: 'app-add-permit-tab-section',
  templateUrl: './add-permit-tab-section.component.html',
  styleUrls: ['./add-permit-tab-section.component.css']
})
export class AddPermitTabSectionComponent implements OnInit {
  public settings: any;
  public whatForm: FormGroup;
  public whereForm: FormGroup;
  public states: string[] = [
    'Alabama',
    'Alaska',
    'Arizona',
    'Arkansas',
    'California',
    'Colorado',
    'Connecticut',
    'Delaware',
    'shivam'
  ]

  public states1: string[] = [
    'Alabama',
    'Alaska',
    'Arizona',
    'Arkansas',
    'California',
    'Colorado',
    'Connecticut',
    'Delaware',
    'shivam'
  ]
  constructor(
    private userService: UsersService,
    private formBuilder: FormBuilder,
    private permitService: PermitService
  ) {
    this.settings = settingConfig;

  }

  ngOnInit() {
    this.userService.changeSaveAndExit(false);
    this.onInIt()

  }

  onInIt() {
    this.whatFormControl();
    this.whereFormContrl();

  }


  public currentTab: string = 'what'
  nextTab(value) {
    debugger
    this.currentTab = value
  }
  whatFormControl() {
    this.whatForm = this.formBuilder.group({
      role: ['', Validators.required],
      type: ['', Validators.required]
    })
  }

  whereFormContrl() {
    this.whereForm = this.formBuilder.group({
      address: ['', Validators.required],
      also_known_as: [''],
      street_name: ['', Validators.required],
      select_rang: [''],

    })
  }

  get whatControls() { return this.whatForm.controls }
  get whereControls() { return this.whereForm.controls }

  public isSubmit = false;
  public data: any
  addPermitApplication(formGroup, nextTab) {
    debugger
    if (formGroup == 'whatForm') {
      if (this.whatForm.invalid) {
        this.isSubmit = true
        return false
      }
      this.data = {
       role:this.whatForm.value.role,
       type:this.whatForm.value.type
      }
    }
    else if (formGroup == 'whereForm') {
      if (this.whereForm.invalid) {
        this.isSubmit = true;
        return false
      }
    }
    this.currentTab = nextTab
    this.permitService.addPermitApplication(this.data).subscribe(data => {

    })

  }

}
