using System.Text;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using API.Services;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("[controller]")]
    public class AccountController : BaseApiController
    {
        
        private readonly UserManager<AppUser> _userManager;
        private readonly ITokenService _tokenService;
         private readonly IMapper _mapper;
         private readonly IUserRepository _userRepository;
         
         private readonly RoleManager<AppRole>   _roleManager;       

        public AccountController (UserManager<AppUser> userManager , RoleManager<AppRole> roleManager,
        ITokenService tokenService ,
         IMapper mapper , IUserRepository userRepository)
        { 
            _userManager = userManager;
            _tokenService = tokenService;
            _mapper = mapper;
            _userRepository = userRepository ;
            _roleManager = roleManager;
        }


        [HttpPost("Register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto )
        
        {
            var appUser = _mapper.Map<AppUser>(registerDto);

            // // Retrieve the list of roles using the GetRoles endpoint
            // var rolesResponse = await GetRoles();
            // if (rolesResponse.Result is NotFoundResult)
            // {
            //     return NotFound("Roles not found");
            // }
            // var allRoles = (List<string>)rolesResponse.Value;

            appUser = await _userRepository.GetUserByCinAsync(registerDto.CIN);

                if (appUser == null)
                {
                    return NotFound("User not found");

                }
            // Create the password to the user

            //registerDto.Password = GeneratePassword();
            await _userManager.AddPasswordAsync(appUser, registerDto.Password);

            // // Check if the provided role exists in the allRoles list
            // if (!allRoles.Contains(registerDto.SelectedRole))
            // {
            //     return BadRequest("Invalid role name");
            // }

            //  Assign the role to the user
            await _userManager.AddToRoleAsync(appUser, registerDto.SelectedRole);
                 
            //update changement to the DB

             var result = await _userManager.UpdateAsync(appUser);
            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }
            var token = _tokenService.CreateToken(appUser);

            return new UserDto
            {
                UserName = appUser.UserName,
                Prenom=appUser.Prenom,
                Nom=appUser.Nom,
                AdresseEmail = appUser.AdresseEmail,
                Password =registerDto.Password,
                RoleName=registerDto.SelectedRole,
                Token = token,
                refPlanningWeek=appUser.refPlanningWeek,
                Opération=appUser.Opération,
                logRef=appUser.logRef,
                

            };
        } 
        [HttpGet("Roles")]
        public async Task<ActionResult<List<string>>> GetRoles()
        {
            var allRoles = await _roleManager.Roles.Select(r => r.Name).ToListAsync();
            return allRoles;
        }




        [HttpPost("ChangePassword")]
        public async Task<ActionResult<UserDto>> ChnagePassword(ChangePasswordDto changePasswordDto)
        {
            var appUser = _mapper.Map<AppUser>(changePasswordDto);
            appUser = await _userRepository.GetUserByCinAsync(changePasswordDto.CIN);
    
             if (appUser == null)
            {
                return NotFound("User not found");
            }

            // Set the password user
    
            var result = await _userManager.ChangePasswordAsync(appUser,changePasswordDto.Password,changePasswordDto.NewPassword);

            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            await _userManager.UpdateAsync(appUser);
            var token = _tokenService.CreateToken(appUser);

            return new UserDto
            {
                UserName = appUser.UserName,
                AdresseEmail = appUser.AdresseEmail,
                Password =changePasswordDto.NewPassword,
                Token = token
            };
        } 

    [HttpPost("ResetPassword")]
    public async Task<IActionResult> ResetPassword(ResetPasswordDto resetPasswordDto)
    {
    var user = await _userRepository.GetUserByCinAsync(resetPasswordDto.CIN);

    if (user == null)
    {
        return NotFound("User not found");
    }

    var newPasswordHash = _userManager.PasswordHasher.HashPassword(user, resetPasswordDto.NewPassword);
    user.PasswordHash = newPasswordHash;

    var result = await _userManager.UpdateAsync(user);

    if (!result.Succeeded)
    {
        return BadRequest(result.Errors);
    }

    return Ok();
}








        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _userManager.Users
               
                .SingleOrDefaultAsync(x => x.UserName == loginDto.UserName);

            if (user == null) return Unauthorized("invalid username");

            var result = await _userManager.CheckPasswordAsync(user, loginDto.Password);

            if (!result) return Unauthorized("Invalid password");

            var roles = await _userManager.GetRolesAsync(user);
            

             var token = _tokenService.CreateToken(user);

             

            return new UserDto
            {
                UserName = user.UserName,
                Prenom=user.Prenom,                              
                Nom=user.Nom,
                CIN=user.CIN,
                IdSage=user.IdSage,
                AdresseEmail = user.AdresseEmail,
                Token = token,
                RoleName=roles.FirstOrDefault(),
                refPlanningWeek=user.refPlanningWeek,
                Opération=user.Opération,
                logRef=user.logRef,
                Poste =user.Poste,
                

               
            };
        }

        [HttpGet]
        public string GeneratePassword()
        {
            var options = _userManager.Options.Password;

            int length = options.RequiredLength;

            bool nonAlphanumeric = options.RequireNonAlphanumeric;
            bool digit = options.RequireDigit;
            bool lowercase = options.RequireLowercase;
            bool uppercase = options.RequireUppercase;

            StringBuilder password = new StringBuilder();
            Random random = new Random();

            while (password.Length < length)
            {
                char c = (char)random.Next(32, 126);

                password.Append(c);

                if (char.IsDigit(c))
                    digit = false;
                else if (char.IsLower(c))
                    lowercase = false;
                else if (char.IsUpper(c))
                    uppercase = false;
                else if (!char.IsLetterOrDigit(c))
                    nonAlphanumeric = false;
            }

            if (nonAlphanumeric)
                password.Append((char)random.Next(33, 48));
            if (digit)
                password.Append((char)random.Next(48, 58));
            if (lowercase)
                password.Append((char)random.Next(97, 123));
            if (uppercase)
                password.Append((char)random.Next(65, 91));

            return password.ToString();
        }
    }




}



    


