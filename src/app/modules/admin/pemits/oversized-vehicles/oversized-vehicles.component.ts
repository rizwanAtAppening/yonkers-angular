import { Component, OnInit } from '@angular/core';
import { ApplicationService } from 'src/app/core/services/admin/application.service';

@Component({
  selector: 'app-oversized-vehicles',
  templateUrl: './oversized-vehicles.component.html',
  styleUrls: ['./oversized-vehicles.component.css']
})
export class OversizedVehiclesComponent implements OnInit {
  public permit_type: any
  constructor(
    private applicationService: ApplicationService,
  ) { }

  ngOnInit(): void {
    this.applicationService.currentMessage.subscribe(type => {
      this.permit_type = type
    })
  }


}
