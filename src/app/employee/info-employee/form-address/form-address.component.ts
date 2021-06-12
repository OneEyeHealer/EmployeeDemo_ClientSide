import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AddressService } from '../../../_service/address.service';

@Component({
  selector: 'app-form-address',
  templateUrl: './form-address.component.html',
  styleUrls: ['./form-address.component.css'],
})
export class FormAddressComponent implements OnInit {
  @Input() addresses: any;
  @Input() addressModel: any;
  @Input() refresh: any;
  constructor(
    private toast: ToastrService,
    private addressService: AddressService
  ) {}

  ngOnInit(): void {}

  addressSubmit = () => {
    const id = this.addressModel.AddressId;
    // put
    if (id) {
      this.addressService.onUpdate(this.addressModel).subscribe(
        (response: any) => {
          this.toast.success(`Id: #${id} data updated Successfully`, 'Updated');
          this.refresh();
        },
        (error: any) => {
          this.toast.info(error.error.Message, 'Update: Error');
          this.toast.error(error.message, 'Update: Error');
        }
      );
    } else {
      // post
      try {
        this.addressService.onPost(this.addressModel).subscribe(
          (response: any) => {
            const { AddressId } = response;
            this.toast.success(
              `${AddressId} Added to Database`,
              'Post: New Address'
            );
            this.refresh();
          },
          (error: any) => {
            this.toast.info(error.error.Message, 'Post: Error');
            this.toast.error(error.message, 'Post: Error');
          }
        );
      } catch (e) {
        this.toast.error(e.Message, 'Form');
      }
    }
  };
  validateAddressField = (event: any) => {
    try {
      let { name, model, errors } = event;
      if (name === 'AddressType') return null;
      if (errors?.required) return `${name} is required.`;
    } catch (error) {
      console.log(error);
    }
  };
}
