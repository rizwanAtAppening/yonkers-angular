import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { wheat } from 'color-name';
import { UsersService } from 'src/app/core/services';
import { appToaster, settingConfig } from 'src/app/configs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-update-permit',
  templateUrl: './update-permit.component.html',
  styleUrls: ['./update-permit.component.css']
})
export class UpdatePermitComponent implements OnInit {
  public applicationId: number;
  public settings:any;
  public env: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UsersService
  ) {  this.settings = settingConfig;}

  ngOnInit(): void {
    this.route.queryParams.subscribe(data => {
      this.applicationId = data.id;
      if(this.applicationId){
        this.applicationDetais()
      }
    })
    this.env = environment;

  }

  modifyApplication() {
    this.router.navigate(['/dashboard/add-permit'], { queryParams: { tab: 'what', id: this.applicationId } })
  }

  public applicationDetails: any
  applicationDetais() {
    
    this.userService.applicationDetails(this.applicationId).subscribe(data => {
      this.applicationDetails = data.response;
      console.log(this.applicationDetails)
    })
  }

}
