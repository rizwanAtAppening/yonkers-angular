import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ApplicationService } from 'src/app/core/services/admin/application.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { appToaster, settingConfig } from 'src/app/configs';

@Component({
  selector: 'app-inspections',
  templateUrl: './inspections.component.html',
  styleUrls: ['./inspections.component.css']
})
export class InspectionsComponent implements OnInit {
  public applicationDetails: any;
  public settings: any;
  @Input() certificatesChild: Observable<any>;
  public inspectionForm: FormGroup
  constructor(
    private applicationService: ApplicationService,
    private fb: FormBuilder
  ) {
    this.settings = settingConfig;

  }

  ngOnInit(): void {
    this.certificatesChild.subscribe(data => {
      this.applicationDetails = data;
    });
    this.onInIt()
  }
  onInIt() {
    this.inspectionFormControl();
  }

  inspectionFormControl() {
    this.inspectionForm = this.fb.group({
      decision: [''],
      type: [''],
      date: [''],
      amount: [''],
      remark: [''],
    })
  }

  get inspection() { return this.inspectionForm.controls };

  public isInspection = false;
  addInspections() {
    debugger
    if (this.inspectionForm.invalid) {
      this.isInspection = true;
      return true
    }
    const data = {
      
    }
    this.inspectionForm.value.application_id = this.applicationDetails.id;
    this.inspectionForm.value.decision = Number(this.inspectionForm.value.decision)
    this.inspectionForm.value.fee = Number(this.inspectionForm.value.fee)

    this.applicationService.inspection(this.inspectionForm.value).subscribe(data => {
      this.inspectionForm.reset();
    })
  }

  getInspection() {
    this.applicationService.getInspection().subscribe(data => {

    })
  }

}
