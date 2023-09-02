import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders  } from '@angular/common/http';
import { BehaviorSubject, map } from 'rxjs';
import { Log } from '../_models/Log';

@Injectable({
  providedIn: 'root'
})
export class LogUserService {
 
  private url = 'https://localhost:7196/Log/addLog'; 

  constructor(private http:HttpClient) { }
  addLog(model: any){ 


    return this.http.post<Log>(this.url,model);
          
       }

    
  }


