import { Component, OnInit } from '@angular/core';
import { ApplicationService } from 'src/app/core/services/admin/application.service';

@Component({
  selector: 'app-meter-pemit',
  templateUrl: './meter-pemit.component.html',
  styleUrls: ['./meter-pemit.component.css']
})
export class MeterPemitComponent implements OnInit {
  message: any;
  public permit_type: any
  constructor(
    private applicationService: ApplicationService,
  ) { }

  ngOnInit(): void {
    debugger
    this.applicationService.currentMessage.subscribe(type => {
      this.permit_type = type
    })
  }

}
