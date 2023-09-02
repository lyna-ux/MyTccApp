using Microsoft.AspNetCore.Identity;

namespace API.Entities
{
    public class AppUserRole: IdentityUserRole<int>
    {     public int Id { get; set; }

        public AppUser User { get; set; }
        public AppRole Role { get; set; }
    }
}