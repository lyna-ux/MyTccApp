using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;


namespace API.Controllers
{
     [Route("[controller]")]
    public class PlanningController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IPlanningRepository _planningRepository;
        private readonly IMapper _mapper;
        private readonly ILogger<PlanningController> _logger;
        private readonly HttpClient httpClient;

        public PlanningController(DataContext context, IPlanningRepository  planningRepository, IMapper mapper,
        ILogger<PlanningController> logger )
        {
            _context = context;
            _planningRepository =planningRepository;
            _mapper = mapper;
            _logger = logger;
            this.httpClient = new HttpClient();
        }

        [HttpPost("addPlanning")]
    public Planning AddPlanning( [FromBody] AddPlanningDto addPlanningDto)
    {

         if (addPlanningDto == null)
    {
        throw new ArgumentNullException(nameof(addPlanningDto), "LogDto cannot be null.");
    }
        // Map the userDto to an instance of AppUser
    
        var planning = _mapper.Map<Planning>(addPlanningDto); 
                 if (planning == null)
    {
        throw new Exception("Mapping  failed.");
    }
        // Save the user in the database
          _planningRepository.AddPlanning(planning);
         _planningRepository.SaveAllAsync();
   
      

        // // Map the planning to planningDto and include the token
         var planningDto = new PlanningDto

        {    
            refPlanning=planning.refPlanning,
            HeureDebut_S1 = planning.HeureDebut_S1,
            HeureFin_S1 = planning.HeureFin_S1,
            HeureDebut_S2 = planning.HeureDebut_S2,
            HeureFin_S2 = planning.HeureFin_S1,
            HeuresPlanifie=planning.HeuresPlanifie,
             
        };
         return planning;
 
    }

    [HttpGet("GetPlanning")]
    public async Task<ActionResult<PlanningDto>> GetPlanning(GetPlanningDto getPlanningDto ){
         var planning = _mapper.Map<Planning>(getPlanningDto);  
        planning= await _planningRepository.GetPlanningByRefPlanning(getPlanningDto.refPlanning);
        if (planning == null)
            return NotFound();


            return new PlanningDto

        {    
            refPlanning=planning.refPlanning,
            HeureDebut_S1 = planning.HeureDebut_S1,
            HeureFin_S1 = planning.HeureFin_S1,
            HeureDebut_S2 = planning.HeureDebut_S2,
            HeureFin_S2 = planning.HeureFin_S1,
            HeuresPlanifie=planning.HeuresPlanifie,
             
        };
    }

[HttpGet("GetPlanning2")]
public async Task<Planning> GetPlanning2(GetPlanningDto getPlanningDto)
{
    var planning = await _planningRepository.GetPlanningByRefPlanning(getPlanningDto.refPlanning);
    if (planning == null)
        return null;

    var planningDto = _mapper.Map<PlanningDto>(planning);
    return planning;
}

// [HttpGet("GetPlanningById")]
// public async Task<ActionResult<PlanningDto>> GetPlanningById(int Id)
// {
   

//     var planning = await _planningRepository.GetPlanningByIdAsync(Id);

//     if (planning == null)
//     {
//         return NotFound();
//     }

//     var planningDto = _mapper.Map<PlanningDto>(planning);

//     return Ok(planningDto);
// }

[HttpGet("GetPlanningById")]
public async Task<PlanningDto> GetPlanningById(int id)
{
    var planning = await _planningRepository.GetPlanningByIdAsync(id);
    if (planning != null)
    {
        var planningDto = _mapper.Map<PlanningDto>(planning);
        return planningDto;
    }

    return null; // Handle if planning is not found
}

        
    }

     
        
}