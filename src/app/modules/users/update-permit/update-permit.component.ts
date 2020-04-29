import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { wheat } from 'color-name';

@Component({
  selector: 'app-update-permit',
  templateUrl: './update-permit.component.html',
  styleUrls: ['./update-permit.component.css']
})
export class UpdatePermitComponent implements OnInit {
  public applicationId: number
  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(data => {
      this.applicationId = data.id
    })
  }

  modifyApplication() {
    this.router.navigate(['/dashboard/add-permit'], { queryParams: { tab: 'what', id: this.applicationId } })
  }

}
