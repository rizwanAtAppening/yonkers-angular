import { Component, OnInit } from '@angular/core';
import { PermitService } from 'src/app/core/services/users/permit.service';
import { ThrowStmt } from '@angular/compiler';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { error } from '@angular/compiler/src/util';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  public cardForm: FormGroup;
  private card;
  public isDisabled = false;

  public paymentDetails: any
  constructor(
    private permitService: PermitService,
    private route: ActivatedRoute,
    private toasterService: ToastrService,
    private router: Router,
    private formBuilder: FormBuilder

  ) { }

  public applicationId: number
  ngOnInit(): void {
    this.onInItForm();
    this.route.queryParams.subscribe(data => {
      this.applicationId = data.id
    })
    if (this.applicationId) {
      this.showPayment();
    }
    this.callStripe();
  }

  onInItForm() {
    this.cardForm = this.formBuilder.group({
      cardNumber: [''],
      zip: [''],
      cvv: [''],
      year: [''],
      isTermAndCondition: ['', Validators.required],
    });
  }

  get getControls() { return this.cardForm.controls }

  public cardNumber;
  public cardExpiry;
  public cardCvc;
  public strip_account: string
  public stripe;
  callStripe() {
    debugger
    // this.stripeAccount
    // (<any>window).initStripe('acct_18uMSLJ28BYG31uZ');
    // this.stripe = (<any>window).stripe;
    // const elements = this.stripe.elements();
    // var style = {
    //   base: {
    //     color: "#32325d",

    //   }
    // };


    // this.card = elements.create("card", { style: style });
    // this.card.mount("#card-element");
    // this.card.addEventListener('change', ({ error }) => {
    //   const displayError = document.getElementById('card-errors');
    //   if (error) {
    //     displayError.textContent = error.message;
    //   } else {
    //     displayError.textContent = '';
    //   }
    // });


    // New design
    // (<any>window).initStripe('acct_18uMSLJ28BYG31uZ');
    // (<any>window).initStripe(this.strip_account);
    // this.stripe = (<any>window).stripe;
    (<any>window).initStripe('acct_1HcReyKyghvyDdkJ');
    // (<any>window).initStripe(this.strip_account);
    this.stripe = (<any>window).stripe
    console.log(this.stripe)
    var elements = this.stripe.elements()

    var inputs = document.querySelectorAll('.cell.example.example2 .input');
    Array.prototype.forEach.call(inputs, function (input) {
      input.addEventListener('focus', function () {
        input.classList.add('focused');
      });
      input.addEventListener('blur', function () {
        input.classList.remove('focused');
      });
      input.addEventListener('keyup', function () {

        if (input.value && input.value.length === 0) {
          input.classList.add('empty');
        } else {
          input.classList.remove('empty');
        }
      });
    });

    var elementStyles = {
      base: {
        color: '#32325D',
        fontWeight: 500,
        fontFamily: 'Source Code Pro, Consolas, Menlo, monospace',
        fontSize: '16px',
        fontSmoothing: 'antialiased',

        '::placeholder': {
          color: '#CFD7DF',
        },
        ':-webkit-autofill': {
          color: '#e39f48',
        },
      },
      invalid: {
        color: '#E25950',

        '::placeholder': {
          color: '#FFCCA5',
        },
      },
    };

    var elementClasses = {
      focus: 'focused',
      empty: 'empty',
      invalid: 'invalid',
    };

    this.card = elements.create('cardNumber', {
      style: elementStyles,
      classes: elementClasses,
    });
    this.cardNumber = this.card
    this.card.mount('#example2-card-number');
    this.cardNumber.mount('#example2-card-number');


    this.card = elements.create('cardExpiry', {
      style: elementStyles,
      classes: elementClasses,
    });
    this.cardExpiry = this.card
    this.card.mount('#example2-card-expiry');
    this.cardExpiry.mount('#example2-card-expiry');


    this.card = elements.create('cardCvc', {
      style: elementStyles,
      classes: elementClasses,
    });
    this.cardCvc = this.card
    this.card.mount('#example2-card-cvc');
    this.cardCvc.mount('#example2-card-cvc');

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
  public isInvalidCard = false;
  public isInValidDate = false;
  public isInValidCvc = false;
  public clientSe
  genrateIntent() {
    debugger
    this.isSubmit = true;

    this.cardNumber.on('change', (event) => {
      if (event.complete) {
        this.isInvalidCard = false;
      } else {
        this.isInvalidCard = true;
      }
    });

    this.cardExpiry.on('change', (event) => {
      if (event.complete) {
        this.isInValidDate = false;
      } else {
        this.isInValidDate = true;
      }
    });

    this.cardCvc.on('change', (event) => {
      if (event.complete) {
        this.isInValidCvc = false;
      } else {
        this.isInValidCvc = true;
      }
    });

    var inputs = document.querySelectorAll('.cell.example.example2 .input');
    if (inputs[1].classList[2] == 'invalid' || inputs[1].classList[2] == 'empty' || inputs[1].classList[1] == 'empty') {
      this.isInvalidCard = true;
      return false
    } else {
      this.isInvalidCard = false

    }

    if (inputs[2].classList[2] == 'invalid' || inputs[2].classList[2] == 'empty' || inputs[2].classList[1] == 'empty') {
      this.isInValidDate = true;
      return false
    } else {
      this.isInValidDate = false;

    }

    if (inputs[3].classList[2] == 'invalid' || inputs[3].classList[2] == 'empty' || inputs[2].classList[1] == 'empty') {
      this.isInValidCvc = true;
      return false
    } else {
      this.isInValidCvc = false;

    }
    console.log(inputs)
    // console.log(elements)

    // elements.on('change', ({ error }) => {
    //   const displayError = document.getElementById('example2-card-number');
    //   if (error) {
    //     displayError.textContent = error.message;
    //   }
    // });
    if (this.cardForm.invalid) {
      this.isDisabled = false;
      return false

    }
    this.isDisabled = true
    const data = {
      application_id: this.applicationId,
      fee_Type: 3
    }
    this.permitService.genrateIntent(data).subscribe(data => {
      console.log(data)
      this.pay(data.response.client_secret, data.response.stripe_account);
      this.toasterService.success('genrate secret')
    },error=>{
      this.isDisabled = false;

    })
  }

  public stripeAccount;
  private async pay(secret: string, stripe_account) {

    const clientSecret = secret;
    // this.stripeAccount = stripe_account;

    // var stripe = Stripe('pk_test_TYooMQauvdEDq54NiTphI7jx', {
    //   stripeAccount: "{{CONNECTED_STRIPE_ACCOUNT_ID}}"
    // });
    // var stripe;
    // (<any>window).initStripe();
    // const form = document.getElementById('payment-form');

    // form.addEventListener('submit', function (ev) {
    //   ev.preventDefault();
    //   stripe.confirmCardPayment(clientSecret, {
    //     payment_method: {
    //       card: card,
    //       billing_details: {
    //         name: 'Jenny Rosen'
    //       }
    //     }
    //   }).then(function (result) {
    //     if (result.error) {
    //       // Show error to your customer (e.g., insufficient funds)
    //       console.log(result.error.message);
    //     } else {
    //       // The payment has been processed!
    //       if (result.paymentIntent.status === 'succeeded') {
    //         // Show a success message to your customer
    //         // There's a risk of the customer closing the window before callback
    //         // execution. Set up a webhook or plugin to listen for the
    //         // payment_intent.succeeded event that handles any business critical
    //         // post-payment actions.
    //       }
    //     }
    //   });
    // });

    this.stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: this.card,
        billing_details: {
          name: 'Jenny Rosen'
        }

      }


    }).then((result) => {

      if (result.error) {

        this.isDisabled = false;

      } else {
        if (result.paymentIntent.status === 'succeeded') {
          this.toasterService.success('Paymets is Success');
          this.router.navigate(['/dashboard/successfull']);


        }
      }
    })

  }

}
