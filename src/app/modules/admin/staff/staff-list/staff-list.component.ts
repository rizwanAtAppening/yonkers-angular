import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.css']
})
export class StaffListComponent implements OnInit {
  public staffList = []
  constructor(
    private adminAuthService: AuthenticationService,
    private router: Router,
    private TS: ToastrService
  ) { }

  ngOnInit(): void {
    this.getStaffList();
  }

  getStaffList() {
    debugger
    this.adminAuthService.staffList().subscribe(data => {
      this.staffList = data.response
      console.log(this.staffList)
    })
  }

  editStaff(staffId){
    this.router.navigate(['/admin/add-staff'],{queryParams:{staffId:staffId}})
  }

}
 