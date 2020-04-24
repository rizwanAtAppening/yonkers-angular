import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-submit-application',
  templateUrl: './submit-application.component.html',
  styleUrls: ['./submit-application.component.css']
})
export class SubmitApplicationComponent implements OnInit {

  constructor(
    private router:Router,
  ) { }

  ngOnInit(): void {
  }


  navigateIndexPage(){
    this.router.navigate(['/dashboard/permit'])
  }
}
