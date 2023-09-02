import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/_models/employee';
import { Planning } from 'src/app/_models/planning';
import { PlanningService } from 'src/app/_services/planning.service';
import { EmployeesService } from 'src/app/_services/employees.service';
import { ToastrService } from 'ngx-toastr';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-dashboard-supervisor',
  templateUrl: './dashboard-supervisor.component.html',
  styleUrls: ['./dashboard-supervisor.component.scss']
})
export class DashboardSupervisorComponent  implements OnInit {

  constructor(public EmployeesService: EmployeesService ,public planningService: PlanningService,public http: HttpClient,
    private toastr: ToastrService) { }
  ngOnInit(): void {
    this.getRefPlannings();
    this.getEmployees();
    this.filteredData = this.data;
  }


  public employees: Employee[] = [];
  public details: string[] = ['Prénom', 'Nom', 'CIN', 'Matricule', 'Email', 'Téléphone','Planning'];
  public detailsLog: string[] = ['Date', 'Opération', 'Matricule','Nom et prénom', 'Statut','Début 1ère séance ','Fin 1ère séance ', 'Début 2ème séance ','Fin 2ème séance ', 'Heure travaillés', 'Formation','Production','Hybride','Planning'];
//public searchTextPrenom : string  = '';
  public searchTextName: string = '';
  public searchTextIdSage : string  = '';
  public searchTextCin : string  = '';
  public searchTextUserName :string  = '';
  public selectedFilter: string  = '';
  showTableEmployees: boolean = false;

  selectedEmployee: Employee | null = null;
  selectedEmployee2: Employee | null = null;

  public  activeTable:string ="";
  public showDemandes:boolean = false;
  public showPlanning:boolean = false;
  public showAddPlanning: boolean = false;
  public showAddPlanningUser: boolean = false;
  public showNewPlanningForm: boolean = false;
  public  showMenu:boolean = true;

  showTable: boolean = false;
  showPlanningUser: boolean = false;
  refPlanning:string='';
  refPlannings: string[] = [];
  public planning: Planning | undefined;
  selectedRefPlanning: string = ''; // Property to store the selected value from the dropdown

  filterStartDate: string='';
  filterEndDate: string='';
  filteredData: any[] = [];
 
    //data for Log Table
    data: any[] = [
      {
        date: '25/06/2023',
        company: 'Manageo',
        code: '7896',
        employee: 'Bernard Luc',
        status: 'Présent',
        startTime: '8H',
        endTime: '12H',
        breakStart: '13H',
        breakEnd: '17H',
        workHours: '8',
        overtime: '0',
        totalHours: '8',
        location: 'Sur site',
        category: 'Planning'
      },
      {
        date: '27/06/2023',
        company: 'Entreprise XYZ',
        code: '5678',
        employee: 'Marie Dubois',
        status: 'En congé',
        startTime: '10H',
        endTime: '18H',
        breakStart: '13H30',
        breakEnd: '17H30',
        workHours: '7.5',
        overtime: '0.5',
        totalHours: '7',
        location: 'Bureau',
        category: 'Planification'
      },
      {
        date: '28/06/2023',
        company: 'Company ABCD',
        code: '2468',
        employee: 'Michael Johnson',
        status: 'Absent',
        startTime: '-',
        endTime: '-',
        breakStart: '-',
        breakEnd: '-',
        workHours: '0',
        overtime: '0',
        totalHours: '0',
        location: 'Bureau',
        category: 'Planification'
      },
      {
        date: '28/05/2023',
        company: 'Company ABCD',
        code: '2468',
        employee: 'Michael Johnson',
        status: 'Absent',
        startTime: '-',
        endTime: '-',
        breakStart: '-',
        breakEnd: '-',
        workHours: '0',
        overtime: '0',
        totalHours: '0',
        location: 'Bureau',
        category: 'Planification'
      },
      {
        date: '28/06/2023',
        company: 'Company ABCD',
        code: '2468',
        employee: 'Michael Johnson',
        status: 'Absent',
        startTime: '-',
        endTime: '-',
        breakStart: '-',
        breakEnd: '-',
        workHours: '0',
        overtime: '0',
        totalHours: '0',
        location: 'Bureau',
        category: 'Planification'
      },
      // Add more rows as needed
    ];

  
  filterTable() {
    if (this.filterStartDate && this.filterEndDate) {
      const startDate = new Date(this.filterStartDate);
      const endDate = new Date(this.filterEndDate);
  
      this.filteredData = this.data.filter((row) => {
        const currentDate = new Date(
          row.date.split('/').reverse().join('-') // Convert date string to yyyy-MM-dd format
        );
        return currentDate >= startDate && currentDate <= endDate;
      });
    } else {
      this.filteredData = this.data;
    }
  }
  
  
  
