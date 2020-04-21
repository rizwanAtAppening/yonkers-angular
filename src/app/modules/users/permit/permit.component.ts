import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/core/services';
import { PermitService } from 'src/app/core/services/users/permit.service';

@Component({
  selector: 'app-permit',
  templateUrl: './permit.component.html',
  styleUrls: ['./permit.component.css']
})
export class PermitComponent implements OnInit {

  constructor(
    private userService:UsersService,
    private permitService:PermitService
  ) { }

  ngOnInit() {
    this.userService.changeSaveAndExit(true);
    this.permitService.deleteSessionApplication();


  }

}
