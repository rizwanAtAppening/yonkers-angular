import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, EmailValidator } from '@angular/forms';
import { UsersService } from 'src/app/core/services';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-team-member',
  templateUrl: './add-team-member.component.html',
  styleUrls: ['./add-team-member.component.css']
})
export class AddTeamMemberComponent implements OnInit {
  public EMAIL_REGEX = "[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*";
public staffId:number
  public addStaffForm: FormGroup;
  public isStaff = false;
  constructor(
    private fb: FormBuilder,
    private userService: UsersService,
    private route:ActivatedRoute
  ) { }

  ngOnInit(): void {
    debugger
    this.addStaffformCon();
    this.route.queryParams.subscribe(data=>{
      debugger
      this.staffId = data.id;
      if(this.staffId){
        this.getSingleStaff();
      }
    })
  }


  addStaffformCon() {
    this.addStaffForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [
        Validators.required,
        Validators.maxLength(250),
        Validators.pattern(this.EMAIL_REGEX)
      ]],
      mobile_number: ['', Validators.required],
      password: ['',],
    })
  }

  get staffCon() { return this.addStaffForm.controls };

  addStaff() {
    debugger
    if (this.addStaffForm.invalid) {
      this.isStaff = true;
      return false
    }
    if(this.staffId){
      this.addStaffForm.value.member_id = this.staffId
    }
    this.addStaffForm.value.team_id = 2
    this.userService.addStaff(this.addStaffForm.value).subscribe(data => {
      this.addStaffForm.reset();
      this.isStaff = false
    })
  }

  public staffDetails: any
  getSingleStaff() {
    this.userService.getSingleStaff(this.staffId).subscribe(data => {
      this.staffDetails = data.response;
      this.addStaffForm.controls.first_name.setValue(this.staffDetails.first_name);
      this.addStaffForm.controls.last_name.setValue(this.staffDetails.last_name)
      this.addStaffForm.controls.mobile_number.setValue(this.staffDetails.mobile_number)
      this.addStaffForm.controls.email.setValue(this.staffDetails.email)

    })
  }
}
