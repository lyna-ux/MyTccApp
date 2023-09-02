import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Subject, interval } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AccountService } from './account.service';




@Injectable({
  providedIn: 'root'
})


export class LogService  {
  public logStart$ = new Subject<void>();
  public logStop$ = new Subject<void>();
  public destroy$ = new Subject<void>();

  public status: string = 'Déconnecté'
  public logType : string ='Production';
  public logDate: Date= new Date();//logDate


  public isLogTypeActive : boolean = false; //Check
  
                  //*******Durations and Timers ****/
//connecté
  public duration: string = '00:00:00'; // Timer "connecté"
  public accumulatedDuration: number = 0; // Total "connecté" duration number ->logDurationNbr >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  public FinalDuration: string = '00:00:00';//Total "connecté" duration string->logDurationStr
//pause
  public breakTimerDuration: string = '00:00:00'; // Timer "pause"
  public breakDuration: string = '00:00:00'; // Total "pause" duration number
  public accumulatedBreakDuration: number = 0;//Total "pause" duration string
//formation
  public FormationTimerDuration: string = '00:00:00';   // Timer "formation"
  public FormationDuration: string = '00:00:00'; //Total "formation" duration string 
  public accumulatedFormationDuration: number = 0;//Total "formation" duration string 
//pause repas
  public LunchBreakTimerDuration: string = '00:00:00'; // Timer "repas"
  public accumulatedLunchBreakDuration: number = 0;//Total "repas" duration string ->lunchBreakDurationStr
  public LunchBreakDuration: string = '00:00:00';//Total "repas" duration string ->lunchBreakDurationStr

//isActive
  public isLunchBreakActive: boolean = false;
  public isBreakActive: boolean = false;
  public isFormationActive: boolean = false;
  public seDeconnecterIsActive: boolean = false;

//subcription
  public timerSubscription: any;
  public breakTimerSubscription: any;
  public FormationTimerSubscription: any;
  public LunchBreakTimerSubscription: any;

//** */Start-Stop Time
  //log
  public logonTime: any; //LogOnTimeS1
  public logoffTime: any; // logOffTimeS2 
  public logOnTrack: {}[] = [];
  public logOnTrackStr: {}[] = [];
  public logOffTrack: {}[] = [];
  public logOffTrackStr: {}[] = [];

  public LogOnTimeS1: any;
  public LogOffTimeS1: any;
  public LogOnTimeS2: any;
  public LogOffTimeS2: any;

  //break
  public breakStartTime: any;
  public breakStopTime: any;
  public breakStartTrack: {}[] = [];
  public breakStopTrack: {}[] = [];
  //Formation
  public FormationStartTime: any;
  public FormationStopTime: any;
  public FormationStartTrack: {}[] = [];
  public FormationStopTrack: {}[] = [];
  //Lunch break
  public LunchBreakStartTime: any;
  public LunchBreakStopTime: any;
  public LunchBreakStartTrack: {}[] = [];
  public LunchBreakStartTrackStr: {}[] = [];
  public LunchBreakStopTrack: {}[] = [];
  public LunchBreakStopTrackStr: {}[] = [];

  public TestStr : string ="Test"

  public Testnbr : number =1
 
//current user infos
public CurrentUser : any;
public CurrentUserNom :string ='';
public CurrentUserPrenom :string ='';
public CurrentUserName :string ='';
public CurrentUserId :number | undefined;
public CurrentUserRefPlanningWeek :string ='';


public totalConnectionTime = 0;
public totalConnectionTimeStr:string ='';
  
 
 
  

  constructor(private http: HttpClient ,public accountService :AccountService ) {
    
    
    this.logStart$
      .pipe(takeUntil(this.logStop$), takeUntil(this.destroy$))
      .subscribe(() => {
        this.logonTime = new Date();
        const options: Intl.DateTimeFormatOptions = { timeZone: 'Africa/Tunis' };
        this.isBreakActive = false;
        this.status = 'Production';
        this.timerSubscription = interval(1000).subscribe(() => {
          const currentTime = new Date().getTime();
          const elapsedTime = currentTime - this.logonTime!.getTime();
          this.duration = this.formatDuration(elapsedTime);
          
        });
      });

      
    }

