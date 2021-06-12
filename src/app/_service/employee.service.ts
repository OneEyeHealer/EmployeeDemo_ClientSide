import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../_model/employee';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  apiEndPoint = `${environment.apiURL}employee`;
  constructor(private http: HttpClient) {}
  // employees: Employee[] = [];
  onGet(): any {
    // return this.employees;
    return this.http.get(this.apiEndPoint);
  }
  onGetId(id: number): any {
    return this.http.get(`${this.apiEndPoint}/${id}`);
  }
  onPost(employee: Employee): any {
    // this.employees.push(employee);
    return this.http.post(this.apiEndPoint, employee);
  }
  onUpdate(employee: Employee): any {
    if (employee.Id) {
      return this.http.put(`${this.apiEndPoint}/${employee.Id}`, employee);
    }
    return this.onPost(employee);
  }
  onDelete(id: number): any {
    return this.http.delete(`${this.apiEndPoint}/${id}`);
  }
}
