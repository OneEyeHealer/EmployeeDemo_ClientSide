import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from '../../_service/employee.service';

@Component({
  selector: 'app-form-employee',
  templateUrl: './form-employee.component.html',
  styleUrls: ['./form-employee.component.css'],
})
export class FormEmployeeComponent implements OnInit {
  @Input() isClick: any;
  @Output() isClickChanged: EventEmitter<boolean> = new EventEmitter();
  @Input() employees: any;
  @Input() employeeModel: any;
  @Input() refresh: any;
  Departments = ['', 'IT', 'Support', 'Others'];
  constructor(
    private toast: ToastrService,
    private employeeService: EmployeeService
  ) {}

  ngOnChanges = (event: any) => {
    // console.log(event);
  };
  ngOnInit(): void {
    this.employeeModel.Department = this.Departments[0];
  }
  onSelect = (event: any) => {
    console.log(event);
  };
  employeeSubmit = () => {
    const id = this.employeeModel.Id;
    // put
    if (id) {
      this.employeeService.onUpdate(this.employeeModel).subscribe(
        (response: any) => {
          this.toast.success(`Id: #${id} data updated Successfully`, 'Updated');
          this.refresh();
        },
        (error: any) => {
          this.toast.error(error.error.Message, 'Update: Error');
        }
      );
    } else {
      // post
      try {
        this.employeeService.onPost(this.employeeModel).subscribe(
          (response: any) => {
            this.employees = response;
            this.toast.success(
              `${this.employees.Id} Added to Database`,
              'Post: New Employee'
            );
            this.refresh();
          },
          (error: any) => {
            this.toast.error(error.error.Message, 'Post: Error');
            console.log(error);
          }
        );
      } catch (e) {
        this.toast.error(e.Message, 'Form');
      }
    }
  };
  calculateAge = (dob: Date) => {
    let today: any = new Date();
    let dateOfBirth: any = new Date(dob);
    let dateDiff = Math.abs(today - dateOfBirth);
    let age = Math.floor(dateDiff / (1000 * 3600 * 24) / 365.25);
    this.employeeModel.Age = today < dateOfBirth ? age-- : age;
  };
  duplicateResponse = (res: any) => {
    if (res === 'Duplicate Property') {
      this.toast.info(`${res}`, 'Post: New Employee');
    }
  };
  submitBtn = () => {
    this.isClick = !this.isClick;
    this.toast.info(`${this.isClick}`, 'Clicked in Employee-form');
    this.isClickChanged.emit(this.isClick);
  };

  validateFields = (event: any): any => {
    try {
      let { name, model, errors } = event;
      if (errors?.required) return `${name} is required.`;
      // if (this.checkForSpecialChars(model))
      // return `Special Charaters are not allowed`;
      // if (model.match(specialChars)) return `Special Charaters are not allowed`;
      if (name === 'FirstName' && errors?.minlength)
        return `${name} must be at least 3 characters long.`;
      if (name === 'Phone' && errors?.pattern)
        return `${name} must be at of 10 Digit.`;
      if (name === 'Age' && errors?.pattern)
        return 'Minimum Age should be 18 and max should be 50';
    } catch (error) {
      console.log(error);
    }
  };
  // checkForSpecialChars = (str: string) => {
  //   var specialChars = `/^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/`;
  //   for (let i = 0; i < specialChars.length; i++)
  //     if (str.indexOf(specialChars[i]) > -1) return true;
  //   return false;
  // };
}