    totalConnection() {
      const logOnTrack = [{ logOn: "23:15:20" }, { logOn: "23:15:28" }];
      const logOffTrack = [{ logoffTime: "23:15:25" }, { logoffTime: "23:15:34" }];
      for (let i = 0; i < this.logOnTrackStr.length; i++) {
        const logonTime = new Date(`2000-01-01 ${this.logOnTrackStr[i].toString()}`);
        let logoffTime: Date;
      
        if (i < this.logOffTrackStr.length) {
          logoffTime = new Date(`2000-01-01 ${this.logOffTrackStr[i].toString()}`);
        } else {
          // Handle missing logoff entry
          logoffTime = new Date(); // Use current time as logoff time
        }
      
        const timeDiff = logoffTime.getTime() - logonTime.getTime();
        this.totalConnectionTime += timeDiff;
      }
      console.log(`Total connection time: ${this.totalConnectionTime} milliseconds`);
    
      const hours = Math.floor(this.totalConnectionTime / 3600000);
      const minutes = Math.floor((this.totalConnectionTime % 3600000) / 60000);
      const seconds = Math.floor((this.totalConnectionTime % 60000) / 1000);
    
      // Format the time components into a string
      const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
      this.totalConnectionTimeStr=formattedTime;
      console.log(`Total connection time: ${formattedTime}`);
      console.log(this.totalConnectionTimeStr);
      console.log(this.logOnTrackStr[1].toString());
      console.log(this.logOffTrackStr[1].toString());
    }
    
  consoleLogs(){

          console.log('logonTime:', this.logonTime);
          console.log('logoffTime:', this.logoffTime);
          console.log('logOnTrack:', this.logOnTrack);
          console.log('logOffTrack:', this.logOffTrack);
          console.log('breakStartTime:', this.breakStartTime);
          console.log('breakStopTime:', this.breakStopTime);
          console.log('breakStartTrack:', this.breakStartTrack);
          console.log('breakStopTrack:', this.breakStopTrack);
          console.log('FormationStartTime:', this.FormationStartTime);
          console.log('FormationStopTime:', this.FormationStopTime);
          console.log('FormationStartTrack:', this.FormationStartTrack);
          console.log('FormationStopTrack:', this.FormationStopTrack);
          console.log('LunchBreakStartTime:', this.LunchBreakStartTime);
          console.log('LunchBreakStopTime:', this.LunchBreakStopTime);
          console.log('LunchBreakStartTrack:', this.LunchBreakStartTrack);
          console.log('LunchBreakStopTrack:', this.LunchBreakStopTrack);

  }

 

  getCurrentUser(): void {
      this.accountService.currentUser$.subscribe({
        next: user => {
          if (user) {
            
            this.CurrentUser= user;
            this.CurrentUserPrenom=this.CurrentUser.Prenom;
            this.CurrentUserName=this.CurrentUser.Nom;
            this.CurrentUserId=this.CurrentUser.UserId;
            this.CurrentUserRefPlanningWeek=this.CurrentUser.RefPlanningWeek;
            
           
          } else {
            console.log(" User not logged in");
          }
        },
        error: error => console.log(error)
      });
    }


