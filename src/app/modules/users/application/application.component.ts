import { ToastrService } from 'ngx-toastr';
import { UsersService } from './../../../core/services/users/users.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { appToaster } from 'src/app/configs';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent implements OnInit {

  public currentTab: string;
  public EMAIL_REGEX = "[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*";
  public isSubmit: boolean = false;

  /** Steps From for Application */
  public whatForm: FormGroup;
  public whereForm: FormGroup;
  public applicantForm: FormGroup;
  public ownerForm: FormGroup;
  public buyerForm: FormGroup;
  public descriptionForm: FormGroup;
  /** End Steps From for Application */


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public usersService: UsersService,
    private toasterService: ToastrService

  ) { }

  ngOnInit() {

    /** Getting Param for form initialization  */
    this.gettinParamForInitializeForm();
    /** End Getting Param for  forminitialization  */

    /** Initialization of Forms */
    this.initWhatForm();
    this.initWhereForm();
    this.initApplicantForm();
    this.initOwnerForm();
    this.initBuyerForm();
    this.initDescriptionForm();
    /** End Initialization of Forms */


  }

  private gettinParamForInitializeForm() {
    this.currentTab = this.route.snapshot.queryParams['tab'] || undefined;
    if (!this.currentTab) {
      this.router.navigate(['/']);
    }
  }

  private initWhatForm() {
    const validations = {
      'currentUseType': new FormControl('', [
        Validators.required,
        Validators.maxLength(250),
      ]),
      'currentStatus': new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      'occupancyType': new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      'transactionType': new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      'role': new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      'typeOfCommercial': new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      'prevTypeOfCommercial': new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ])
    };
    this.whatForm = new FormGroup(validations);
  }

  private initWhereForm() {
    const validations = {
      'address': new FormControl('', [
        Validators.required,
        Validators.maxLength(250),
      ]),
    };
    this.whereForm = new FormGroup(validations);

  }

  private initApplicantForm() {
    const validations = {
      'contactEmail': new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      'contactPerson': new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      'contactPhone': new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      'contactAddress': new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    };
    this.applicantForm = new FormGroup(validations);
  }

  private initOwnerForm() {
    const validations = {
      'ownerType': new FormControl('', [
        Validators.required,
        Validators.maxLength(250),
        Validators.pattern(this.EMAIL_REGEX)
      ]),
      'ownerName': new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      'ownerPhone': new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      'ownerEmail': new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      'ownerAddress': new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      'ownerBusiness': new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    };
    this.ownerForm = new FormGroup(validations);

  }

  private initBuyerForm() {
    const validations = {
      'buyerName': new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      'buyerPhone': new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      'buyerEmail': new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      'buyerAddress': new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      'buyerBusinessType': new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    };
    this.buyerForm = new FormGroup(validations);
  }

  private initDescriptionForm() {
    const validations = {
      'noOfResidentialUnits': new FormControl('', [
        Validators.required,
        Validators.maxLength(250),
      ]),
      'noOfBedrooms': new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      'noOfKitchens': new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      'noOfBathrooms': new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      'finishedAttic': new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      'finishedBasement': new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      'pointofContact': new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),

    };
    this.descriptionForm = new FormGroup(validations);
  }

  onSubmit(formToSubmit: string, navigateTo: string): boolean {
    console.log(this[formToSubmit])
    this.isSubmit = true;
    if (this[formToSubmit].invalid) {
      return false
    }
    this.usersService.postOccupancyApplication(this[formToSubmit].value)
      .subscribe(res => {
        if (res.status === 'success') {
          this.toasterService.success(appToaster.successHead, res.message);
          this.currentTab = navigateTo;
          this.router.navigate([['/application', { queryParams: { tab: navigateTo } }]]);
        } else {
          this.toasterService.error(appToaster.errorHead, res.message);
          this.router.navigate(['/application', { queryParams: { tab: this.currentTab } }]);
        }
      });
    return true;
  }

  goBack(navigateTo: string) {
    this.currentTab = navigateTo;
    this.router.navigate(['/application'], { queryParams: { tab: navigateTo } });
  }
}
