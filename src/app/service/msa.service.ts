import { Injectable } from '@angular/core';
import { Login, payload, ShipInfo, User } from '../user';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment/environment';
import { parse5 } from '@angular/cdk/schematics';

@Injectable({
  providedIn: 'root'
})
export class MsaService {

  constructor(private http: HttpClient) { 
    
  }
  create(user: User) {
    return this.http.post(`${environment.baseUrl}signUp`, user);
  }

  login(user: Login) {
    console.log(user)
    return this.http.post(`${environment.baseUrl}login`, user);
  }

  getAll() {
    return this.http.get<{data: ShipInfo[]}>(`${environment.baseUrl}getAll`);
  }

  update(shipInfo: ShipInfo) {
    return this.http.post(`${environment.baseUrl}update`, shipInfo);
  }

  createShipDetails(shipInfo: ShipInfo) {
    return this.http.post(`${environment.baseUrl}save`, shipInfo);
  }

  delete(id: string) {
    return this.http.delete(`${environment.baseUrl}delete/${id}`);
  }

  uploadFile(base64String: string | undefined) {
    return this.http
        .post(`${environment.baseUrl}upload`, { file: base64String })
  }

  getAllForMap(data: payload) {
    return this.http.post(`${environment.baseUrl}getAllForMap`, data);
  }
}
