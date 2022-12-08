import {FormGroup} from "@angular/forms";

export class Shipping{
  name: string;
  addressLine1: string;
  addressLine2: string | undefined;
  city: string;

  constructor(shippingForm : FormGroup){
    this.name = shippingForm.controls['name'].value;
    this.addressLine1 = shippingForm.controls['addressLine1'].value;
    this.addressLine2 = shippingForm.controls['addressLine2'].value;
    this.city = shippingForm.controls['city'].value;
  }
}
