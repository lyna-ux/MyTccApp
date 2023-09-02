  import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { Log } from '../_models/Log';
import { Employee } from '../_models/employee';
import { EmployeesService } from '../_services/employees.service';
import {ElementRef, ViewChild } from '@angular/core';
import { Demande } from '../_models/Demande';
import* as html2pdf from 'html2pdf.js';
import { AccountService } from '../_services/account.service';
@Component({
  selector: 'app-dashboard-hr-officer',
  templateUrl: './dashboard-hr-officer.component.html',
  styleUrls: ['./dashboard-hr-officer.component.scss']
})
export class DashboardHrOfficerComponent implements OnInit {

  @ViewChild('employeeTable', { static: false }) employeeTable!: ElementRef;
  @ViewChild('employeeSection', { static: false }) employeeSection!: ElementRef;
  @ViewChild('ProductionHoraireSection', { static: false }) ProductionHoraireSection!: ElementRef;
  @ViewChild('DemandesSection', { static: false }) DemandesSection!: ElementRef;

  public employees: Employee[] = [];
  public employee: any;
  // public details: string[] = ['Nom et Prénon','Matricule', 'CIN', 'Email', 'Téléphone', 'Date de naissance', 'Genre', 'Situation Familiale', "Date d'entrée", "Date de sortie", 'Solde de congé', 'Statut', 'Badge'];
  public details: string[] = ['Nom et Prénon','Matricule', 'CIN', 'Email', 'Téléphone', 'Statut'];
  public detailsLog: string[] = ['Date', 'Opération', 'Matricule','Nom et prénom', 'Statut','Début 1ère séance ','Fin 1ère séance ', 'Début 2ème séance ','Fin 2ème séance ', 'Heure travaillés', 'Formation/Production','Hybride','Planning'];
  public demandes: Demande[] = [];
  public detailsDemande: string[] = ['Référence','Nom et Prénon','Service','Type', 'Objet', 'Statut','Date','Action'];
  public demande:any;
  public demandeDetailsItems:any; // the propety details of demande
  public items: { key: string, value: any }[] = [];
  public selectedRefDemande:string='';
  public selectedCinEmployee:string='';
  selectedDemandeDetails: { [key: string]: any } = {}; // Object to store selected demande details
  public commentaireTraitement: string = '';
//public searchTextPrenom : string  = '';
  public searchTextName: string = '';
  public searchTextIdSage : string  = '';
  public searchTextCin : string  = '';
  public searchTextUserName :string  = '';
  public selectedFilter: string  = '';
  showTableEmployees: boolean = false;

  showAddAccountForm: boolean = false;
  selectedEmployee: Employee | null = null;
  selectedEmployee2: Employee | null = null;

  public  activeTable:string ="";
  public  showDemandes:boolean = true;
  showAddForm: boolean = false;
  showDetailsEmployee: boolean = false;
  showEmployees: boolean = true;
  updateForm: boolean = false;
  infoList: boolean = true;
  showMenu: boolean = true;

  //AddUserDto
  public nom: string='';
  public prenom: string='';
  public cin: string='';
  public idSage:  number | undefined;
  public adresseEmail: string='' ;
  public adressePostale: string='' ;
  public adresse: string='' ;
  public ville: string='' ;
  public codePostal: string='' ;
  public tel: string='';
  public dateNaissance: string='';
  //public dateNaissance: string='';
  public genre: string='';
  public situationFamiliale: string='';
  public dateEntree: string='';
  public dateSortie: string='';
  public soldeConge: number | undefined;
  public statut: string='';
  public badge: boolean =false ;
  public refPlanningWeek: string='';
  public logRef: string='';
  public operation: string='';
  public poste: string='';
  public MenuDemandes: boolean=true
  public FormTraiter: boolean=false
  public renduPdf: boolean=false
  public currentUser:any;

  logs: Log[] = [];
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

  filterStartDate: string='';
  filterEndDate: string='';
  filteredData: any[] = [];
 

  


  constructor(public EmployeesService: EmployeesService,public http: HttpClient,private toastr: ToastrService,
    private accountService: AccountService) {
    
  }

  ngOnInit(): void {
    this.getEmployees();
    this.filteredData = this.data;
    this.getLogs();
    this.getCurrentUser();
    //this.getEmployeeByCin();
    
  }

  getCurrentUser(): void {
    this.accountService.currentUser$.subscribe({
      next: user => {
        if (user) {
         
          this.currentUser = user;
          console.log(this.currentUser.nom );
          
        } else {
         
          console.log(" User not logged in");
        }
      },
      error: error => console.log(error)
    });
  }

  storeSelectedRefDemande(refDemande: string) {
    this.selectedRefDemande = refDemande;
    this.MenuDemandes= false;
    this.demandeDetailsItems = []; // Clear the previous details
    this.getDemandeByRef();
  }
  
