import {Component, OnInit} from '@angular/core';
import {Toast, ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Component Interaction';
  isClick: boolean = false;
  formSubmit: boolean = false;
  employeeShow: boolean = false;
  addressShow: boolean = false;
  constructor(private toast: ToastrService) {
  }
  ngOnInit(): void {
  }

  handleClickBtn = (value: boolean) => {
    this.isClick = value;
    this.toast.info(`${this.isClick}`, "Clicked in App");
  }
  handleForm = (action: boolean) => {
    this.formSubmit = action;
    this.toast.info(`${this.formSubmit}`, "Form Status");
  }
  handleEmployee = (action: boolean) => {
    this.employeeShow = action;
    this.toast.info(`${this.employeeShow}`, "Employee Status");
  }
  handleAddress = (action: boolean) => {
    this.addressShow = action;
    this.toast.info(`${this.addressShow}`, "Address Status");
  }
}
