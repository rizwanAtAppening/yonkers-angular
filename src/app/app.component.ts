import { Component } from '@angular/core';
// import { ToasterConfig } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  // public config: ToasterConfig = new ToasterConfig({
  //   animation: 'fade',
  //   positionClass: 'toast-top-full-width',
  //   showCloseButton: true,
  //   timeout: 8000
  // });

  title = 'coop-angular';
}
