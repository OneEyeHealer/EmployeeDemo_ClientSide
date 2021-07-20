import { Input, Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-info-employee',
  templateUrl: './info-employee.component.html',
  styleUrls: ['./info-employee.component.css'],
})
export class InfoEmployeeComponent implements OnInit {
  @Input() data: any;
  @Input() employeeShow: any;
  @Input() addressShow: any;
  @Input() employeeEdit: any;
  @Input() getDataId: any;
  @Input() employeeDelete: any;
  @Input() addresses: any;
  @Input() getDefaultAddress: any;

  @Input() addressModel: any;
  @Input() addressEdit: any;
  @Input() addressDelete: any;
  @Input() refresh: any;
  @Input() formSubmit: any;
  @Output() isFormSubmit: EventEmitter<boolean> = new EventEmitter();
  @Input() addressLen: number;
  addAddress: boolean = true;
  isDefaultAddress: boolean;

  constructor() {}

  ngOnInit(): void {}
  setDefault = (event: any) => {
    // this.addressModel = this.addresses.filter((d) => d.AddressId === id);
    // if (this.addressModel[0].AddressType)
    //   this.isDefaultAddress = !this.isDefaultAddress;
    // this.addressModel[0].AddressType = !this.addressModel[0].AddressType;
  };
  // setDefaultAddress = (id: any) => {
  //   this.addressModel = this.addresses.filter((d) => d.AddressId === id)[0];
  //   this.addressModel.AddressType = !this.addressModel.AddressType;
  //   this.addressEdit(id);
  // };
  addNewAddress = (id: number) => {
    this.addressModel.Id = id;
    this.addressShow = !this.addressShow;
  };
  employeeInfoBtn = () => {
    this.formSubmit = !this.formSubmit;
    this.employeeShow = !this.employeeShow;
    this.isFormSubmit.emit(this.formSubmit);
    this.isFormSubmit.emit(this.employeeShow);
  };
}
