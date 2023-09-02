import { Planning } from './../../_models/planning';
import { ToggleDashboardService } from './../../_services/toggle-dashboard.service';
import { DefaultHeaderComponent } from './../../containers/default-layout/default-header/default-header.component';
import { EmployeesService } from './../../_services/employees.service';
import { LogService } from './../../_services/log.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { User } from 'src/app/_models/User';
import { AccountService } from 'src/app/_services/account.service';
import { DashboardChartsData, IChartProps } from './dashboard-charts-data';
import { Employee } from 'src/app/_models/employee';






@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  
  chartPieData = {
    labels: ['Présence', 'Absence', 'Retard'],
    datasets: [
      {
        data: [700, 50, 100],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
      }
    ]
  };
  public days: string[] = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
  timeSlots: string[] = ['Début séance 1 ', 'Fin  séance 1 ', 'Début  séance 2 ', 'Fin  séance 2 '];
  // tableData: any[] = ['08:00','12:00','13:00','17:00'];
  tableData: any[] = [];
  model: any={};
  showTable: boolean = false;
  showTableP: boolean = false;
  employee: any;
 
 
  constructor(private chartsData: DashboardChartsData, private http: HttpClient ,
  public accountService :AccountService , public logService :LogService ,public EmployeesService : EmployeesService , 
  public ToggleDashboardService : ToggleDashboardService ) {
  }
  public usersApp: string[] = []; // List to store the usernames
  public firstUser: string = ''; // Variable to store the first username

  public employees : Employee[]=[];
  public loggedIn = false;
  public planning: Planning | undefined;

//currentUser infos
  public currentUser:any;
  public currentUserName:string=''
  public currentUserprenom:string=''
  public currentUserRole:string=''
  public currentUserRefplanningWeek:string=''

  public mainChart: IChartProps = {};
  public chart: Array<IChartProps> = [];
  public trafficRadioGroup = new UntypedFormGroup({
    trafficRadio: new UntypedFormControl('Month')
  });

  ngOnInit(): void {

    //this.getUsers();
    this.setCurrentUser();
    
    this.getCurrentUser();
    console.log(this.currentUserName);
    console.log(this.ToggleDashboardService.dashbord);
    
   // this.logService.sendDataToBackend();

  //  this.getPlanning(this.currentUser.refPlanningWeek);
 
  
  (window as any).CollectId = "64ba5c375a75a9e3a5e29cc4"; // Replace with the new ID

    // Reinitialize the Collect.chat widget
    const collectChatScript = document.createElement('script');
    collectChatScript.setAttribute('type', 'text/javascript');
    collectChatScript.async = true;
    collectChatScript.setAttribute('src', 'https://collectcdn.com/launcher.js');
    document.head.appendChild(collectChatScript);
  
  }
  
  

  
  // getUsers(){
  //   this.http.get<any[]>('https://localhost:7196/Getusers').subscribe({
  //     next: response => {
  //       this.usersApp = response.map(item => item.userName); // Extracting usernames from the response
  //       this.firstUser = this.usersApp.length > 0 ? this.usersApp[0] : '';
        
  //     },

  //     error:error => console.log(error),
  //     complete:() => console.log('Request has been completed')  
        
  // })
  // }

  toggleTable() {
    this.showTable = !this.showTable;
    console.log(this.ToggleDashboardService.dashbord);
    
  }
  toggleTableP() {
    this.showTableP = !this.showTableP;
    console.log(this.ToggleDashboardService.dashbord)
  }

  setCurrentUser(){

    const userString = localStorage.getItem('user');// get the value of the item with the 'user' key
    if (!userString) return;
    const user : User = JSON.parse(userString); //parse the JSON string (the value of the item finded) into a 
                                                  //JavaScript object using JSON.parse
    this.accountService.setCurrentUser(user); // set the current user to the user finded in the  localStorage
    

  }


  getCurrentUser(): void {
    this.accountService.currentUser$.subscribe({
      next: user => {
        if (user) {
          this.loggedIn = true;
          this.currentUser = user;
          this.currentUserName = this.currentUser.nom;
          this.currentUserprenom = this.currentUser.prenom;
          this.currentUserRole=this.currentUser.roleName;

          this.currentUserRefplanningWeek=this.currentUser.refPlanningWeek;
          
          console.log(this.currentUserName+" "+"is logged in"+"  Planning  "+ this.currentUserRefplanningWeek);
        } else {
          this.loggedIn = false;
          console.log(" User not logged in");
        }
      },
      error: error => console.log(error)
    });
  }

  
 

  getPlanning(refPlanning: string) {
    const params = { refPlanningWeek: refPlanning };
   
    this.http.get<Planning>('https://localhost:7196/PlanningWeek/GetPlanningWeek', { params }).subscribe(
      (response) => {
        // Handle the response after successful retrieval
        this.planning = response;
        console.log('Planning', response);
        
      },
      (error) => {
        // Handle error
        console.error('Error:', error);
      }
    );
  }

  


