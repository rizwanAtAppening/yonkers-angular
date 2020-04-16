import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/core/services';
import { appToaster, settingConfig } from 'src/app/configs';
import { FormBuilder, FormGroup, Validators, FormArray, EmailValidator } from '@angular/forms';

@Component({
  selector: 'app-add-permit-tab-section',
  templateUrl: './add-permit-tab-section.component.html',
  styleUrls: ['./add-permit-tab-section.component.css']
})
export class AddPermitTabSectionComponent implements OnInit {
  public settings: any;
  public whatForm: FormGroup;

  constructor(
    private userService: UsersService,
    private formBuilder: FormBuilder
  ) {
    this.settings = settingConfig;

  }

  ngOnInit() {
    this.userService.changeSaveAndExit(false);
    this.onInIt()

  }

  onInIt() {
    this.whatFormControl();

  }

  whatFormControl() {
    this.whatForm = this.formBuilder.group({
      role: ['', Validators.required],
      type:['',Validators.required]
    })
  }


  get whatControls(){ return this.whatForm.controls}

  public isSubmit = false;
  addPermitApplication(formGroup){
    if(formGroup == 'whatForm'){
      if(this.whatForm.invalid){
        this.isSubmit = true
        return false
      }
    }
  }

}
