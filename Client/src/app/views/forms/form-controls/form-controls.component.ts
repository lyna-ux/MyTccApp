
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';


import { HttpClient } from '@angular/common/http';
import { AccountService } from 'src/app/_services/account.service';
import { Demande } from 'src/app/_models/Demande';
import { User } from 'src/app/_models/User';
import* as html2pdf from 'html2pdf.js';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-form-controls',
  templateUrl: './form-controls.component.html',
  styleUrls: ['./form-controls.component.scss']
})
export class FormControlsComponent  implements OnInit  {
  
  public demandes: Demande[] = [];
  public demande: any;
  public details: string[] = ['Référence','Service','Type', 'Objet', 'Statut','Action'];
  formInputs: any = {}; // Object to store form data
  public motif:string=''
  public favoriteColor = '#26ab3c';
  public type='documents';
  public service='';
  public typeDoc='';
  public refDemande='';
  public objetDemande='';
  public recap =false;
  public attestationTravail =false;
  public currentUser:any;
  public currentUserNom:string='';
  public currentUserPrenom:string='';
  public currentUserCin:string='';
  public currentUserMatricule:string='';
  public cinDeposant:string='';
  public selectedRefDemande:string='';
  public showDemandeList: boolean=true;
  public showDemandeDetail: boolean=false;
  public showSRHcontent: boolean=true;
  public ToDayDate: Date= new Date();
  public date: string= '';
  public items: { key: string, value: any }[] = [];
  public demandeDetailsItems:any;
  public CanceledDemande : any;
  public renduPdf:boolean=false;
 


  constructor( private accountService: AccountService, public http: HttpClient,private toastr: ToastrService) { 

    this.date= this.formatDate(this.ToDayDate.toString())
    
  }

  ngOnInit(): void {

    //this.getDemandes()

    
    this. getCurrentUser();
    this.currentUserNom=this.currentUser.nom;
    this.currentUserPrenom=this.currentUser.prenom;
    this.currentUserCin=this.currentUser.cin;
    this.currentUserMatricule=this.currentUser.idSage.toString();
    this.getDemandesByMatricule();
  }

