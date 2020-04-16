import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/core/services';

@Component({
  selector: 'app-add-permit-application',
  templateUrl: './add-permit-application.component.html',
  styleUrls: ['./add-permit-application.component.css']
})
export class AddPermitApplicationComponent implements OnInit {

  constructor(
    public userSrvice:UsersService
  ) { }

  ngOnInit() {
    debugger
    this.userSrvice.changeSaveAndExit(true)
  }




}