  startLog() {
    if (!this.timerSubscription) {
      if (this.isBreakActive) {
        this.stopBreak(); // Trigger stopBreak() if break is active
      }
      this.logonTime = new Date();
     ;
      this.isBreakActive = false;
      this.status = 'Production';
      this.timerSubscription = interval(1000).subscribe(() => {
        const currentTime = new Date().getTime();
        const elapsedTime = currentTime - this.logonTime?.getTime();
        this.duration = this.formatDuration(elapsedTime);
      });
      if (this.LunchBreakTimerSubscription) {
        this.LunchBreakTimerSubscription.unsubscribe();
        this.LunchBreakTimerSubscription = null;
      }
    }
    const logonTimeStr =this.logonTime?.toLocaleTimeString();
  
    const logData = {logOn:logonTimeStr};// element of the array in format Json
    const logDataStr = logonTimeStr;// element of the array in format string

    this.logOnTrack.push(logData); // Add element logData to logDataTrack array in format Json
    this.logOnTrackStr.push(logDataStr); // Add element logData to logDataTrack array in format string
    this.storeDataInLocalStorage();
    this.LogOnTimeS1= this.logOnTrackStr[0].toString();
      // Retrieve stored counter value from localStorage
  const storedDuration = localStorage.getItem('duration');

  
    console.log(storedDuration);
  }

  
  stopLog() {
    if (this.timerSubscription) {
      this.logoffTime = new Date();
      
      const currentDuration = this.logoffTime?.getTime() - this.logonTime?.getTime();
      this.accumulatedDuration += currentDuration!;
      this.FinalDuration = this.formatDuration(this.accumulatedDuration);
      this.duration = this.FinalDuration;
      this.isBreakActive = false;
      this.status = 'Déconnecté';
      this.timerSubscription.unsubscribe();
      this.timerSubscription = null;
  
      // Stop the break timer
      if (this.breakTimerSubscription) {
        this.breakTimerSubscription.unsubscribe();
        this.breakTimerSubscription = null;
      }
     
    }

    const logoffTimeStr =this.logoffTime?.toLocaleTimeString();
    const logData = { logoffTime: logoffTimeStr };
    const logDataStr = logoffTimeStr ;
    this.logOffTrack.push(logData);
    this.logOffTrackStr.push(logDataStr);
    
 
    this.storeDataInLocalStorage();
    this.seDeconnecterIsActive= true;
 
  }

  seDeconnecter() {

    if (this.seDeconnecterIsActive && this.logOffTrackStr.length > 0 ) {
      this.LogOffTimeS2 = this.logOffTrackStr[this.logOffTrackStr.length - 1].toString();
    }

    console.log(this.logOffTrackStr[this.logOffTrackStr.length - 1].toString())
    console.log(this.LogOffTimeS2);
    
  }

 
  

  toggleBreak() {

    
    if (!this.isBreakActive && this.timerSubscription) {
      this.startBreak();
    } else {
      this.stopBreak();
    }
    this.storeDataInLocalStorage();
  }

  startBreak() {
    if (!this.isBreakActive) {
      this.isBreakActive = true;
      this.breakStartTime = new Date();
      this.status = 'Pause Café';

      // Start the break timer
      this.breakTimerSubscription = interval(1000).subscribe(() => {
        const currentTime = new Date().getTime();
        const elapsedBreakTime = currentTime - this.breakStartTime!.getTime();
        this.breakTimerDuration = this.formatDuration(elapsedBreakTime);
      });
      
    }
    const breakStartTimeStr = this.breakStartTime?.toLocaleDateString() +" "+this.breakStartTime?.toLocaleTimeString();
    const breakData = { breakStartTime: breakStartTimeStr };
    this.breakStartTrack.push(breakData); 
    this.storeDataInLocalStorage();
  }

  stopBreak() {
    if (this.isBreakActive && this.breakStartTime ) {
      this.isBreakActive = false;
      this.breakStopTime = new Date();
      const CurrentBreakDuration = this.breakStopTime.getTime() - this.breakStartTime.getTime();
      this.accumulatedBreakDuration+=CurrentBreakDuration;
      this.breakDuration = this.formatDuration(this.accumulatedBreakDuration);
      this.breakStartTime = undefined;
      this.status = 'Production';

      // Stop the break timer
      if (this.breakTimerSubscription) {
        this.breakTimerSubscription.unsubscribe();
        this.breakTimerSubscription = null;
      }

    }
    const breakStopTimeStr = this.breakStopTime?.toLocaleDateString() +" "+this.breakStopTime?.toLocaleTimeString();
    const breakData = { breakStopTime: breakStopTimeStr };// element of the array
    this.breakStopTrack.push(breakData); // Add element logData to logDataTrack array
    this.storeDataInLocalStorage();
    
  }