  formatDate(inputDate: string): string {
    const originalDate = new Date(inputDate);
    const day = String(originalDate.getDate()).padStart(2, '0');
    const month = String(originalDate.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = originalDate.getFullYear();
  
    return `${day}-${month}-${year}`;
  }

Content(contentId: string) {
    const contentElement = document.getElementById(contentId) as HTMLElement;
    const contentSections = document.querySelectorAll('.content');
  
    contentSections.forEach(section => {
      section.classList.remove('active-content');
    });
  
    contentElement?.classList.add('active-content');
  }

  toggleDemandeType(type: string) {
    this.type = type;
    console.log(this.type)
  
  }

  toggleDemandeService(service: string) {
    this.service = service;
    console.log(this.service)
    this.showDemandeList=false;
    this.showSRHcontent=true;
  
  
  
  }
  closeSRHcontent() {
      
    this.showSRHcontent=false;
    this.showDemandeList=true;
  
  }

  closeDemandeList() {

    this.showDemandeList=false;
    this.showDemandeDetail=true;
  
  }

  MainMenu() {

    this.showDemandeList=true;
    this.showDemandeDetail=false;
  
  }

  

  // toggleDemandeTypeDoc(typeDoc: string) {
  //   this.typeDoc = typeDoc;
  
  // }
  
  OnclickeAttestationTravail() {
    this.attestationTravail =!this.attestationTravail;
    this.typeDoc='Attestation de travail';
  
  }

  OnClickRecap(){
    this.recap =true 
    const formControls = document.querySelectorAll('.form-control');
    
    formControls.forEach(control => {
      if (control instanceof HTMLInputElement) {
        this.formInputs[control.id] = control.value;
      } else if (control instanceof HTMLSelectElement) {
        this.formInputs[control.id] = control.options[control.selectedIndex].text;
      } else if (control instanceof HTMLTextAreaElement) {
        this.formInputs[control.id] = control.value;
      } else {
        this.formInputs[control.id] = control.textContent;
      }
    });

    
    // Display the JSON object in the console
    console.log(this.formInputs);
    
  }

  addDemande(){
   //get the User Infos from Account Service
   //this.getCurrentUser();
     console.log(this.currentUserMatricule);
     console.log(this.cinDeposant);
    
    // const nom=this.currentUser.nom;
    const cin=this.cinDeposant;
    const detail =
"numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium"
     const addDemandeDto=
      {

        
        nomDeposant:  this.currentUserNom,
        prenomDeposant: this.currentUserPrenom,
        matriculeDeposant: this.currentUserMatricule,
        cinDeposant: this.currentUserCin,
        nomTraitant: "",
        prenomTraitant: "",
        type: this.type,
        objet:this.typeDoc,
        service: this.service,
        details:  JSON.stringify(this.formInputs, null, 2),
        commentaireTraitement: "",
        dateDepot: this.date      ,
        dateTraitement:"" ,
        dateAnnulation:"" ,

        // nomDeposant:  this.currentUserNom,
        // prenomDeposant: this.currentUserPrenom,
        // matriculeDeposant: this.currentUserMatricule,
        // cinDeposant: this.currentUserCin,
        // nomTraitant: "",
        // prenomTraitant: "",
        // type: this.type,
        // objet:this.typeDoc,
        // service: this.service,
        // details:  JSON.stringify(this.formInputs, null, 2),
        // commentaireTraitement: "",
        // dateDepot:"01-08-2023" ,
        // dateTraitement:"" ,
        // dateAnnulation:"" ,
        
        
      }
      const requestBody = JSON.stringify(addDemandeDto);
  
    this.http.post<Demande>('https://localhost:7196/Demande/addDemande', requestBody, { headers: { 'Content-Type': 'application/json' } }).subscribe(
      (response) => {
       
        console.log('Add demande successful', response);
        this.toastr.success("Votre demande a été déposée au service RH");
        this.demandes.push(response)
        
      },
      (error) => {
   
        console.error('Add demande error:', error);
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
  storeSelectedRefDemande(refDemande: string) {
    this.selectedRefDemande = refDemande;
    this.demandeDetailsItems = []; // Clear the previous details
    this.getDemandeByRef(refDemande);
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
  getDemandeByRef(ref:string) {

    this.closeDemandeList() ;
     ref=this.selectedRefDemande
    this.http.get<Demande>('https://localhost:7196/Demande/GetDemandeByRef', {
      params: { refDemande: ref } // Pass the service parameter as a query parameter
    }).subscribe(
      (response: Demande) => {
        console.log(this.selectedRefDemande)
        this.demande = response;
        console.log('demande:', this.demande.status);
        this.objetDemande =this.demande.objet;

        this.demandeDetailsItems=this.parcourirObjetJSON(JSON.parse(this.demande.details));
        console.log( this.demandeDetailsItems);
      
        
      },
      (error) => {
        console.error('Error:', error);
      }
    );

    
  }

  getDemandesByService() {

    const service = "RH"; // Set the service value

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

  getDemandesByMatricule() {

    

    const matricule =  this.currentUserMatricule; 

  this.http.get<Demande[]>('https://localhost:7196/Demande/GetDemandesByMatricule', {
    params: { matriculeDeposant: matricule } 
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

  editDemande(refDemande: string){
   
    const updateDemandeDto=
     {

       refDemande:refDemande,
       
       statut:"Annulée",
       
       
     }
     const requestBody = JSON.stringify(updateDemandeDto);
 
   this.http.post<Demande>('https://localhost:7196/Demande/updateDemandeByRefTraitant', requestBody, { headers: { 'Content-Type': 'application/json' } }).subscribe(
     (response) => {
      
       console.log('Update demande successful', response);
       this.toastr.success("Votre demande sous la référence "+refDemande+ " a été anuulée");
  
     
   
       
     },
     (error) => {
  
       console.error('Update demande error:', error);
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
  // generatePDF() {
  //   const content = document.getElementById('demandeResume');

  //   if (content) {
  //     html2pdf().from(content).save('pdf-document.pdf');
  //   }
  // }

  exportPdf(id :string) {
    const content = document.getElementById(id); // Replace with the actual ID of your HTML content
    
    if (content) {
      const options = {
        margin: 10,
        filename: 'Demande '+this.typeDoc+' '+this.date+'.pdf',
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
  



 

}



