import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToggleDashboardService } from './../../../_services/toggle-dashboard.service';
import { ClassToggleService, HeaderComponent } from '@coreui/angular';
import { AccountService } from 'src/app/_services/account.service';
//import { TimerService } from 'src/app/_services/timer.service';
import { Log } from 'src/app/_models/Log';
import { LogService } from './../../../_services/log.service';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent implements OnInit {
  

  @Input() sidebarId: string = "sidebar";

  public newMessages = new Array(4)
  public newTasks = new Array(5)
  public newNotifications = new Array(5)
  public loggedIn = true;
  public log = false;
  public currentUser:any;
  public userid: string ='';
  public currentUserRefplanningWeek: string ='';
  public dashbord:string='';
  
  loginTime: Date | undefined;
  logoffTime: Date | undefined;

  Duration: string ='';
  public storedDuration: string | null | undefined ;
  showMenu: boolean = false;
  disableAutoClose: boolean = false;
  AutoCloseOutside: string = "outside";
  model: any ={}
 

 
  constructor(private classToggler: ClassToggleService , private accountService: AccountService, public http: HttpClient,
    private router: Router,  public logService : LogService, public ToggleDashboardService :ToggleDashboardService , ) {
    super();}
    ngOnInit(): void {
      this.getCurrentUser();
       this.storedDuration = localStorage.getItem('duration');
       console.log(  "Duration from defaultHeader "+this.storedDuration );
       //this.getStoredItems();
       
    
      
  }

  getStatusColor(): string {
    if (this.logService.status === 'Production') {
      return 'success'; // Green color for 'Production'
    } else if (this.logService.status === 'Pause Café') {
      return 'warning'; // Yellow color for 'Pause Café'
    } else if (this.logService.status === 'Formation') {
      return 'info'; // Blue color for 'Formation'
    } else if (this.logService.status === 'Pause repas') {
      return 'danger'; // red color for 'Pause repas'
    } else {
      return 'dark'; // Dark color for other statuses
    }
  }
  
  toggleDashbord( dashbord:string){
    this.ToggleDashboardService.dashbord=dashbord;
    console.log(this.ToggleDashboardService.dashbord);

  }


  logout(){

    this.accountService.logout();
    this.loggedIn= false; 
    this.router.navigateByUrl('/login');
    console.log(this.ToggleDashboardService.dashbord);
   }

   extractDate(timestamp: string): string {
    const dateObj = new Date(timestamp);
    const date = `${dateObj.getDate()}-${dateObj.getMonth() + 1}-${dateObj.getFullYear()}`;
    return date;
  }
  
  extractTime(timestamp: string): string {
    const dateObj = new Date(timestamp);
    const hours = dateObj.getHours().toString().padStart(2, '0');
    const minutes = dateObj.getMinutes().toString().padStart(2, '0');
    const seconds = dateObj.getSeconds().toString().padStart(2, '0');
    const time = `${hours}:${minutes}:${seconds}`;
    return time;
  }

   addLog(){
 this.logService.totalConnection();
    //console.log(this.logService.totalConnectionTimeStr)
    console.log(this.logService.totalConnectionTimeStr)
      const addLogDto=
      {

            logRef: this.extractDate  (this.logService.logonTime)+"_"+this.currentUser.idSage,
            Date:this.extractDate  (this.logService.logonTime),
            opération:"Manageo",
            idSage:this.currentUser.idSage,
            nom:this.currentUser.nom,
            prenom:this.currentUser.prenom,
            logStatus: "Present",
            LogOnTimeS1 : this.logService.LogOnTimeS1 ,
            LogOffTimeS1:this.logService.LogOffTimeS1 ,
            LogOnTimeS2 : this.logService.LogOnTimeS2 ,
            LogOffTimeS2 : this.logService.LogOffTimeS2 ,
            LogDurationStr: "2",
            LogDurationNbr :2,
            // LogDurationStr: this.logService.totalConnectionTimeStr,
            // LogDurationNbr :this.logService.totalConnectionTime,
            logType: "Production",
            refPlanningWeek: this.currentUser.refPlanningWeek,
      }
      const requestBody = JSON.stringify(addLogDto);
  
    this.http.post<Log>('https://localhost:7196/Log/addLog', requestBody, { headers: { 'Content-Type': 'application/json' } }).subscribe(
      (response) => {
        // Handle the response after successful registration
        console.log('log successful:', response);
        console.log(this.logService.CurrentUserName);
      },
      (error) => {
        // Handle registration error
        console.error('log error:', error);
      }
    );


   }

   logProperties() {
    this.logService.consoleLogs();
  }

 
   getCurrentUser(): void {
    this.accountService.currentUser$.subscribe({
      next: user => {
        if (user) {
          this.loggedIn = true;
          this.currentUser = user;
          this.userid= this.currentUser.UserId;
          this.currentUserRefplanningWeek=this.currentUser.refPlanningWeek;
          
          console.log(this.currentUser.userName+" "+"is logged in as a "+this.currentUser.roleName );
          console.log( "palanning  "+this.currentUserRefplanningWeek)
        } else {
          this.loggedIn = false;
          console.log(" User not logged in");
        }
      },
      error: error => console.log(error)
    });
  }


  //   startTimer() {
  //     this.loginTime = new Date();
  //     this.timerService.login();
  //     console.log(this.loginTime);
  //     console.log("counter on..")
  //     //this.getDuration();
      
  //   }
  
  //   stopTimer() {
  //     this.logoffTime = new Date();
  //     this.timerService.logoff();
  //     // this.Duration =this.timerService.getLoggedTime()
  //     console.log(this.timerService.getLoggedTime());
  //     console.log("counter off")
      
  //   }

  //   getDuration(){
      
  //     console.log( this.timerService.getLoggedTime())
  //   }
  
   
  // getStatusColor(): string {
  //   if (this.logService.status === 'Production') {
  //     return 'success'; // Green color for 'Production'
  //   } else if (this.logService.status === 'Pause Café') {
  //     return 'warning'; // blue color for 'Pause Café'
  //   } else {
  //     return 'dark '; // warning color for other statuses ('Déconnecté')
  //   }
  // }
  // toggleStatus() {
  //   if (this.logService.status === 'Déconnecté' && !this.log) {
  //     this.logService.startLog();
  //     this.log = true;
  //   } else if (this.logService.status === 'Connecté' && this.log) {
      
  //       this.logService.startBreak();
  //       this.log = false;
      
  //   }
  // }
  
  // getStoredItems() {
  //   const storedLogDurationNbr = localStorage.getItem('LogDurationNbr');
  //   const storedLogDate = localStorage.getItem('LogDate');
  //   const storedLogType = localStorage.getItem('LogType');
  //   const storedLogStatus = localStorage.getItem('LogStatus');
  //   const storedLogonTime = localStorage.getItem('logonTime');
  //   // Retrieve other stored items
  
  //   if (storedLogDurationNbr) {
  //     this.logService.accumulatedDuration = parseFloat(storedLogDurationNbr);
  //   }
    
  //   this.logService.logType = storedLogType?? '';
  //   this.logService.status = storedLogStatus?? '';
  //   this.logService.logonTime = storedLogonTime;
  //   // Assign other retrieved values to the log service properties
  
  //   // Retrieve and assign the remaining stored items
  //   const storedLogDuration = localStorage.getItem('duration');
  //   const storedLunchBreakTimerDuration = localStorage.getItem('LunchBreakTimerDuration');
  //   const storedFormationTimerDuration = localStorage.getItem('FormationTimerDuration');
  //   const storedbreakTimerDuration = localStorage.getItem('breakTimerDuration');
  //   const storedLogDurationStr = localStorage.getItem('LogDurationStr');
  //   const storedBreakDurationStr = localStorage.getItem('BreakDurationStr');
  //   const storedBreakDurationNbr = localStorage.getItem('BreakDurationNbr');
  //   const storedFormationDurationStr = localStorage.getItem('FormationDurationStr');
  //   const storedFormationDurationNbr = localStorage.getItem('FormationDurationNbr');
  //   const storedLunchBreakDurationStr = localStorage.getItem('LunchBreakDurationStr');
  //   const storedLunchBreakDurationNbr = localStorage.getItem('LunchBreakDurationNbr');
  //   const storedLogOnTrack = localStorage.getItem('logOnTrack');
  //   const storedLogOnTrackStr = localStorage.getItem('logOnTrackStr');
  //   const storedLogOffTrack = localStorage.getItem('logOffTrack');
  //   const storedLunchBreakStart = localStorage.getItem('LunchBreakStart');
  //   const storedLunchBreakStop = localStorage.getItem('LunchBreakStop');
  //   const storedLogOnTimeS1 = localStorage.getItem('LogOnTimeS1');
  //   const storedLogOffTimeS2 = localStorage.getItem('LogOffTimeS2');
  //   const storedBreakStartTrack = localStorage.getItem('breakStartTrack');
  //   const storedBreakStopTrack = localStorage.getItem('breakStopTrack');
  //   const storedFormationStartTrack = localStorage.getItem('formationStartTrack');
  //   const storedFormationStopTrack = localStorage.getItem('formationStopTrack');
  //   const storedLunchBreakStartTrack = localStorage.getItem('LunchBreakStartTrack');
  //   const storedLunchBreakStopTrack = localStorage.getItem('LunchBreakStopTrack');
  //   if (storedLogDuration) {
  //     this.logService.duration = storedLogDurationStr?? '';
  //   }
  //   if (storedLunchBreakTimerDuration) {
  //     this.logService.LunchBreakTimerDuration = storedLunchBreakTimerDuration?? '';
  //   }
  //   if (storedFormationTimerDuration) {
  //     this.logService.FormationTimerDuration = storedFormationTimerDuration?? '';
  //   }
  //   if (storedbreakTimerDuration) {
  //     this.logService.breakTimerDuration = storedbreakTimerDuration?? '';
  //   }
  //   if (storedLogDurationStr) {
  //     this.logService.FinalDuration = storedLogDurationStr;
  //   }
  //   this.logService.breakDuration = storedBreakDurationStr?? '';
  //   if (storedBreakDurationNbr) {
  //     this.logService.accumulatedBreakDuration = parseFloat(storedBreakDurationNbr);
  //   }
  //   this.logService.FormationDuration = storedFormationDurationStr?? '';
  //   if (storedFormationDurationNbr) {
  //     this.logService.accumulatedFormationDuration = parseFloat(storedFormationDurationNbr);
  //   }
  //   this.logService.FormationDuration = storedLunchBreakDurationStr ?? '';
   
  //   if (storedLunchBreakDurationNbr) {
  //     this.logService.accumulatedLunchBreakDuration = parseFloat(storedLunchBreakDurationNbr);
  //   }
  //   this.logService.logOnTrack = storedLogOnTrack ? JSON.parse(storedLogOnTrack).logOnTrack : [];
  //   this.logService.logOnTrackStr = storedLogOnTrackStr ? [storedLogOnTrackStr] : [];
  //   this.logService.logOffTrack = storedLogOffTrack ? JSON.parse(storedLogOffTrack).logOffTrack : [];
  //   this.logService.LunchBreakStartTrack = storedLunchBreakStart ? [JSON.parse(storedLunchBreakStart).LunchBreakStart] : [];
  //   this.logService.LunchBreakStopTrack = storedLunchBreakStop ? [JSON.parse(storedLunchBreakStop).LunchBreakStop] : [];
  //   this.logService.LogOnTimeS1 = storedLogOnTimeS1 ? JSON.parse(storedLogOnTimeS1).LogOnTimeS1 : null;
  //   this.logService.LogOffTimeS2 = storedLogOffTimeS2 ? JSON.parse(storedLogOffTimeS2).LogOffTimeS2 : null;
  //   this.logService.breakStartTrack = storedBreakStartTrack ? JSON.parse(storedBreakStartTrack).breakStartTrack : [];
  //   this.logService.breakStopTrack = storedBreakStopTrack ? JSON.parse(storedBreakStopTrack).breakStopTrack : [];
  //   this.logService.FormationStartTrack = storedFormationStartTrack ? JSON.parse(storedFormationStartTrack).formationStartTrack : [];
  //   this.logService.FormationStopTrack = storedFormationStopTrack ? JSON.parse(storedFormationStopTrack).formationStopTrack : [];
  //   this.logService.LunchBreakStartTrack = storedLunchBreakStartTrack ? JSON.parse(storedLunchBreakStartTrack).LunchBreakStartTrack : [];
  //   this.logService.LunchBreakStopTrack = storedLunchBreakStopTrack ? JSON.parse(storedLunchBreakStopTrack).LunchBreakStopTrack : [];
  
  //   //Subscruption
  //   // this.logService.timerSubscription = JSON.parse(localStorage.getItem('timerSubscription') ?? 'null');
  //   // this.logService.breakTimerSubscription = JSON.parse(localStorage.getItem('breakTimerSubscription') ?? 'null');
  //   // this.logService.FormationTimerSubscription = JSON.parse(localStorage.getItem('FormationTimerSubscription') ?? 'null');
  //   // this.logService.LunchBreakTimerSubscription = JSON.parse(localStorage.getItem('LunchBreakTimerSubscription') ?? 'null');
  //   this.logService.timerSubscription = JSON.parse(localStorage.getItem('timerSubscription') ?? 'null');
  //   this.logService.breakTimerSubscription = JSON.parse(localStorage.getItem('breakTimerSubscription') ?? 'null');
  //   this.logService.FormationTimerSubscription = JSON.parse(localStorage.getItem('FormationTimerSubscription') ?? 'null');
  //   this.logService.LunchBreakTimerSubscription = JSON.parse(localStorage.getItem('LunchBreakTimerSubscription') ?? 'null');
  
   
  //   // Additional properties
  //   const storedIsLunchBreakActive = localStorage.getItem('isLunchBreakActive');
  //   this.logService.isLunchBreakActive = storedIsLunchBreakActive ? (storedIsLunchBreakActive === 'true') : false;

  //   const storedIsBreakActive = localStorage.getItem('isBreakActive');
  //   this.logService.isBreakActive = storedIsBreakActive ? (storedIsBreakActive === 'true') : false;

  //   const storedIsFormationActive = localStorage.getItem('isFormationActive');
  //   this.logService.isFormationActive = storedIsFormationActive ? (storedIsFormationActive === 'true') : false;

  //   const storedSeDeconnecterIsActive = localStorage.getItem('seDeconnecterIsActive');
  //   this.logService.seDeconnecterIsActive = storedSeDeconnecterIsActive ? (storedSeDeconnecterIsActive === 'true') : false;
//}

  

 
}