  toggleFormation() {
    
    if (!this.isFormationActive ) {
      this.startFormation();
      console.log("formation is on ");  
    } else {
      this.stopFormation();
    }

    this.storeDataInLocalStorage();
  }
  startFormation() {
    if (!this.isFormationActive) { 
      this.isFormationActive = true;
      this.FormationStartTime = new Date();
      this.status = 'Formation';
      this.logType = 'Formation';

    
         // Start the Formation timer
      this.FormationTimerSubscription = interval(1000).subscribe(() => {
        const currentTime = new Date().getTime();
        const elapsedFormationTime = currentTime - this.FormationStartTime!.getTime();
        this.FormationTimerDuration = this.formatDuration(elapsedFormationTime);
      });
     
    // console.log(this.isFormationActive);
    // console.log(this.FormationTimerDuration);
    // console.log(this.FormationDuration );
    }
    // track start Formation 
    const formationStartTimeStr = this.FormationStartTime?.toLocaleDateString() +" "+this.FormationStartTime?.toLocaleTimeString();
    const FormationData = { FormationStartTime: formationStartTimeStr };
    this.FormationStartTrack.push(FormationData); 
    this.storeDataInLocalStorage();
    
  }

  stopFormation() {
    if (this.isFormationActive && this.FormationStartTime ) {
      this.isFormationActive = false;
      this.FormationStopTime = new Date();
      const CurrentFormationDuration = this.FormationStopTime.getTime() - this.FormationStartTime.getTime();
      this.accumulatedFormationDuration+=CurrentFormationDuration;
      this.FormationDuration = this.formatDuration(this.accumulatedFormationDuration);
      this.FormationStartTime = undefined;
      this.status = 'Production';
      this.logType= 'Production';

      // Stop the Formation timer
      if (this.FormationTimerSubscription) {
        this.FormationTimerSubscription.unsubscribe();
        this.FormationTimerSubscription = null;
      }
    }
    console.log(this.isFormationActive);
    console.log(this.FormationTimerDuration);
    console.log(this.FormationDuration );
    this.storeDataInLocalStorage();
     // track Stop Formation 
    const formationStopTimeStr = this.FormationStopTime?.toLocaleDateString() +" "+this.FormationStopTime?.toLocaleTimeString();
    const FormationData = { FormationStopTime: formationStopTimeStr };
    this.FormationStopTrack.push(FormationData); 
    this.storeDataInLocalStorage();
  }



  StartLunchBreak() {
    if (!this.isLunchBreakActive) {
      this.isLunchBreakActive = true;
      this.LunchBreakStartTime = new Date();
      

      // Start the Lunch break timer
      this.LunchBreakTimerSubscription = interval(1000).subscribe(() => {
        const currentTime = new Date().getTime();
        const elapsedBreakTime = currentTime - this.LunchBreakStartTime!.getTime();
        this.LunchBreakDuration = this.formatDuration(elapsedBreakTime);
      });
      this.stopLog();
      this.status = 'Pause repas';
      console.log(this.status+ ','+ this.isLunchBreakActive);

    }
    const LunchBreakStartTimeStr = this.LunchBreakStartTime?.toLocaleTimeString();
    const LunchBreakData = { LunchBreakStartTime: LunchBreakStartTimeStr };
    const LunchBreakDataStr = LunchBreakStartTimeStr ;
    this.LunchBreakStartTrack.push(LunchBreakData); 
    this.LunchBreakStartTrackStr.push(LunchBreakDataStr); 
    this.storeDataInLocalStorage();
    this.LogOffTimeS1 = this.LunchBreakStartTrackStr[0].toString();
    
  }

