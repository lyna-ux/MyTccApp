  import { Pipe, PipeTransform } from '@angular/core';
import { Employee } from '../_models/employee';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(employees: Employee[],  searchTextName: string,searchTextIdSage: string,searchTextCin: string ,searchTextUserName:string): Employee[] 
  {//searchTextIdSage: string, searchTextName: string ,searchTextCin: string

    
    if (!employees || employees.length === 0) {
      return [];
    }
    //searchTextPrenom = searchTextPrenom ? searchTextPrenom.toLowerCase() : '';

    // searchTextName = searchTextName ? searchTextName.toLowerCase() : '';
    // searchTextIdSage = searchTextIdSage ? searchTextIdSage.toLowerCase() : '';
    // searchTextCin = searchTextCin ? searchTextCin.toLowerCase() : '';
   

    return employees.filter(employee => {
      //const matchesPrenom = !searchTextPrenom || employee.prenom.toLowerCase().includes(searchTextPrenom);
      const matchesIdSage = !searchTextIdSage || employee.idSage.toString().includes(searchTextIdSage);
      const matchesNom = !searchTextName || employee.nom.toLowerCase().includes(searchTextName);
      const matchesCin = !searchTextCin || employee.cin.toLowerCase().includes(searchTextCin);
      const matchesUserName = !searchTextUserName || employee.userName.toLowerCase().includes(searchTextUserName);
      
      
      return matchesIdSage && matchesNom && matchesCin && matchesUserName ;  //&& matchesNom && matchesCin && matchesIdSage
    });
  }
}
