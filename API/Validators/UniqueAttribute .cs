using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using Microsoft.AspNetCore.Identity;

namespace API.Validators
{
    public  class UniqueAttribute : ValidationAttribute
    {
    protected  override ValidationResult  IsValid(object value , ValidationContext validationContext)
    {
        // Get an instance of the UserManager from the validation context.
        var userManager = (UserManager<AppUser>)validationContext.GetService(typeof(UserManager<AppUser>));
        
        // Get the name of the property that this attribute is applied to.
        var IdSage = validationContext.MemberName;
        
        // // Get the ID of the user that this property belongs to.
        // var userId = userManager.GetUserId(validationContext.ObjectInstance);
        
        // // Find a user in the database that has the same value for this property, but a different ID.
        // var user = userManager.Users.FirstOrDefault(u => u.Id != userId && EF.Property<string>(u, propertyName) == (string)value);
        
        // // Return true if there is no user with the same value for this property, false otherwise.
        return null;  // deleted code : return user == null;
    }
}

}