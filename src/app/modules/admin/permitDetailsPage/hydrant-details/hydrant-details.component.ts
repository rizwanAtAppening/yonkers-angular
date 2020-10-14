import { Component, OnInit } from '@angular/core';
import { ApplicationService } from 'src/app/core/services/admin/application.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-hydrant-details',
  templateUrl: './hydrant-details.component.html',
  styleUrls: ['./hydrant-details.component.css']
})
export class HydrantDetailsComponent implements OnInit {
  public applicationDetails: any;
  public applicationId: number
  public certificates: any = new Subject<any>();

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
    this.applicationService.getApplicationDetails(this.applicationId).subscribe(data => {
      this.applicationDetails = data.response;
      this.certificates.next(this.applicationDetails)
    })
  }

  navigateIndexPage() {
    this.applicationService.changeMessage('3');
    this.router.navigate(['/admin/permit/hydrant-permit'])
  }

  receiveMessage(event) {
    this.ngOnInit();
  }

}