  StopLunchBreak() {
    if (this.isLunchBreakActive  ) {
      this.isLunchBreakActive = false;
      this.LunchBreakStopTime = new Date();

      const CurrentLunchBreakDuration = this.LunchBreakStopTime.getTime() - this.LunchBreakStartTime.getTime();
      this.accumulatedLunchBreakDuration+=CurrentLunchBreakDuration;
      this.LunchBreakDuration = this.formatDuration(this.accumulatedLunchBreakDuration);
      //this.breakStartTime = undefined;
      this.status = 'Production';

      // Stop the lunch break timer
      if (this.LunchBreakTimerSubscription) {
        this.LunchBreakTimerSubscription.unsubscribe();
        this.LunchBreakTimerSubscription = null;
      }
      this.startLog();

    }
    const LunchBreakStopTimeStr = this.LunchBreakStopTime?.toLocaleTimeString();
    const LunchBreakData = { LunchBreakStopTime: LunchBreakStopTimeStr };
    const LunchBreakDataStr =  LunchBreakStopTimeStr ;
    this.LunchBreakStopTrack.push(LunchBreakData); 
    this.LunchBreakStopTrackStr.push(LunchBreakDataStr); 
    this.storeDataInLocalStorage();
    this.LogOnTimeS2=this.LunchBreakStopTrackStr[this.LunchBreakStopTrackStr.length-1].toString();
    console.log("LunchBreakStopTimeStr: "+LunchBreakStopTimeStr)
  }


  toggleLunchBreak() {
 
    if (!this.isLunchBreakActive && !this.LunchBreakTimerSubscription) {
      this.StartLunchBreak();
    } else {
      this.StopLunchBreak();
    }
    this.storeDataInLocalStorage();
  }
  


  



  ToggleLogType(){

    if (this.logType== "Formation") {
      this.logType= "Production";
    } else {
      this.logType= "Formation";
    }

    this.storeDataInLocalStorage();
    
  }




  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private formatDuration(duration: number): string {
    const seconds = Math.floor(duration / 1000) % 60;
    const minutes = Math.floor(duration / (1000 * 60)) % 60;
    const hours = Math.floor(duration / (1000 * 60 * 60));
    return `${this.padNumber(hours)}:${this.padNumber(minutes)}:${this.padNumber(seconds)}`;
  }

  
  private padNumber(num: number): string {
    return num.toString().padStart(2, '0');
  }

  
  

