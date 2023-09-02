import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  private loginTime: Date | undefined;
  private logoffTime: Date | undefined;
  private  currentTime =new Date();
  private loggedTime: string ='';

  login() {
    this.loginTime = new Date();
  }

  logoff() {
    this.logoffTime = new Date();
    this.loggedTime = this.calculateLoggedTime();
  }
//create a method to calculate time
  private calculateLoggedTime(): string {
    if (this.loginTime && this.logoffTime) {
      const timeDifferenceMs =  this.loginTime.getTime()-this.currentTime.getTime();
  
      // Convert milliseconds to hours, minutes, and seconds
      const hours = Math.floor(timeDifferenceMs / (1000 * 60 * 60));
      const minutes = Math.floor((timeDifferenceMs % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDifferenceMs % (1000 * 60)) / 1000);
  
      // Format the time components
      const formattedTime = `${hours}h ${minutes}m ${seconds}s`;
      // localStorage.setItem('duration',formattedTime);
  
      return formattedTime;
    } else  {
      return '0h 0m 0s';
    }
  }

  getLoginTime(): Date | undefined {
    return this.loginTime;
  }

  getLogoffTime(): Date | undefined {
    return this.logoffTime;
  }

  getLoggedTime(): string {
    this.loggedTime = this.calculateLoggedTime();
    return  this.loggedTime ;
  }
  



}
