import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Employee } from '../_model/employee';
import { Address } from '../_model/address';
import { EmployeeService } from '../_service/employee.service';
import { AddressService } from '../_service/address.service';
import { ToastrService } from 'ngx-toastr';
import * as excel from 'xlsx';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit {
  @Input() isClick: any;
  @Output() isClickChanged: EventEmitter<boolean> = new EventEmitter();

  @Input() formSubmit: any;
  @Output() isFormSubmit: EventEmitter<boolean> = new EventEmitter();

  @Input() employeeShow: any;
  @Output() isEmployeeShow: EventEmitter<boolean> = new EventEmitter();

  @Input() addressShow: any;
  @Output() isAddressShow: EventEmitter<boolean> = new EventEmitter();
  search = '';
  sort = '';
  address = '';
  pageSize: number = 1;
  fileName: string = 'ExcelSheet.xlsx';
  addressLen: number;
  employee: boolean = false;
  key: string = 'id';
  reverse: boolean = true;
  employees: Employee[] = [];
  allAddresses: Address[] = [];
  addresses: Address[] = [];
  employeeModel: any = { Age: 0 };
  addressModel: any = { AddressType: false };
  employeeInfo: any = {};
  // employee: any = {
  //   name: '',
  //   phone: 0,
  // };

  constructor(
    private employeeService: EmployeeService,
    private addressService: AddressService,
    private toast: ToastrService
  ) {}
  ngOnInit(): void {
    this.getData();
    this.getAllAddress();
  }
  refresh = () => {
    window.location.reload();
  };
  OnDob = (dob) => {
    return new Date(dob).toDateString();
  };
  onSearch = ({ target }: any) => {
    const { value } = target;
    this.search = value;
    this.getData();
  };
  onSort = (key) => {
    this.key = key;
    this.reverse = !this.reverse;
    this.sort = this.reverse ? 'desc' : 'asc';
  };

  filterData = () => {
    return this.employees.filter((data) =>
      data.FirstName.toLowerCase().includes(this.search.toLowerCase())
    );
  };
  getDefaultAddress = (defaultAddress: any) => {
    if (defaultAddress.length === 0) return 'NA';
    for (let data of defaultAddress) {
      this.address = 'NA';
      if (defaultAddress.length > 0 && data.AddressType) {
        this.address = `${data.HouseNo}, ${data.Street}`;
        break;
      }
    }
    return this.address;
  };
  getData = () => {
    this.employeeService.onGet().subscribe(
      (response: any) => {
        this.employees = this.search == '' ? response : this.filterData();
        this.employee = true;
      },
      (error: any) => {
        this.toast.error(`${error.message}`, 'GET: Employee');
      }
    );
  };

  getDataId = (id: number) => {
    this.employeeShow = !this.employeeShow;
    this.employeeService.onGetId(id).subscribe(
      (response: any) => {
        this.employeeInfo = response;
        this.getAddress(id);
      },
      (error: any) => {
        this.toast.error(error.message, 'GetID: Employee');
      }
    );
  };
  getAllAddress = () => {
    this.addressService.onGet().subscribe(
      (response: any) => {
        this.allAddresses = response;
      },
      (error: any) => {
        this.toast.error(error.message, 'Get: Address');
      }
    );
  };
  getAddress = (id: number) => {
    this.addressService.onGet().subscribe(
      (response: any) => {
        // response.map((r) => {`${r.HouseNo}, ${r.Street}`});
        this.addresses = response.filter((d) => d.Id === id);
        this.addressLen = Object.keys(this.addresses).length;
      },
      (error: any) => {
        this.toast.error(error.message, 'Get: Address');
      }
    );
  };

  employeeEdit = (id: number) => {
    this.formSubmit = true;
    this.employeeService.onGetId(id).subscribe(
      (response: any) => {
        this.employeeModel = response;
        let { DateOfBirth: dob } = this.employeeModel;
        this.employeeModel.DateOfBirth = new Date(dob).toLocaleDateString();
      },
      (error: any) => {
        this.toast.error(error.message, 'Edit: Employee Error');
      }
    );
  };

  addressEdit = (id: number) => {
    this.addressShow = true;
    this.addressService.onGetId(id).subscribe(
      (response: any) => {
        this.addressModel = response;
      },
      (error: any) => {
        this.toast.error(error.message, 'Edit: Address Error');
      }
    );
  };

  employeeDelete = (id: number) => {
    this.employeeService.onDelete(id).subscribe(
      (res: any) => {
        this.toast.info(
          `Id: #${id} Data is Delete Successfully`,
          'Delete: Employee'
        );
        this.refresh();
      },
      (error: any) => {
        this.toast.error(error.message, 'Delete: Employee Error');
      }
    );
  };
  addressDelete = (id: number) => {
    this.addressService.onDelete(id).subscribe(
      (response: any) => {
        const { AddressId } = response;
        this.toast.info(`${AddressId} deleted Successfully`, 'Delete: Address');
        this.refresh();
      },
      (error: any) => {
        this.toast.error(error.message, 'Delete: Address Error');
      }
    );
  };
  onExportExcel = (): void => {
    console.log('excel call');
    /* pass here the table id */
    let element = document.getElementById('excel_table');
    const ws: excel.WorkSheet = excel.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: excel.WorkBook = excel.utils.book_new();
    excel.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    excel.writeFile(wb, this.fileName);
    console.log('excel end');
  };
  downloadAsExcel = () => {
    let worksheet = excel.utils.json_to_sheet(this.employees);
    let workbook = {
      Sheets: { data: worksheet },
      SheetNames: ['Employee'],
    };
    let excelBuffer = excel.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });
    saveAsExcel(excelBuffer, 'Data File');
  };
}
const EXCEL_TYPE =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
function saveAsExcel(buffer: any, fileName: string) {
  const data = new Blob([buffer], { type: EXCEL_TYPE });
  saveAs(data, `${fileName}_export_${new Date().getTime()}${'.xlsx'}`);
}