  storeDataInLocalStorage() {
    const storedLogDurationNbr = localStorage.getItem('LogDurationNbr');

    localStorage.setItem('LogDate',this.logDate.toLocaleDateString());
    localStorage.setItem('LogType', this.logType);
    localStorage.setItem('LogStatus', this.status);
    localStorage.setItem('logonTime', this.logonTime);
    localStorage.setItem('LogDurationNbr', this.accumulatedDuration.toString()); 
    localStorage.setItem('LogDurationStr', this.FinalDuration);
    //Timers
    localStorage.setItem('duration', this.duration);
    localStorage.setItem('breakTimerDuration', this.breakTimerDuration);
    localStorage.setItem('FormationTimerDuration', this.FormationTimerDuration);
    localStorage.setItem('LunchBreakTimerDuration', this.LunchBreakTimerDuration);
   

    // localStorage.setItem('breakStartTime', this.breakStartTime?.toString() ?? '');
    // localStorage.setItem('breakStopTime', this.breakStopTime?.toString() ?? '');
    localStorage.setItem('BreakDurationStr', this.breakDuration);
    localStorage.setItem('BreakDurationNbr', this.accumulatedBreakDuration.toString());
    localStorage.setItem('duration', this.duration);
    // localStorage.setItem('FormationStartTime', this.FormationStartTime?.toString() ?? '');// Formation start time
    // localStorage.setItem('FormationStopTime', this.FormationStopTime?.toString() ?? '');// Formation stop time
    localStorage.setItem('FormationDurationStr', this.FormationDuration); //Duration Formation total number
    localStorage.setItem('FormationDurationNbr', this.accumulatedFormationDuration.toString());//Duration Formation total String


    localStorage.setItem('LunchBreakDurationStr', this.LunchBreakDuration); //Duration Formation total number
    localStorage.setItem('LunchBreakDurationNbr', this.accumulatedLunchBreakDuration.toString());//Duration Formation total String
                       
    localStorage.setItem('logOnTrack', JSON.stringify({ logOnTrack: this.logOnTrack }));
    //localStorage.setItem('logOnTrackStr', this.logOnTrackStr[1].toString());
    localStorage.setItem('logOffTrack', JSON.stringify({ logOffTrack: this.logOffTrack }));  
    localStorage.setItem('LunchBreakStart', JSON.stringify({ LunchBreakStart: this.LunchBreakStartTrack[0]}));
    localStorage.setItem('LunchBreakStop', JSON.stringify({ LunchBreakStop: this.LunchBreakStopTrack[this.LunchBreakStopTrack.length - 1]}));
    localStorage.setItem('LogOnTimeS1', JSON.stringify({ LogOnTimeS1: this.logOnTrack[0]}));
    localStorage.setItem('LogOffTimeS2', JSON.stringify({ LogOffTimeS2: this.logOffTrack[this.logOffTrack.length - 1]}));
                                  
    //break
    
    localStorage.setItem('breakStartTrack', JSON.stringify({ breakStartTrack: this.breakStartTrack }));
    localStorage.setItem('breakStopTrack', JSON.stringify({ breakStopTrack: this.breakStopTrack }));
    //formation
    localStorage.setItem('formationStartTrack', JSON.stringify({ formationStartTrack: this.FormationStartTrack }));
    localStorage.setItem('formationStopTrack', JSON.stringify({ formationStopTrack: this.FormationStopTrack }));
    //LunchBreak
    
    localStorage.setItem('LunchBreakStartTrack', JSON.stringify({LunchBreakStartTrack: this.LunchBreakStartTrack }));
    localStorage.setItem('LunchBreakStopTrack', JSON.stringify({ LunchBreakStopTrack: this.LunchBreakStopTrack }));
    

    // Additional properties
  localStorage.setItem('isLunchBreakActive', this.isLunchBreakActive.toString());
  localStorage.setItem('isBreakActive', this.isBreakActive.toString());
  localStorage.setItem('isFormationActive', this.isFormationActive.toString());
  localStorage.setItem('seDeconnecterIsActive', this.seDeconnecterIsActive.toString());

  // Subscriptions
  // localStorage.setItem('timerSubscription', JSON.stringify(this.timerSubscription));
  // localStorage.setItem('breakTimerSubscription', JSON.stringify(this.breakTimerSubscription));
  // localStorage.setItem('FormationTimerSubscription', JSON.stringify(this.FormationTimerSubscription));
  // localStorage.setItem('LunchBreakTimerSubscription', JSON.stringify(this.LunchBreakTimerSubscription));
  // const timerSubscriptionStr = JSON.stringify(this.timerSubscription);
  // const breakTimerSubscriptionStr = JSON.stringify(this.breakTimerSubscription);
  // const formationTimerSubscriptionStr = JSON.stringify(this.FormationTimerSubscription);
  // const lunchBreakTimerSubscriptionStr = JSON.stringify(this.LunchBreakTimerSubscription);

  // localStorage.setItem('timerSubscription', timerSubscriptionStr);
  // localStorage.setItem('breakTimerSubscription', breakTimerSubscriptionStr);
  // localStorage.setItem('FormationTimerSubscription', formationTimerSubscriptionStr);
  // localStorage.setItem('LunchBreakTimerSubscription', lunchBreakTimerSubscriptionStr);
   }
}
