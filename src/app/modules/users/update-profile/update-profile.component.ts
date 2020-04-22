import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/core/services';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {

  constructor(
    private userService:UsersService
  ) { }

  ngOnInit(): void {
    this.userService.changeSaveAndExit(true);

  }


  updateProfile(){
    
  }

}
