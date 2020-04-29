import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/core/services';
import { PermitService } from 'src/app/core/services/users/permit.service';
import { appToaster, settingConfig } from 'src/app/configs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-permit',
  templateUrl: './permit.component.html',
  styleUrls: ['./permit.component.css']
})
export class PermitComponent implements OnInit {
  public settings: any;
  public applictionDetails = []

  constructor(
    private userService: UsersService,
    private permitService: PermitService,
    private router: Router
  ) {
    this.settings = settingConfig;
  }

  ngOnInit() {
    this.userService.changeSaveAndExit(true);
    this.permitService.deleteSessionApplication();
    this.getPermitApplication()

  }

  public offset: number = 10;
  public currentPage: number = 1;
  public totalPagination: number;

  getPermitApplication() {
    debugger
    // const data = {
    //   page: this.currentPage
    // }
    this.permitService.getPermitApplication({ page: this.currentPage }).subscribe(data => {
      this.applictionDetails = data.response;
      this.offset = data.offset;
      this.totalPagination = data.total
      this.currentPage = data.currentPage;
    })
  }

  paginate(page) {
    debugger
    this.currentPage = page
    this.getPermitApplication()
  }
  public searchString: string
  searchApplication() {
    debugger
    const data = {
      search_query: String(this.searchString),
    }
    this.permitService.searchApplication(data).subscribe(data => {
      this.applictionDetails = data.response;
    })
  }

  updateApplication(applicationId) {

    this.router.navigate(['/dashboard/update-application'], { queryParams: { id: applicationId } });
  }
}
