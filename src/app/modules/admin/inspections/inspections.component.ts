import { Component, Output,OnInit,EventEmitter, Input } from '@angular/core';
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
  @Output() messageEvent = new EventEmitter<string>();
  @Input() certificatesChild: Observable<any>;
  public inspectionForm: FormGroup
  constructor(
    private applicationService: ApplicationService,
    private ts:ToastrService,
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
      decision: ['',Validators.required],
      type: ['',Validators.required],
      date: ['',Validators.required],
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
    this.inspectionForm.value.application_id = this.applicationDetails.id;
    this.inspectionForm.value.decision = Number(this.inspectionForm.value.decision)
    this.inspectionForm.value.fee = Number(this.inspectionForm.value.amount)

    this.applicationService.inspection(this.inspectionForm.value).subscribe(data => {
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

}
