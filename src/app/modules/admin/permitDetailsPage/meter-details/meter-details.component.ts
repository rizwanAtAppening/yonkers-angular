import { Component, OnInit } from '@angular/core';
import { ApplicationService } from 'src/app/core/services/admin/application.service';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-meter-details',
  templateUrl: './meter-details.component.html',
  styleUrls: ['./meter-details.component.css']
})
export class MeterDetailsComponent implements OnInit {
  public applicationDetails: any;
  public applicationId: number;
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
    this.applicationService.changeMessage('2');
    this.applicationService.meterPermitValue('0')
    this.router.navigate(['/admin/permit/meter-permit'])
  }

  receiveMessage(event) {
    // this.message = event
    // this.isDwonArrow = true;
    // this.isSubmition = false;
    this.ngOnInit();
  }
}
