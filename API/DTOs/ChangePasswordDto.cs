using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class ChangePasswordDto
    {
        public string CIN { get; set; }
        public string Password { get; set; }
        public string NewPassword { get; set; }
    }
}