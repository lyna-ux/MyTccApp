import { HttpClient } from '@angular/common/http';
import { AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/_models/User';
import { Employee } from 'src/app/_models/employee';
import { AccountService } from 'src/app/_services/account.service';


@Component({
  selector: 'app-widgets',
  templateUrl: './widgets.component.html',
  styleUrls: ['./widgets.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class WidgetsComponent implements AfterContentInit {
  public profile: string = 'get';
  public currentUser:any;
  public currentUserRole:string =''
  public nom:string='';
  public prenom:string='';
  public cin:string='';
  public dateNaissance:string='';
  public situationFamiliale:string='';
  public adressePostale:string='';
  public adresseMail:string='';
  public tel:string='';
  public newAdressePostale:string='';
  public newAdresseMail:string='';
  public newTel:string=''
  public employee:any;
 
  
  

  constructor(private changeDetectorRef: ChangeDetectorRef,private accountService: AccountService,private toastr: ToastrService, public http: HttpClient,
  ) {}

  ngAfterContentInit(): void {
    this.changeDetectorRef.detectChanges();
    this.getEmployee();

  }

  toggleProfile(profile: string) {
    this.profile = profile;
    console.log(this.adresseMail , this.adressePostale,this.tel)
  
  }
  getCurrentUser(): void {
    this.accountService.currentUser$.subscribe({
      next: user => {
        if (user) {
         
          this.currentUser = user;
          console.log(this.currentUser.nom );
          this.nom=this.currentUser.nom;
          this.prenom=this.currentUser.prenom;
          this.cin=this.currentUser.cin;
          this.dateNaissance=this.currentUser.dateNaissance;
          this.situationFamiliale=this.currentUser.situationFamiliale;
          this.currentUserRole=this.currentUser.roleName;
          
          
          
        } else {
         
          console.log(" User not logged in");
        }
      },
      error: error => console.log(error)
    });
  }

  getEmployee() {

    this.getCurrentUser();

    const cin =  this.cin; 

  this.http.get<Employee>('https://localhost:7196/GetUser', {
    params: { cin: cin } 
  }).subscribe(
    (response: Employee) => {
      this.employee = response;
      console.log('Employé:', this.employee);
      this.adressePostale=this.employee.adresse;
      this.adresseMail=this.employee.adresseEmail;
      this.tel=this.employee.tel;

      this.newAdressePostale=this.employee.adresse;
      this.newAdresseMail=this.employee.adresseEmail;
      this.newTel=this.employee.tel;
        
    },
    (error) => {
      console.error('Error:', error);
    }
  );
  
  }



  editProfileUser(cin: string){
   
    const updateDemandeDto=
     {

       cin:cin,
       adresse:this.newAdressePostale,
       adresseEmail:this.newAdresseMail,
       tel:this.newTel,

       
       
     }
     const requestBody = JSON.stringify(updateDemandeDto);
 
   this.http.post<User>('https://localhost:7196/updateUserByEmployee', requestBody, { headers: { 'Content-Type': 'application/json' } }).subscribe(
     (response) => {
      
       console.log(this.newAdressePostale, this.newAdresseMail,this.newTel);
       this.toastr.success("Vos infomrations ont été mises à jour");
       
     },
     (error) => {
  
       console.error('Update demande error:', error);
     }
   );

  


  }
}