  parcourirObjetJSON(jsonObject: any) {
    console.log("Clearing items array...");
    this.items = []; // Clear the previous details
    console.log("Items array cleared.");
  
    for (const key in jsonObject) {
      if (jsonObject.hasOwnProperty(key)) {
        const value = jsonObject[key];
        console.log(key, value);
        this.items.push({ key: key, value: value });
        console.log(this.items);
      }
    }
  }

  mainMenuDemandes(){
    
    this.MenuDemandes= true;
  }



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
    this.redirectToProdHoraire(); // Call redirectToProdHoraire when toggling the table
  }
  onLinkClickProdHoraire(event: Event, table: string) {
    event.preventDefault(); // Prevent the default navigation behavior
    this.toggleTable(table); // Call your toggleTable method
    this.redirectToProdHoraire(); // Call your redirectToProdHoraire method
  }

  onLinkClickEmployees(event: Event, table: string) {
    event.preventDefault(); // Prevent the default navigation behavior
    this.toggleTable(table); // Call your toggleTable method
    this.redirectToEmployeesSection();
  }

  onLinkClickDemandes(event: Event, table: string) {
    event.preventDefault(); // Prevent the default navigation behavior
    this.toggleTable(table); // Call your toggleTable method
    this.redirectToDemandes();
  }


  addEmployee() {
    this.adressePostale= this.adresse+" "+this.codePostal+" " +this.ville

    const addUserDto = {
    idSage: this.idSage,
    cin: this.cin,
    nom: this.nom,
    prenom: this.prenom,
    adresse: this.adressePostale,
    adresseEmail: this.adresseEmail,
    tel: this.tel,
    dateNaissance: this.dateNaissance,
    genre: this.genre,
    situationFamiliale: this.situationFamiliale,
    dateEntree: this.dateEntree,
    dateSortie: '1999-01-01',
    soldeConge: 0,
    statut: this.statut,
    badge: this.badge,
    // refPlanningWeek: '0817',
    logRef: '0817',
    opération: this.operation,
    poste:this.poste,
    };
  
    if (addUserDto) {
      const requestBody = JSON.stringify(addUserDto);
  
      this.http.post<Employee>('https://localhost:7196/addUser', requestBody, { headers: { 'Content-Type': 'application/json' } }).subscribe(
        (response) => {
          // Handle the response after successful registration
          console.log('Registration successful:', response);
          this.employees.push(response);
          this.getEmployees();
          this.toastr.success("Employé"+" "+this.prenom+" "+this.nom +" "+"ajouté avec succées!");
          this.showAddForm = false;

             // Reset the form fields
        this.idSage = 0;
        this.cin = '';
        this.nom = '';
        this.prenom = '';
        this.adresse = '';
        this.ville = '';
        this.codePostal = '';
        this.adresseEmail = '';
        this.tel = '';
        this.dateNaissance = '';
        this.genre = '';
        this.situationFamiliale = '';
        this.dateEntree = '';
        this.dateSortie = '';
        this.soldeConge = 0;
        this.statut = '';
        this.badge = false;
        //this.refPlanningWeek = '0817';
        this.logRef = '0817';
        this.operation = '';
        this.poste = '';
        
        },
        (error) => this.toastr.error("Veuillez remplir tout les champs")
      );
    }
    // console.log(this.dateNaissance);
    // console.log(this.formatDate('12/02/1993'));
    // console.log(this.dateNaissance+ this.prenom);
  }  
  


  formatDate(date: string): string {
    // Convert date format from '12/02/1993' to '12-02-1993'
    const parts = date.split('/');
    return `${parts[0]}-${parts[1]}-${parts[2]}`;
  }

