import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
public currentUser:any
  constructor(
    private adminAuthService: AuthenticationService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getUserInfo();
  }

  getUserInfo() {

    this.adminAuthService.getUserInfo().subscribe(data => {
      this.currentUser = data
    })
  }

  logoutUser() {
    this.adminAuthService.logout().subscribe(res => {
      if (res) {
        this.router.navigate(['/']);

      }
    });
  }

  mavigateByUrl(url){
    this.router.navigate([url])
  }

}
