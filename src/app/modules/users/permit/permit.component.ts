import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/core/services';

@Component({
  selector: 'app-permit',
  templateUrl: './permit.component.html',
  styleUrls: ['./permit.component.css']
})
export class PermitComponent implements OnInit {

  constructor(
    private userService:UsersService
  ) { }

  ngOnInit() {
    this.userService.changeSaveAndExit(true)

  }

}
