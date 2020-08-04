import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PermitService } from 'src/app/core/services/users/permit.service';
import { error } from 'util';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-submit-application',
  templateUrl: './submit-application.component.html',
  styleUrls: ['./submit-application.component.css']
})
export class SubmitApplicationComponent implements OnInit {
  public applicationId: any
  public certificate = "/api/download-application/";
  public env:any
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private permitService: PermitService
  ) { }

  ngOnInit(): void {
    this.env = environment;
    this.route.queryParams.subscribe(data => {
      this.applicationId = data.id
    })
  }


  navigateIndexPage() {
    this.router.navigate(['/dashboard/permit'])
  }

  // downloadApplication() {
    
  //   const data = {
  //     downloadType: 1,
  //     exe: 2
  //   }
  //   this.permitService.downloadApplication(data, this.applicationId).subscribe(data => {
  //     console.log(data)
  //   },error=>{
  //     console.log(data);
  //   }
  //   )
    
    
  // }
}
