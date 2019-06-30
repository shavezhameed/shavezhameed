import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class GetusersService {
  public _url="https://userdata.getsandbox.com/users";
  constructor(private http : HttpClient) { }

  getUsers(){
    return this.http.get(this._url);
  }
}
