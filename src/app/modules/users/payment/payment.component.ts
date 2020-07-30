import { Component, OnInit } from '@angular/core';
import { PermitService } from 'src/app/core/services/users/permit.service';
import { ThrowStmt } from '@angular/compiler';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { error } from '@angular/compiler/src/util';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  public paymentDetails: any
  constructor(
    private permitService: PermitService,
    private route: ActivatedRoute,
    private toasterService: ToastrService,
    private router: Router

  ) { }

  public applicationId: number
  ngOnInit(): void {

    this.route.queryParams.subscribe(data => {
      this.applicationId = data.id
    })
    if (this.applicationId) {
      this.showPayment();
    }
  }

  public paymentsDetailsWithKey = []
  showPayment() {
    
    const data = {
      fee_Type: 3,
      application_id: this.applicationId
    }
    this.permitService.showPayment(data).subscribe(data => {
      this.paymentDetails = data.response
      if (this.paymentDetails) {
        this.paymentDetails.application_fee.map(data => {
          Object.keys(this.paymentDetails.application_fees_config).map(type => {
            if (data.type == type) {
              this.paymentsDetailsWithKey.push({ key: this.paymentDetails.application_fees_config[type], amount: data.amount, fee_Type: data.feeType })
            }
          })
        })
      }
      console.log(this.paymentsDetailsWithKey)
    })
  }

  public isSubmit = false;
  payment() {
    
    this.isSubmit = true
    const data = {
      fee_Type: 3,
      application_id: this.applicationId
    }
    this.permitService.payment(data).subscribe(data => {
      this.toasterService.success('Payment succesfull');
      this.router.navigate(['/dashboard/permit'])
    }, error => {
      this.isSubmit = false
    })
  }

}
