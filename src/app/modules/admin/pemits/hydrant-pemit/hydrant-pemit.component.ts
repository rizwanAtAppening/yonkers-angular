import { Component, OnInit } from '@angular/core';
import { ApplicationService } from 'src/app/core/services/admin/application.service';

@Component({
  selector: 'app-hydrant-pemit',
  templateUrl: './hydrant-pemit.component.html',
  styleUrls: ['./hydrant-pemit.component.css']
})
export class HydrantPemitComponent implements OnInit {
public permit_type:any
  constructor(
    private applicationService: ApplicationService,
  ) { }

  ngOnInit(): void {
    this.applicationService.currentMessage.subscribe(type => {
      this.permit_type = type
    })
  }

}
