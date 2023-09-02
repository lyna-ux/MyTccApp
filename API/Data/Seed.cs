using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class Seed
    {
        public static async Task ClearConnections(DataContext context)
        {
       
            await context.SaveChangesAsync();
        }

        public static async Task SeedUsers(UserManager<AppUser> userManager , RoleManager<AppRole> roleManager)

            // check if we have already users in the Db we return ";" that stop the execution of the method
        {
            if (await userManager.Users.AnyAsync()) return;
            //else , we read from our json.file "UserSeedData.json"

            var userData = await File.ReadAllTextAsync("Data/UserSeedData.json");

            var options = new JsonSerializerOptions{PropertyNameCaseInsensitive = true};  // it's to specifie that the proprety Name of the data is not Case Sensitive ("DateNaissance": "2003-01-26")

            var users = JsonSerializer.Deserialize<List<AppUser>>(userData); // the Deserialize convert the data to a c# object


            var roles = new List<AppRole>
            {
                new AppRole{Name = "Admin"},
                new AppRole{Name = "Supervisor"},
                new AppRole{Name = "HrOfficer"},
                new AppRole{Name = "RecruitmentOfficer"},
                new AppRole{Name = "CommercialAgent"},
                new AppRole{Name = "Trainer"},
                new AppRole{Name = "Employee"},
            };
     
            foreach (var role in roles)
            {
                await roleManager.CreateAsync(role);
            }
            
            foreach (var user in users)
            {
                //Assign the same password for all the users 
                user.UserName = user.Nom.ToLower()+"."+user.IdSage;
                await userManager.CreateAsync(user, "Pass123!");

                //Assign the role "Employee" to all the users 
                await userManager.AddToRoleAsync(user, "Employee");
            }

            var admin = new AppUser
            {
                UserName = "Admin"
            };

            await userManager.CreateAsync(admin, "Pass123!");
            await userManager.AddToRoleAsync(admin, "Admin");
        }
    }
}