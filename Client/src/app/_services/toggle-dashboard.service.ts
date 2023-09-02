import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToggleDashboardService {

  public dashbord: string = 'personnel';
  constructor() { }
}
