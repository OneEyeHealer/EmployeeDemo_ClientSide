import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {Address} from "../_model/address";

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  apiEndPoint = `${environment.apiURL}address`;
  constructor(private http: HttpClient) { }
  onGet = () => {
    return this.http.get(this.apiEndPoint);
  }
  onGetId(id: number): any{
    return this.http.get(`${this.apiEndPoint}/${id}`);
  }
  onUpdate(address: Address){
    if(address.Id){return this.http.put(`${this.apiEndPoint}/${address.AddressId}`, address)}
    return this.onPost(address);
  }
  onPost(address: Address): any{
    return this.http.post(this.apiEndPoint, address);
  }
  onDelete = (id: number) => {
    return this.http.delete(`${this.apiEndPoint}/${id}`);
  }
}
