import { Injectable } from '@angular/core';
import { Login, ShipInfo, User } from '../user';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment/environment';

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
    return this.http.post(`${environment.baseUrl}login`, user);
  }

  getAll() {
    return this.http.get<{data: ShipInfo[]}>(`${environment.baseUrl}getAll`);
  }

  update(shipInfo: ShipInfo) {
    return this.http.post(`${environment}update`, shipInfo);
  }

  createShipDetails(shipInfo: ShipInfo) {
    return this.http.post(`${environment}save`, shipInfo);
  }

  delete(id: string) {
    return this.http.delete(`${environment}delete/${id}`);
  }

  uploadFile(base64String: string | undefined) {
    return this.http
        .post(`${environment}upload`, { file: base64String })
  }
}
