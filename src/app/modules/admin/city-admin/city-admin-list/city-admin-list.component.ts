import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CityAdminService } from 'src/app/core/services/admin/city-admin.service';

@Component({
  selector: 'app-city-admin-list',
  templateUrl: './city-admin-list.component.html',
  styleUrls: ['./city-admin-list.component.css']
})
export class CityAdminListComponent implements OnInit {
  public staffList = []
  public offset = 10
  public currentPage = 1
  public totalPagination = 40
  public page = 1
  constructor(
    private adminAuthService: AuthenticationService,
    private router: Router,
    private TS: ToastrService,
    private cityAdminService: CityAdminService

  ) { }

  ngOnInit(): void {
    this.getStaffList()
  }

  getStaffList() {
    this.cityAdminService.getCityAdmin({page:this.page}).subscribe(data => {
      this.staffList = data.response;
      this.totalPagination = data.total;
      this.offset = data.offset
      this.currentPage = data.pages
      console.log(this.staffList)
    })
  }

  editStaff(staffId) {
    this.router.navigate(['/admin/add-city-admin'], { queryParams: { staffId: staffId } })
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
