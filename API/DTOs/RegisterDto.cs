using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class RegisterDto
    {
        
        
        [Required]
        public string CIN { get; set; }
       
        [Required]
        public string Password { get; set; }

    
        [Required]
        public string SelectedRole { get; set; }            
    }
}