  convertToDate(dateString: string): Date {
    const [day, month, year] = dateString.split('/');
    const formattedDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    return formattedDate;
  }
  
  
  clearFilter() {
    this.filterStartDate = '';
    this.filterEndDate = '';
    this.filteredData = this.data;
  }

  getColumnHeaders(): string[] {
    if (this.data.length > 0) {
      return Object.keys(this.data[0]);
    }
    return [];
  }

  toggleTable(table: string) {
    this.activeTable = table;
   
  }

  togglePlanning(table: string) {
    this.activeTable = table;
 
  }

  formatDate(date: string): string {
    // Convert date format from '12/02/1993' to '1993-02-12'
    const parts = date.split('/');
    return `${parts[2]}-${parts[1]}-${parts[0]}`;
  }

  get tableForm() {
    return this.planningService.tableForm;
  }

  get days() {
    return this.planningService.days;
  }

  get timeSlots() {
    return this.planningService.timeSlots;
  }

  get tableData() {
    return this.planningService.tableData;
  }

  selectDay(day: string): void {
    this.planningService.selectDay(day);
  }

   createTable(): void {
    this.planningService.createTable();
    console.log('createTable() triggered')
    this.showTable = true; // Set the flag to show the table
  }

  showMainMenu(){

    this.showMenu= true;

  }

  HidelMainMenu(){
    this.showMenu= false;
}


      // show AddEmployee form
      showAddPlanningForm() {
        this.showAddPlanning = true;
      }
      //cancel AddEmployee form have to add that all the inputs have to be deleted 
      cancelAddPlanningForm() {
    
        this.showAddPlanning = false;
      }
     
    
      togglDemandes() {
        this.showDemandes = !this.showDemandes;
     
      }
    
      toggleTableEmployees() {
        this.showTableEmployees = !this.showTableEmployees;
        
      }
    
    
    
      exportToExcel(): void {
        // Get the table data (replace 'tableId' with the actual id of your table)
        const table = document.getElementById('prodTable');
        const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(table);
      
        // Create a new workbook and add the worksheet
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      
        // Generate a file name and save the workbook as an Excel file
        const fileName: string = 'data.xlsx';
        XLSX.writeFile(wb, fileName);
      }
     
    
      redirectToAllEmployees() {
        //this.showAddAccountForm = !this.showAddAccountForm;
        this.selectedEmployee = null;
        
      }
    
    
    
      
      setSelectedFilter(filter: string): void {
        this.selectedFilter = filter;
      }
    
      getEmployees(): void {
        this.EmployeesService.getEmployees().subscribe({
          next: employees => this.employees = employees
        });
      }
    


