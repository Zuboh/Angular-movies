import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { dataSU } from './model/signup';
import { dataLI } from './model/login';
import { dataA } from './model/auth';
import { tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { map } from 'jquery';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authSubject = new BehaviorSubject<null | dataA >(null);
  users$ = this.authSubject.asObservable();
  // isLoggedIn$ = this.users$.pipe(map(user=>!!user));
  
  constructor(private http:HttpClient) { }

  logIn(data:dataLI) {
    return this.http.post<dataA>('http://localhost:4201/login',data).pipe(tap((authdata) => {
      this.authSubject.next(authdata);
      localStorage.setItem('userInfo',JSON.stringify(authdata));
    }),
    );
  }

  signUp(data:dataSU) {
    return this.http.post('http://localhost:4201/register', data);
  }
}