deleteEmployee(cin: string) {
  const requestBody = JSON.stringify(cin);
  
  this.http.post<Employee>('https://localhost:7196/deleteUser', requestBody, { headers: { 'Content-Type': 'application/json' } }).subscribe(
    (response) => {
      // Handle the response after successful deletion
      console.log('Employee deleted:', response);
    },
    (error) => {
      // Handle error
      console.error('Error:', error);
    }
  );
}
  showMainMenu(){

    this.showMenu= true;

  }

  HidelMainMenu(){
    this.showMenu= false;
}



    // show AddEmployee form
  showForm() {
    this.showAddForm = true;
    this.showEmployees = false;
  }

  
  showEmployeeTable() {
    this.showEmployees = true;
    this.showAddForm = false;
  }

  
  //cancel AddEmployee form have to add that all the inputs have to be deleted 
  cancelForm() {

    this.showAddForm = false;
    this.showEmployees = true;
  }
  showEmployeeDetails(){

  }
  cancelEmployeeDetails(){
    this.showDetailsEmployee=false
    this.showEmployees = true;
  }

  showFormUpdate(){
     this.infoList=false;
     this.updateForm=true;
  }

  cancleFormUpdate(){
    this.infoList=true;
    this.updateForm=false;
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
    const fileName: string = 'Feuille_heure.xlsx';
    XLSX.writeFile(wb, fileName);
  }
 

  redirectToAllEmployees() {
    // this.showAddAccountForm = !this.showAddAccountForm;
    // this.selectedEmployee = null;

     if (this.employeeTable) {
    this.employeeTable.nativeElement.scrollIntoView({ behavior: 'smooth' });
      }
    
  }
  redirectToEmployeesSection() {
    // this.showAddAccountForm = !this.showAddAccountForm;
    // this.selectedEmployee = null;

     if (this.employeeSection) {
    this.employeeSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
      }
    
  }

  redirectToProdHoraire() {
    // this.showAddAccountForm = !this.showAddAccountForm;
    // this.selectedEmployee = null;

     if (this.ProductionHoraireSection) {
    this.ProductionHoraireSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
      }
    
  }

  redirectToDemandes() {
    // this.showAddAccountForm = !this.showAddAccountForm;
    // this.selectedEmployee = null;

     if (this.DemandesSection) {
    this.DemandesSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
      }
    
  }



  
  setSelectedFilter(filter: string): void {
    this.selectedFilter = filter;
  }

  getEmployees(): void {
    this.EmployeesService.getEmployees().subscribe({
      next: employees => this.employees = employees
    
    });
  }

  storeSelectedIdEmployee(cin: string) {
    this.selectedCinEmployee = cin;
    this.getEmployeeByCin();
    this.showEmployees=false;
    this.showDetailsEmployee=true
  }

  getEmployeeByCin() {

    const Cin=this.selectedCinEmployee
    this.http.get<Employee>('https://localhost:7196/GetUser', {
      params: { CIN: Cin } // Pass the service parameter as a query parameter
    }).subscribe(
      (response: Employee) => {
        console.log(this.selectedCinEmployee)
        this.employee = response;
        console.log('employee:', this.employee);

      },
      (error) => {
        console.error('Error:', error);
      }
    );

    
  }


  getLogs() {
    this.http.get<Log[]>('https://localhost:7196/Log/GetLogs').subscribe(
      (response: Log[]) => {
        this.logs = response;
        console.log('logs:',   this.logs);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  getDemandesByService() {

    const service = "Service RH"; // Set the service value

  this.http.get<Demande[]>('https://localhost:7196/Demande/GetDemandesByService', {
    params: { service: service } // Pass the service parameter as a query parameter
  }).subscribe(
    (response: Demande[]) => {
      this.demandes = response;
      console.log('demandes:', this.demandes);
    },
    (error) => {
      console.error('Error:', error);
    }
  );
  
  }



  getDemandes() {

   
    this.http.get<Demande[]>('https://localhost:7196/Demande/GetDemandes').subscribe(
      (response: Demande[]) => {
        this.demandes = response;
        console.log('demandes:', this.demandes);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  getDemandeByRef() {

    const ref=this.selectedRefDemande
    this.http.get<Demande>('https://localhost:7196/Demande/GetDemandeByRef', {
      params: { refDemande: ref } // Pass the service parameter as a query parameter
    }).subscribe(
      (response: Demande) => {
        console.log(this.selectedRefDemande)
        this.demande = response;
        console.log('demande:', this.demande);

        this.demandeDetailsItems=this.parcourirObjetJSON(JSON.parse(this.demande.details));
        console.log( this.demandeDetailsItems);
      
        
      },
      (error) => {
        console.error('Error:', error);
      }
    );

    
  }
  
  getStatusBadgeClass(statut: string): string {
    const statusClasses: { [key: string]: string } = {
      'En cours': 'badge badge-soft-warning mb-0',
      'Traitée': 'badge badge-soft-success mb-0',
      'Annulée': 'badge badge-soft-dark mb-0',
      // Add more mappings as needed
    };

    return statusClasses[statut] || 'badge badge-soft-secondary mb-0';
  }

  toggleFormTraiter(traiter: string){

  if (traiter=="show")
    this.FormTraiter = true;
  else if (traiter=="hide")
    this.FormTraiter = false;
  

}
  
  traiterDemande(){
  
      const updateDemandeDto=
       {
 
         refDemande:this.selectedRefDemande,
         nomTraitant:this.currentUser.nom,
         prenomTraitant: this.currentUser.prenom,
         statut:"Traitée",
         commentaireTraitement: this.commentaireTraitement,
         dateTraitement: "26-08-2023",  
         
       }
       const requestBody = JSON.stringify(updateDemandeDto);
   
     this.http.post<Demande>('https://localhost:7196/Demande/updateDemandeByRefTraitant', requestBody, { headers: { 'Content-Type': 'application/json' } }).subscribe(
       (response) => {
        
         console.log('Update demande successful', response);
         this.toastr.success("Demande traitée")
         
       },
       (error) => {
    
         console.error('Update demande error:', error);
       }
     );
 
 
    }

    exportPdf() {
      const content = document.getElementById('demandeResumeSample'); // Replace with the actual ID of your HTML content
    
      if (content) {
        const options = {
          margin: 10,
          filename: 'Demande attestation de travail.pdf',
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        };
    
        html2pdf().from(content).set(options).save();
      }
     
    }

   showRenduPdf(){
    this.renduPdf=true;
   }
   HideRenduPdf(){
    this.renduPdf=false;
   }





 
  
}

