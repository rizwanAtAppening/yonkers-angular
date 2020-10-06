import { Component, OnInit } from '@angular/core';
import { ApplicationService } from 'src/app/core/services/admin/application.service';
import { Router, Route, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-meter-details',
  templateUrl: './meter-details.component.html',
  styleUrls: ['./meter-details.component.css']
})
export class MeterDetailsComponent implements OnInit {
  public applicationDetails: any;
  public applicationId: number
  constructor(
    private applicationService: ApplicationService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(data => {
      this.applicationId = data.id;
      if (this.applicationId) {
        this.permitDetails();
      }
    })
  }


  permitDetails() {
    debugger
    this.applicationService.getApplicationDetails(this.applicationId).subscribe(data => {
      this.applicationDetails = data.response;
    })
  }
  
  navigateIndexPage() {
    this.applicationService.changeMessage('2');
    this.router.navigate(['/admin/permit/meter-permit'])
  }

}
