import { Component, OnInit,Input } from '@angular/core';
import { ApplicationService } from '../../services/admin/application.service';
import { Router } from '@angular/router';
import { appToaster, settingConfig } from 'src/app/configs';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  public settings: any
  public permitType :number = 1
  @Input() childMessage: any = 1;
  constructor(
    private applicationService: ApplicationService,
    private router: Router

  ) {
    this.settings = settingConfig
  }

  ngOnInit(): void {
    console.log(this.childMessage)
  }


  newMessage(url, permit_type,activeTab) {
    
  
    this.applicationService.changeMessage(permit_type);
    this.permitType = activeTab
    this.router.navigate([url])
  }
}
