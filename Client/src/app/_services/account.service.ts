import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { User } from '../_models/User';
import { Employee } from '../_models/employee';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

   baseUrl='https://localhost:7196/';
   private currentUserSource = new BehaviorSubject <User | null >(null); // could be user or null -> union type , an object can be made by 1 or more type
   currentUser$ = this.currentUserSource.asObservable();




  constructor( private http:HttpClient) { }

  Register(registerDto: any) {
    return this.http.post<Employee>(this.baseUrl + 'Account/Register', registerDto).pipe(
      map((response: Employee) => {
        const Employee = response;
        
      })
    );
  }

  login(model: any){ 

    return this.http.post<User>(this.baseUrl + 'Account/login',model).pipe( // we specifie the type <User> in our post method

      //model.username = model.username.trim(),

      map((response: User) => {  // the User type is a model that we created to store the content of our object wich is username and token - it should be the same strucuture of ou user dto-

        const user = response ; // store reponse in the user var
        if (user) {  // if we have a user
          localStorage.setItem('user', JSON.stringify(user)); // we specifie the key of the item as 'user' and the value is the reponse ( that se stored in the user var) and we have to parse it in string ( Json.stringfy)
          this.currentUserSource.next(user); //the behavior object  currentUserSource will be always updated when a new user is loggedIn so it always contains the infos about the current user
          // By calling this.currentUserSource.next(user), the line is updating the currentUserSource 
          // with the new user value and any subscribers to the currentUser observable (defined as 
          //currentUser = this.currentUserSource.asObservable();) will receive this new value.
        }
          
       })

    )
  }


  setCurrentUser(user :User) {

    this.currentUserSource.next(user);  // allow as to set the behavoir object from our  component
  } 

 

  logout(){

    localStorage.removeItem('user'); // remove the item with the same key that we added at the login Method
    this.currentUserSource.next(null); // the behavior object  currentUserSource will be null in no user is logged in ( after the logout)
  }
  ClearLocalStorage(){
    // Clear the local storage
  localStorage.clear();
  }
}
