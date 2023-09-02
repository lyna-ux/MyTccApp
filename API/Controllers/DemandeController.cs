using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace API.Controllers
{
    [Route("[controller]")]
    public class DemandeController : BaseApiController
    {
        private readonly ILogger<DemandeController> _logger;
        private readonly DataContext _context;
        private readonly IDemandeRepository _demandeRepository;
        private readonly IMapper _mapper;
        private readonly HttpClient httpClient;
//       

        public DemandeController(DataContext context, IDemandeRepository demandeRepository , 
        IMapper mapper,ILogger<DemandeController> logger)
        {
           _context = context;
            _demandeRepository = demandeRepository;
            _mapper = mapper;
            _logger = logger;
            this.httpClient = new HttpClient();
        }

    [HttpPost("addDemande")]
    public async Task AddDemandeAsync ( [FromBody] AddDemandeDto addDemandeDto)

    {
         if (addDemandeDto == null)
    {
        throw new ArgumentNullException(nameof(addDemandeDto), "cannot be null.");
    }
          var nextRefDemande = GenerateNextRefDemande();
            
        // Map the userDto to an instance of AppUser
    
        var demande = _mapper.Map<Demande>(addDemandeDto); 
         if (demande == null)
    {
        throw new Exception("Mapping user DTO to AppUser failed.");
    }

        demande.refDemande = nextRefDemande;
        // Save the user in the database
         _demandeRepository.AddDemande(demande);
         await _demandeRepository.SaveAllAsync();
   
        

        // Map the user to UserDto and include the token
        var demandeDto = new DemandeDto
        {
            refDemande = demande.refDemande,
            NomDeposant = demande.NomDeposant,
            PrenomDeposant = demande.PrenomDeposant,
            MatriculeDeposant = demande.MatriculeDeposant,
            CinDeposant = demande.CinDeposant,
            NomTraitant = demande.NomTraitant,
            PrenomTraitant = demande.PrenomTraitant,
            //Statut = StatutMapping[demande.Statut],
            Type = demande.Type,
            commentaireTraitement = demande.commentaireTraitement,
            dateDepot= demande.dateDepot,
            dateTraitement=demande.dateTraitement,
            dateAnnulation =demande.dateAnnulation,
           
            
          
        }; 

       
    }
    
    

    [HttpGet("GetDemandes")]

     public async Task<ActionResult<IEnumerable<DemandeDto>>> GetDemandes()
    { 

         var demandes = await _demandeRepository.GetDemandesAsync();
         var GetDemandesDto = _mapper.Map<IEnumerable<GetDemandesDto>>(demandes);
         return Ok(GetDemandesDto);
    }

     [HttpGet("GetDemandesByService")]

     public async Task<ActionResult<IEnumerable<DemandeDto>>> GetDemandesByService([FromQuery] GetDemandeDto getetDemandeDto)
    { 

         var demandes = await _demandeRepository.GetDemandesByService(getetDemandeDto.service);
         var GetDemandesDto = _mapper.Map<IEnumerable<GetDemandesDto>>(demandes);
         return Ok(GetDemandesDto);
    }
    
     [HttpGet("GetDemandesByMatricule")]

     public async Task<ActionResult<IEnumerable<DemandeDto>>> GetDemandesByMatricule([FromQuery] GetDemandeDto getDemandeDto)
    { 

         var demandes = await _demandeRepository.GetDemandesByMatricule(getDemandeDto.matriculeDeposant);
         var GetDemandesDto = _mapper.Map<IEnumerable<GetDemandesDto>>(demandes);
         return Ok(GetDemandesDto);
    }

   [HttpGet("GetDemandeByRef")]
    public async Task<ActionResult<DemandeDto>> GetDemandeByRef([FromQuery] GetDemandeDto getDemandeDto)
    {
      var demande = _mapper.Map<Demande>(getDemandeDto);  
        demande= await _demandeRepository.GetDemandeByRef(getDemandeDto.refDemande);
        if (demande == null)
            return NotFound();

        

        return new DemandeDto
    {
        
            refDemande = demande.refDemande,
            NomDeposant = demande.NomDeposant,
            PrenomDeposant = demande.PrenomDeposant,
            MatriculeDeposant = demande.MatriculeDeposant,
            CinDeposant = demande.CinDeposant,
            NomTraitant = demande.NomTraitant,
            PrenomTraitant = demande.PrenomTraitant,
            Statut = demande.Statut,
            Type = demande.Type,
            details = demande.details,
            commentaireTraitement = demande.commentaireTraitement,
            dateDepot= demande.dateDepot,
            dateTraitement=demande.dateTraitement,
            dateAnnulation =demande.dateAnnulation,
    };
    }

    [HttpGet("GetDemandeByMatricule")]
    public async Task<ActionResult<DemandeDto>> GetDemandeByMatricule([FromQuery] GetDemandeDto getDemandeDto)
    {
      var demande = _mapper.Map<Demande>(getDemandeDto);  
        demande= await _demandeRepository.GetDemandeByMatricule(getDemandeDto.matriculeDeposant);
        if (demande == null)
            return NotFound();

        

        return new DemandeDto
    {
        
            refDemande = demande.refDemande,
            NomDeposant = demande.NomDeposant,
            PrenomDeposant = demande.PrenomDeposant,
            MatriculeDeposant = demande.MatriculeDeposant,
            CinDeposant = demande.CinDeposant,
            NomTraitant = demande.NomTraitant,
            PrenomTraitant = demande.PrenomTraitant,
            //Statut = StatutMapping[demande.Statut],
            Type = demande.Type,
            commentaireTraitement = demande.commentaireTraitement,
            dateDepot= demande.dateDepot,
            dateTraitement=demande.dateTraitement,
            dateAnnulation =demande.dateAnnulation,
    };
    }
//   [HttpPost("updateDemandeBymatricule")]
// public async Task<IActionResult> UpdateDemandeBymatricule([FromBody] UpdateDemandeDto updateDemandeDto)
//     {
//     var demande = await _demandeRepository.GetDemandeByMatricule(updateDemandeDto.matriculeDeposant);

//     if (demande != null)
//     {
//         // Map the properties from the DTO to the retrieved user entity
        
//         demande.Statut= updateDemandeDto.statut;
//         // Map other properties accordingly

//         _demandeRepository.Update(demande);
//         await _demandeRepository.SaveAllAsync();

//          var demandeDto = new DemandeDto
//         {   

//             Statut= demande.Statut        
//         }; 

//         return Ok(); // Return 200 OK status code if the update is successful
//     }

//     return NotFound(); // Return 404 Not Found status code if the user is not found
// }

[HttpPost("updateDemandeByRefTraitant")]
public async Task<IActionResult> updateDemandeByRefTraitant([FromBody] UpdateDemandeDto updateDemandeDto)
    {
    var demande = await _demandeRepository.GetDemandeByRef(updateDemandeDto.refDemande);

    if (demande != null)
    {
        // Map the properties from the DTO to the retrieved user entity
        demande.refDemande= updateDemandeDto.refDemande;
        demande.Statut= updateDemandeDto.statut;
        demande.NomTraitant= updateDemandeDto.NomTraitant;
        demande.PrenomTraitant= updateDemandeDto.PrenomTraitant;
        demande.commentaireTraitement= updateDemandeDto.commentaireTraitement;
        //demande.dateDepot= updateDemandeDto.dateDepot;
        demande.dateTraitement= updateDemandeDto.dateTraitement;
        demande.dateAnnulation= updateDemandeDto.dateAnnulation;
        

        // Map other properties accordingly

        _demandeRepository.Update(demande);
        await _demandeRepository.SaveAllAsync();

         var demandeDto = new DemandeDto
        {  
      

            refDemande= demande.refDemande  , 
            NomTraitant= demande.NomTraitant  , 
            PrenomTraitant= demande.PrenomTraitant  , 
            Statut= demande.Statut  , 
            commentaireTraitement= demande.commentaireTraitement,
            dateTraitement=demande.dateTraitement,
            dateAnnulation =demande.dateAnnulation,  
            
            
                 
        }; 

        return Ok(); // Return 200 OK status code if the update is successful
    }

    return NotFound(); // Return 404 Not Found status code if the user is not found
}

private string GenerateNextRefDemande()
{
    var lastDemande = _context.Demandes.OrderByDescending(d => d.refDemande).FirstOrDefault();

    if (lastDemande != null)
    {
        var lastRefDemande = lastDemande.refDemande;
        var lastNumber = int.Parse(lastRefDemande);

        if (lastNumber >= 9999999)
        {
            // Reset the number to 1 if it reaches the maximum value
            lastNumber = 1;
        }
        else
        {
            // Increment the number by 1
            lastNumber++;
        }

        // Format the number as a 7-digit string with leading zeros
        var nextRefDemande = lastNumber.ToString("D7");
        return nextRefDemande;
    }
    else
    {
        return "0000001"; // Default value if no demandes exist
    }
}

    

       
    }

    
}