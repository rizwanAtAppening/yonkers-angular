import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/core/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-permit-application',
  templateUrl: './add-permit-application.component.html',
  styleUrls: ['./add-permit-application.component.css']
})
export class AddPermitApplicationComponent implements OnInit {

  constructor(
    public userSrvice: UsersService,
    private router: Router,
  ) { }

  ngOnInit() {
    
    this.userSrvice.changeSaveAndExit(true)
  }


  navigateToTab() {
    this.router.navigate(['/dashboard/add-permit'],{queryParams:{tab:'what'}})
  }


}
