import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ExportService {
  apiEndPoint = `${environment.apiURL}export`;
  constructor(private http: HttpClient) {}
  onGet(): any {
    return this.http.get(this.apiEndPoint);
  }
}