  addNewWeek() {
    const refPlanningWeekInput = <HTMLInputElement>document.getElementById('RefPlanningWeek');
    const addPlanningWeekDto: any = {
      refPlanningWeek:refPlanningWeekInput.value,
      user: '',
      operation: ''
    };
  
    const selectedDay = this.planningService.selectedDay as string;
    const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
  
    if (selectedDay === 'Tous') {
      days.forEach((day) => {
        addPlanningWeekDto[day] = {
          refPlanning: this.refPlanning,
          heureDebut_S1: this.planningService.tableForm.value.Début_S1,
          heureFin_S1: this.planningService.tableForm.value.Fin_S1,
          heureDebut_S2: this.planningService.tableForm.value.startTime2,
          heureFin_S2: this.planningService.tableForm.value.endTime2,
          heuresPlanifie: 8
        };
      });
    } else if (selectedDay === 'LundiVendredi') {
      const weekdays = days.filter(day => day !== 'Samedi' && day !== 'Dimanche');
      weekdays.forEach((day) => {
        addPlanningWeekDto[day] = {
          refPlanning: this.refPlanning,
          heureDebut_S1: this.planningService.tableForm.value.Début_S1,
          heureFin_S1: this.planningService.tableForm.value.Fin_S1,
          heureDebut_S2: this.planningService.tableForm.value.startTime2,
          heureFin_S2: this.planningService.tableForm.value.endTime2,
          heuresPlanifie: 8
        };
      });
    } else if (days.includes(selectedDay)) {
      days.forEach((day) => {
        if (day === selectedDay) {
          addPlanningWeekDto[day] = {
            refPlanning: this.refPlanning,
            heureDebut_S1: this.planningService.tableForm.value.Début_S1,
            heureFin_S1: this.planningService.tableForm.value.Fin_S1,
            heureDebut_S2: this.planningService.tableForm.value.startTime2,
            heureFin_S2: this.planningService.tableForm.value.endTime2,
            heuresPlanifie: 8
          };
        } else {
          addPlanningWeekDto[day] = {
            refPlanning: this.refPlanning,
            heureDebut_S1: '',
            heureFin_S1: '',
            heureDebut_S2: '',
            heureFin_S2: '',
            heuresPlanifie: 0
          };
        }
      });
    }
  
    this.http.post('https://localhost:7196/PlanningWeek/addPlanningWeek', addPlanningWeekDto).subscribe(
      response => {
        // Handle success response
        console.log('Week added successfully:', response);
        this.toastr.success("La planning a été créé");
        this.getRefPlannings();
        // Perform any additional actions or show a success message
      },
      error => {
        // Handle error response
        console.error('Failed to add week:', error);
        this.toastr.error("Création du planning echoué");
        // Display an error message or handle the error in an appropriate way
      }
    );
  }

  getRefPlannings() {
    this.http.get<string[]>('https://localhost:7196/PlanningWeek/getRefPlanningsWeek').subscribe(
      (response: string[]) => {
        this.refPlannings = response;
        console.log(response);
      },
      (error) => {
        console.error('Failed to get refPlannings:', error);
      }
    );
  }
  
  getPlanning(refPlanning: string) {
    const params = { refPlanningWeek: refPlanning };
   
    this.http.get<Planning>('https://localhost:7196/PlanningWeek/GetPlanningWeek', { params }).subscribe(
      (response) => {
        // Handle the response after successful retrieval
        this.planning = response;
        this.showPlanning=true;
        console.log('Planning', response);
     
      },
      (error) => {
        // Handle error
        console.error('Error:', error);
      }
    );
  }
  togglePlanningUser(employee: Employee) {
    this.showPlanningUser=true;
    this.selectedEmployee = employee;
    
  }
  toggleAddPlanningUser(employee: Employee) {
    this.showAddPlanningUser=true;
    this.selectedEmployee = employee;
    
  }
  AssignPlanning(cin: string, refPlanningWeek: string) {
    
    const updateUserDto= {
      // populate the properties of the updateUserDto object
      cin: cin,
      refPlanningWeek: refPlanningWeek
      // other properties
    };
  
    this.http.post<Employee>('https://localhost:7196/updateUser', updateUserDto).subscribe(
      (response) => {
        // Handle the response after successful retrieval
        console.log('Planning Assigned to the employee with CIN ' + cin, response);
        this.toastr.success('Planning'+' '+refPlanningWeek+' '+'attribué')
      },
      (error) => {
        // Handle error
        console.error('Error:', error);
        this.toastr.error("Attribution du planning echouée");
      }
    );
  }

  NewPlanningUserForm(){
    this.showNewPlanningForm = true;
  }

  CancelNewPlanningUserForm(){
    this.showNewPlanningForm = false;
  }
  
  
  

}
