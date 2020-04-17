import { UsersService } from 'src/app/core/services';
import { AuthenticationService } from './../../../authentication/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  public currentUser;
  public isApplicationEditable = false;

  constructor(
    private router: Router,
    public authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private usersService: UsersService
  ) { }

  ngOnInit() {

    /** GET CURRENT ROUTE */

    // this.isApplicationEditable = this.usersService.isApplicationEditable();

    this.isEdit()
    if (this)
      this.authenticationService.getUserInfo().subscribe(user => {
        this.currentUser = user ? user.szEmail : null;
      });
  }

  isEdit() {
    this.usersService.isEditable.subscribe(isEdit => {
      debugger
      this.isApplicationEditable = isEdit
    })
  }

  goToLogin() {
    this.router.navigateByUrl('/auth/login');
  }

  goToDashboard() {
    this.router.navigateByUrl('/application?tab=what');
  }

  logoutUser() {
    this.usersService.changeSaveAndExit(false)
    this.authenticationService.logout().subscribe(res => {
      if (res) {
        debugger
        //this.applicationService.apllicationStatus(1)
        this.isEdit();
        this.router.navigate(['/']);

      }
    });
  }

}
