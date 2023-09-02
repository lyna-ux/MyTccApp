import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/_models/User';
import { AccountService } from '../../../_services/account.service';
import { CarouselModule } from '@coreui/angular';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  

})
export class LoginComponent implements OnInit {
  model: any={}
  loggedIn = false;
  currentUser$: Observable<User | null> = of(null); // intilize the object with the null object
  currentUser:any;
  currentUserName:string=''

  constructor(public accountService: AccountService ,private router : Router,private toastr: ToastrService) { }

  ngOnInit(): void {
    //this.currentUser$ = this.accountService.currentUser$ ;
  

  }


  // getCurrentUser(){

  //   this.accountService.currentUser$ .subscribe({
  //     next: user => {

  //       this.loggedIn = !!user;  
  //       console.log(this.loggedIn) ; 
  //       this.currentUser=user; 
  //       this.currentUserName=this.currentUser.userName
  //       console.log(this.currentUserName)  
  //     },             
  //     error: error => console.log(error)
  //   })
  //   }


   login(){
    this.model.username = this.model.username.trim();
    this.accountService.login(this.model).subscribe({
      next: () =>{
        this.loggedIn=true;
        console.log(" successful login");
        
        this.router.navigateByUrl('/dashboard')
        
      },
      error: error => this.toastr.error("Identifiants incorrects")
      
    })
      
   }


   logout(){

    this.accountService.logout();// remove the item form the local storage
    this.router.navigateByUrl('/login')
   }

  
  
 

}
