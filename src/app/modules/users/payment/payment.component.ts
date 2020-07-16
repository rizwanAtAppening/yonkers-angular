import { Component, OnInit } from '@angular/core';
import { PermitService } from 'src/app/core/services/users/permit.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  constructor(
    private permitService: PermitService,

  ) { }

  ngOnInit(): void {
  }

  showPayment(){

  }

  payment(){
    
  }

}
