import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from './../_models/employee';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  baseUrl='https://localhost:7196/';  

  constructor(private http:HttpClient) { }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.baseUrl + 'Getusers');
  }


  // getHttpOptions(){
  //   const userString = localStorage.getItem('user');
  //    if(!userString) return;
  //    const user= JSON.parse(userString);
  //    return {
  //     headers : new HttpHeaders({
  //       Authorization:'Bearer '+  user.token
  //     })
  //    }
  // }
}
