import { Injectable } from '@angular/core';
import { Login, User } from '../user';
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
}
