import { Component,OnInit } from '@angular/core';
import { Employee } from '../_models/employee';
import { EmployeesService } from '../_services/employees.service';
import { HttpClient } from '@angular/common/http';
import { Pipe, PipeTransform } from '@angular/core';
import { FilterPipe } from '../_services/filter.pipe';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.scss']
})
export class DashboardAdminComponent implements OnInit {
  public employees: Employee[] = [];
  public details: string[] = ['Prénom', 'Nom', 'CIN', 'Matricule', 'Email',];
  public detailsCompte: string[] = ['Prénom', 'Nom'," Nom d'utilisateur", 'Rôle'];
  public searchTextName: string = '';
  public searchTextIdSage : string  = '';
  public searchTextCin : string  = '';
  public searchTextUserName :string  = '';
  public selectedFilter: string  = '';
  showTableEmployees: boolean = false;
  showTableAccounts: boolean = false;
  showTableRoles: boolean = false;
  showAddAccountForm: boolean = false;
  selectedEmployee: Employee | null = null;
  selectedEmployee2: Employee | null = null;
  public  role:string='';
  public  password:string='';
  public  passwordCheck:boolean| undefined;
  public  roles: string[] = [];
  public  activeTable:string ="";
  public  showDemandes:boolean = true;
  public  showMenu:boolean = true;
  

  private baseUrl='https://localhost:7196/';

  


  constructor(public EmployeesService: EmployeesService,public http: HttpClient,private toastr: ToastrService) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  showMainMenu(){

    this.showMenu= true;

  }

  HidelMainMenu(){
    this.showMenu= false;
}
  // to show employee table or account table
  toggleTable(table: string) {
    this.activeTable = table;
   
  }
// to show demandes
  togglDemandes() {
    this.showDemandes = !this.showDemandes;
    this.activeTable ="";
  }
  // not used : to show or hide table Employee on click
  toggleTableEmployees() {
    this.showTableEmployees = !this.showTableEmployees;
    
  }
 // not used : to show or hide table Account on click
  toggleTableAccounts() {
    this.showTableAccounts = !this.showTableAccounts;
 
    
  }


  // to show form for adding an account " password / role"
  toggleAccountInputs(employee: Employee) {
    this.showAddAccountForm = !this.showAddAccountForm;
    this.selectedEmployee = employee;
    
  }

  redirectToAllEmployees() {
    this.showAddAccountForm = !this.showAddAccountForm;
    this.selectedEmployee = null;
    
  }
  redirectToAllAccounts() {
    this.selectedEmployee2 = null;
    
  }

  RedirectToAccountTable(employee: Employee) {
    this.toggleTable('accounts');
    this.selectedEmployee2 = employee;
    const table2Element = document.getElementById('table2');
    if (table2Element) {
    table2Element.scrollIntoView({ behavior: 'smooth' });
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
  fetchRoles() {
    this.http.get<string[]>(this.baseUrl + 'Account/Roles')
      .subscribe(
        (response) => {
          this.roles = response;
        },
        (error) => {
          console.error('Error fetching roles:', error);
        }
      );
  }

 

  addAccount(employee: Employee) {
   
  
    this.showTableRoles = true;
    
    const registerDto = {
      CIN: employee.cin,
      Password: this.password, // Replace with the actual password from the input field
      SelectedRole: this.role // Replace with the actual role from the input field

      // Password: 'Pass555', // Replace with the actual password from the input field
      // SelectedRole: 'Trainer' // Replace with the actual role from the input field
    };
    
    this.http.post<Employee>(this.baseUrl + 'Account/Register', registerDto).subscribe(
      (response) => {
        // Handle the response after successful registration
        console.log('Registration succ;essful:', response);
        console.log(this.password);
        console.log(this.role);
        this.toastr.success("Compte" +" "+employee.userName+" "+ "créé avec succées");
      },
      (error) => {
        // Handle registration error
        console.error('Registration error:', error);
        this.toastr.error("Création du compte echouée");
      }
    );
    
  }

  resetPassword(employee: Employee) {

  
    const resetPasswordDto = {
      CIN: employee.cin,
      NewPassword: 'New2023' // Replace with the actual role from the input field
    };
    
    this.http.post<Employee>(this.baseUrl + 'Account/ResetPassword', resetPasswordDto).subscribe(
      (response) => {
        // Handle the response after successful registration
        console.log('Registration successful:', response);
        this.toastr.success("Mot de passe réinitialisé");

      },
      (error) => {
        // Handle registration error
        console.error('Registration error:', error);
        this.toastr.error("Réinitialisation du mot de passe echouée");
      }
    );
  }
  deleteAccount(employee :Employee){}

  generatePassword() {
    // Générez votre mot de passe aléatoire ici
    // Par exemple, vous pouvez utiliser une fonction pour générer une chaîne aléatoire de caractères
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const passwordLength = 10;
    let password = '';
  
    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      password += characters[randomIndex];
    }
  
    this.password = password;
  }
  
}