// getPlanning(refPlanning: string) {
//   const requestBody = { refPlanning: refPlanning };

//   this.http.get<Planning>('https://localhost:7196/PlanningWeek/GetPlanningWeek', { params: requestBody }).subscribe(
//     (response) => {
//       // Handle the response after successful retrieval
//       console.log('Planning', response);
//       // Assign the values to tableData
//       this.tableData = [
//         {
//           heureDebut_S1: response.lundi?.heureDebut_S1,
//           heureFin_S1: response.lundi?.heureFin_S1,
//           heureDebut_S2: response.lundi?.heureDebut_S2,
//           heureFin_S2: response.lundi?.heureFin_S2
//         }
//       ];
//     },
//     (error) => {
//       // Handle error
//       console.error('Error:', error);
//     }
//   );
// }

  
  
  
  initCharts(): void {
    this.mainChart = this.chartsData.mainChart;
    
  }

  setTrafficPeriod(value: string): void {
    this.trafficRadioGroup.setValue({ trafficRadio: value });
    this.chartsData.initMainChart(value);
    this.initCharts();
  }

  // public addLog() {


  
  //  this.logService.SendLogData(this.model).subscribe({
  //   next: () =>{
     
  //     console.log(" Data sent");
  //     console.log(this.model.LogOnTimeS1);
      
      
  //   },
  //   error: (error: any) => console.log(error)
    
  // })
     
  // }
  
  
  
  
  
  
  

  // public addLog() {
  //   //Call the sendDataToBackend method of the DataService
  //   const model = { 
      
  //     LogDate: JSON.parse(localStorage.getItem('LogDate') ?? 'null'),
  //     LogRef: JSON.parse(localStorage.getItem('LogRef') ?? 'null'),
  //     LogOnTimeS1: JSON.parse(localStorage.getItem('LogOnTimeS1') ?? 'null'),
  //     logOffTimeS1 : JSON.parse(localStorage.getItem('LogOffTimeS1') ?? 'null'),
  //     logOnTimeS2 : JSON.parse(localStorage.getItem('LogOnTimeS2') ?? 'null'),
  //     logOffTimeS2 : JSON.parse(localStorage.getItem('LogOffTimeS2') ?? 'null'),
  //     logDurationStr : JSON.parse(localStorage.getItem('LogDurationStr') ?? 'null'),
  //     logDurationNbr : parseFloat(localStorage.getItem('LogDurationNbr') ?? '0'),
  //     breakDurationStr : JSON.parse(localStorage.getItem('BreakDurationStr') ?? 'null'),
  //     breakDurationNbr : parseFloat(localStorage.getItem('BreakDurationNbr') ?? '0'),
  //     lunchBreakDurationStr : JSON.parse(localStorage.getItem('LunchBreakDurationStr') ?? 'null'),
  //     lunchBreakDurationNbr : parseFloat(localStorage.getItem('LunchBreakDurationNbr') ?? '0'),
  //     formationDurationStr :JSON.parse(localStorage.getItem('FormationDurationStr') ?? 'null'),
  //     formationDurationNbr : parseFloat(localStorage.getItem('FormationDurationNbr') ?? '0'),
  //     logStatus : JSON.parse(localStorage.getItem('logStatus') ?? 'null'),
  //     logType :JSON.parse(localStorage.getItem('logType') ?? 'null'),
  //   };
  //     // Call the UserLogService to add the log data
  //   this.logUserService.addLog(model).subscribe(
  //     response => {
  //       // Handle the response from the backend
  //       console.log('Data sent successfully:', response);
  //     },
  //     error => {
  //       // Handle the error
  //       console.error('Error sending data:', error);
  //     }
  //   );
  // }
}
