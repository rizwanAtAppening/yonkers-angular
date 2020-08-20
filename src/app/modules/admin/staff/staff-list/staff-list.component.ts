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
  public offset = 10
  public currentPage = 1
  public totalPagination = 40
  public page = 1
  constructor(
    private adminAuthService: AuthenticationService,
    private router: Router,
    private TS: ToastrService
  ) { }

  ngOnInit(): void {
    this.getStaffList();
  }

  getStaffList() {
    this.adminAuthService.staffList({page:this.page}).subscribe(data => {
      this.staffList = data.response;
      this.totalPagination = data.total;
      this.offset = data.offset
      this.currentPage = data.pages
      console.log(this.staffList)
    })
  }

  editStaff(staffId) {
    this.router.navigate(['/admin/add-staff'], { queryParams: { staffId: staffId } })
  }

  paginate(page) {
    this.page = page;
    this.getStaffList();
  }

  reSendMail(id) {
    const data = {
      id: id
    }
    this.adminAuthService.resendMail(data).subscribe(data => {
      this.TS.success('Invitation has been send on your email')
    })
  }

}
