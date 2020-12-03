import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PermitService } from 'src/app/core/services/users/permit.service';

@Component({
  selector: 'app-add-application-header',
  templateUrl: './add-application-header.component.html',
  styleUrls: ['./add-application-header.component.css']
})
export class AddApplicationHeaderComponent implements OnInit {
  public application: any = {
    status: null,
    payment_status:null,
  }
  public applicationStatus: any
  constructor(
    private router: Router,
    private permitService: PermitService
  ) { }

  ngOnInit(): void {

    this.permitService.currentMessage.subscribe(data => {
      this.applicationStatus = data;
      if (this.applicationStatus == 2) {
        debugger
        this.application = JSON.parse(sessionStorage.getItem('application')) ? JSON.parse(sessionStorage.getItem('application')) : this.application;
        console.log(this.application)
      }
    })


  }

  payNow() {
    this.router.navigate(['/dashboard/payment'], { queryParams: { id: this.application.id } })
  }

  saveAndExit() {
    // this.permitNavigateValue = 'fine'
    // this.addHydrant('', this.currentTab)
    this.router.navigate(['/dashboard/permit'])
  }
}
