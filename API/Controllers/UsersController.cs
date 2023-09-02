using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using API.Services;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;


namespace API.Controllers
{
    public class UsersController : ControllerBase
{
    private readonly DataContext _context;
    private readonly IUserRepository _userRepository;
    private readonly IMapper _mapper;
    private readonly ITokenService _tokenService;       
    private readonly UserManager<AppUser>   _userManager;

    private readonly RoleManager<AppRole>   _roleManager;
   
    
    public UsersController(DataContext context, IUserRepository userRepository, IMapper mapper,
     ITokenService tokenService, UserManager<AppUser> userManager , RoleManager<AppRole> roleManager )
    {
        _mapper = mapper;
        _userRepository = userRepository;
        _context = context;
        _tokenService= tokenService;
        _userManager = userManager;
        _roleManager = roleManager;
        
    }

    [HttpGet("GetUser")]
    public async Task<ActionResult<UserDto>> GetUser(GetUserDto getUserDto )
    {
        var user = _mapper.Map<AppUser>(getUserDto);  
        user= await _userRepository.GetUserByCinAsync(getUserDto.CIN);
        if (user == null)
            return NotFound();

         var token = _tokenService.CreateToken(user);

        return new UserDto
    {
        
        Prenom=user.Prenom,
        Nom=user.Nom,
        CIN=user.CIN,
        IdSage=user.IdSage,
        Adresse=user.Adresse,
        AdresseEmail = user.AdresseEmail,
        Tel=user.Tel,
        DateNaissance=user.DateNaissance,
        Genre= (UserDto.genre)user.Genre,
        SituationFamiliale= (UserDto.SituationFamilialeEnum)user.SituationFamiliale,
        DateEntree=user.DateEntree,
        DateSortie=user.DateSortie,
        SoldeConge=user.SoldeConge,
        Statut= (UserDto.StatutEnum)user.Statut,
        Badge=user.Badge,
        refPlanningWeek=user.refPlanningWeek,
        logRef=user.logRef,
        Opération=user.Opération,
        Poste=user.Poste,
        UserName = user.UserName,
        Token = token,
        Password =user.PasswordHash,
        
    };
    }
    [HttpPost("addUser")]
    public void AddUser( [FromBody] AddUserDto addUserDto)

    {
         if (addUserDto == null)
    {
        throw new ArgumentNullException(nameof(addUserDto), "User DTO cannot be null.");
    }

            
        // Map the userDto to an instance of AppUser
    
        var user = _mapper.Map<AppUser>(addUserDto); 
         if (user == null)
    {
        throw new Exception("Mapping user DTO to AppUser failed.");
    }

        // Save the user in the database
         _userRepository.AddUser(user);
         _userRepository.SaveAlAsync();
   
        // Create a token for the user
        var token = _tokenService.CreateToken(user);

        // Map the user to UserDto and include the token
        var userDto = new UserDto
        {
            UserName = user.UserName,
            AdresseEmail = user.AdresseEmail,
            IdSage= user.IdSage,
            logRef=user.logRef,
            Poste=user.Poste,
            Token = token,
          
        }; 

       
    }


    [HttpGet("Getusers")]
    public async Task<ActionResult<IEnumerable<UserDto>>> GetUsers()
    {
    var users = await _userRepository.GetUsersAsync();
    var GetUsersDto = _mapper.Map<IEnumerable<GetUsersDto>>(users);
        
        

    foreach (var us in GetUsersDto)
    { 
        var user = await _userRepository.GetUserByCinAsync(us.CIN);
        if (user != null)
        {
            var hasPassword = await _userManager.HasPasswordAsync(user);
            us.Password = hasPassword;

            var roles = await _userManager.GetRolesAsync(user);
            us.RoleName = roles.FirstOrDefault(); // Assuming the user has a single role
        }
        else
        {
            // Handle the case where the user is not found
            us.Password = false;
             us.RoleName = ""; // or any default value you want to set
        }
    }

        return Ok(GetUsersDto);

        }

        //  [HttpPost("deleteUser")]
        // public async Task DeleteUser( [FromQuery] string userCin)
        //     {
        //         var user = await _userRepository.GetUserByCinAsync(userCin);
        //         if (user != null) {
        //             _userRepository.Delete(user);
        //             await _userRepository.SaveAlAsync();
        //         }
        //     }

[HttpPost("deleteUser")]
public async Task<IActionResult> DeleteUser([FromBody] string userCin)
{
    // Your deletion logic using the userCin value
    // Here's an example using SQLite
    var user = await _userRepository.GetUserByCinAsync(userCin);

    if (user != null)
    {
        _userRepository.Delete(user);
        await _userRepository.SaveAlAsync();

        return Ok(); // Return 200 OK status code if the deletion is successful
    }

    return NotFound(); // Return 404 Not Found status code if the user is not found
}

// [HttpPost("updateUser")]
// public async Task<IActionResult> UpdateUser([FromBody]UpdateUserDto updateUserDto)
// {
//     // Your deletion logic using the userCin value
//     // Here's an example using SQLite
    
//     var user = await _userRepository.GetUserByCinAsync(updateUserDto.CIN);

//     if (user != null)
//     {
//         _mapper.Map(updateUserDto, user);
//         _userRepository.Update(user);
//         await _userRepository.SaveAlAsync();

//         return Ok(); // Return 200 OK status code if the UPDATE is successful
//     }

//     return NotFound(); // Return 404 Not Found status code if the user is not found
// }

[HttpPost("updateUser")]
public async Task<IActionResult> UpdateUser([FromBody] UpdateUserDto updateUserDto)
{
    var user = await _userRepository.GetUserByCinAsync(updateUserDto.CIN);

    if (user != null)
    {
       
        
        user.refPlanningWeek= updateUserDto.refPlanningWeek;
        //user.Adresse= updateUserDto.Adresse;
        // user.AdresseEmail= updateUserDto.AdresseEmail;
        // user.Tel= updateUserDto.Tel;
       

        _userRepository.Update(user);
        await _userRepository.SaveAlAsync();

         var userDto = new UserDto
        {   
            CIN =user.CIN,
            Nom = user.Nom,
            Prenom = user.Prenom,
            refPlanningWeek= user.refPlanningWeek,
            // Adresse=user.Adresse,
            // AdresseEmail=user.AdresseEmail,
            // Tel=user.Tel,
            logRef=user.logRef,
            Opération=user.Opération,
            Poste=user.Poste,            
        }; 

        return Ok(); // Return 200 OK status code if the update is successful
    }

    return NotFound(); // Return 404 Not Found status code if the user is not found
}

[HttpPost("updateUserByEmployee")]
public async Task<IActionResult> UpdateUserByEmployee([FromBody] UpdateUserDto updateUserDto)
{
    var user = await _userRepository.GetUserByCinAsync(updateUserDto.CIN);

    if (user != null)
    {
       
        
      
        user.Adresse= updateUserDto.Adresse;
        user.AdresseEmail= updateUserDto.AdresseEmail;
        user.Tel= updateUserDto.Tel;
       

        _userRepository.Update(user);
        await _userRepository.SaveAlAsync();

         var userDto = new UserDto
        {   
            CIN =user.CIN,
            Nom = user.Nom,
            Prenom = user.Prenom,
            Adresse=user.Adresse,
            AdresseEmail=user.AdresseEmail,
            Tel=user.Tel,
            Poste=user.Poste,            
        }; 

        return Ok(); // Return 200 OK status code if the update is successful
    }

    return NotFound(); // Return 404 Not Found status code if the user is not found
}


       


}

      
}