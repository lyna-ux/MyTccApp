
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("[controller]")]
    public class PlanningWeekController : ControllerBase
    {
        private readonly DataContext _context;

        private readonly IPlanningWeekRepository _planningWeekRepository;
        private readonly IMapper _mapper;
        private readonly ILogger<PlanningWeekController> _logger;
        private readonly HttpClient httpClient;

        private readonly PlanningController _planningController;
        public PlanningWeekController(DataContext context,IPlanningWeekRepository planningWeekRepository,
        IMapper mapper,ILogger<PlanningWeekController> logger,PlanningController planningController )
        {   
            _context = context;
            _planningWeekRepository = planningWeekRepository;
            _mapper = mapper;
            _logger = logger;
            _planningController= planningController;
            this.httpClient = new HttpClient();
        }

        [HttpPost("addPlanningWeek")]
        public void AddPlanningWeek([FromBody] AddPlanningWeekDto addPlanningWeekDto)
        {
            if (addPlanningWeekDto == null)
            {
                throw new ArgumentNullException(nameof(addPlanningWeekDto), "AddPlanningWeekDto cannot be null.");
            }

              // Map the userDto to an instance of AppUser

                var planningWeek = _mapper.Map<PlanningWeek>(addPlanningWeekDto); 
                        if (planningWeek == null)
                    {
                        throw new Exception("Mapping failed.");
                    }

            // Save the PlanningWeek entity to the database
            _planningWeekRepository.AddPlanningWeek(planningWeek);
            _planningWeekRepository.SaveAllAsync();

           
                planningWeek.refPlanningWeek = addPlanningWeekDto.refPlanningWeek;
                planningWeek.User = addPlanningWeekDto.User;
                planningWeek.Opération = addPlanningWeekDto.Opération;
                planningWeek.Lundi = _planningController.AddPlanning(addPlanningWeekDto.Lundi);
                planningWeek.Mardi = _planningController.AddPlanning(addPlanningWeekDto.Mardi);
                planningWeek.Mercredi = _planningController.AddPlanning(addPlanningWeekDto.Mercredi);
                planningWeek.Jeudi = _planningController.AddPlanning(addPlanningWeekDto.Jeudi);
                planningWeek.Vendredi = _planningController.AddPlanning(addPlanningWeekDto.Vendredi);
                planningWeek.Samedi = _planningController.AddPlanning(addPlanningWeekDto.Samedi);
                planningWeek.Dimanche = _planningController.AddPlanning(addPlanningWeekDto.Dimanche);
               
        }
        [HttpGet("getPlanningsWeek")]
        public async Task<IEnumerable<PlanningWeek>> GetPlanningsWeekAsync()
        {
            var planningWeeks = await _planningWeekRepository.GetPlanningsWeekAsync();
            return planningWeeks;
        }

        [HttpGet("getRefPlanningsWeek")]
        public async Task<IEnumerable<string>> GetRefPlanningsAsync()
        {
            var refPlannings = await _planningWeekRepository.GetRefPlanningsAsync();
        
            return refPlannings;
        }


        //The good one
//         [HttpGet("GetPlanningWeek")]
// public async Task<ActionResult<PlanningWeekDto>> GetPlanning(GetPlanningWeekDto getPlanningWeekDto)
// {
//     var planningWeek = await _planningWeekRepository.GetPlanningWeekByRefPlanningWeek(getPlanningWeekDto.refPlanningWeek);
//     if (planningWeek == null)
//     {
//         return NotFound();
//     }

//     var planningWeekDto = new PlanningWeekDto
//     {
//         refPlanningWeek = planningWeek.refPlanningWeek,
//         User = planningWeek.User,
//         Opération = planningWeek.Opération,
//         Lundi = await _planningController.GetPlanningById(planningWeek.Lundi.Id),
//         Mardi = await _planningController.GetPlanningById(planningWeek.Mardi.Id),
//         Mercredi = await _planningController.GetPlanningById(planningWeek.Mercredi.Id),
//         Jeudi = await _planningController.GetPlanningById(planningWeek.Jeudi.Id),
//         Vendredi = await _planningController.GetPlanningById(planningWeek.Vendredi.Id),
//         Samedi = await _planningController.GetPlanningById(planningWeek.Samedi.Id),
//         Dimanche = await _planningController.GetPlanningById(planningWeek.Dimanche.Id)
//     };

//     return planningWeekDto;
// }
[HttpGet("GetPlanningWeek")]
public async Task<ActionResult<PlanningWeekDto>> GetPlanning(GetPlanningWeekDto getPlanningWeekDto)
{
    var planningWeek = await _planningWeekRepository.GetPlanningWeekByRefPlanningWeek(getPlanningWeekDto.refPlanningWeek);
    
{
    await _context.Entry(planningWeek)
        .Reference(pw => pw.Lundi)
        .LoadAsync();

    await _context.Entry(planningWeek)
        .Reference(pw => pw.Mardi)
        .LoadAsync();

    await _context.Entry(planningWeek)
        .Reference(pw => pw.Mercredi)
        .LoadAsync();

    await _context.Entry(planningWeek)
        .Reference(pw => pw.Jeudi)
        .LoadAsync();

    await _context.Entry(planningWeek)
        .Reference(pw => pw.Vendredi)
        .LoadAsync();

    await _context.Entry(planningWeek)
        .Reference(pw => pw.Samedi)
        .LoadAsync();

    await _context.Entry(planningWeek)
        .Reference(pw => pw.Dimanche)
        .LoadAsync();
}




    var planningWeekDto = new PlanningWeekDto
    {
        refPlanningWeek = planningWeek.refPlanningWeek,
        User = planningWeek.User,
        Opération = planningWeek.Opération,
        Lundi = await _planningController.GetPlanningById(planningWeek.Lundi.Id),
        Mardi = await _planningController.GetPlanningById(planningWeek.Mardi.Id),
        Mercredi = await _planningController.GetPlanningById(planningWeek.Mercredi.Id),
        Jeudi = await _planningController.GetPlanningById(planningWeek.Jeudi.Id),
        Vendredi = await _planningController.GetPlanningById(planningWeek.Vendredi.Id),
        Samedi = await _planningController.GetPlanningById(planningWeek.Samedi.Id),
        Dimanche = await _planningController.GetPlanningById(planningWeek.Dimanche.Id)
    };

    return planningWeekDto;
}



//         [HttpGet("GetPlanningWeek")]
//     public async Task<ActionResult<PlanningWeekDto>> GetPlanning(GetPlanningWeekDto getPlanningWeekDto)
// {
//     var planningWeek = await _planningWeekRepository.GetPlanningWeekByRefPlanningWeek(getPlanningWeekDto.refPlanningWeek);
//     if (planningWeek == null)
//     {
//         return NotFound();
//     }

//     var planningWeekDto = new PlanningWeekDto
//     {
//         refPlanningWeek = planningWeek.refPlanningWeek,
//         User = planningWeek.User,
//         Opération = planningWeek.Opération,
//         Lundi = await _planningController.GetPlanningById(planningWeek.Lundi.Id),
        // Mardi = await _planningController.GetPlanningById(planningWeek.Mardi.Id),
        // Mercredi = await _planningController.GetPlanningById(planningWeek.Mercredi.Id),
        // Jeudi = await _planningController.GetPlanningById(planningWeek.Jeudi.Id),
        // Vendredi = await _planningController.GetPlanningById(planningWeek.Vendredi.Id),
        // Samedi = await _planningController.GetPlanningById(planningWeek.Samedi.Id),
        // Dimanche = await _planningController.GetPlanningById(planningWeek.Dimanche.Id)
//     };

//     return planningWeekDto;
// }


    //     [HttpGet("GetPlanningWeek")]
    // public async Task<ActionResult<PlanningDto>> GetPlanning(GetPlanningWeekDto getPlanningWeekDto ){
    //      var planningWeek = _mapper.Map<PlanningWeek>(getPlanningWeekDto);  
    //     planningWeek= await _planningWeekRepository.GetPlanningWeekByRefPlanningWeek(getPlanningWeekDto.refPlanningWeek);
    //     if (planningWeek == null)
    //         return NotFound();


    //         return new PlanningWeekDto

    //     {    
    //             planningWeek.refPlanningWeek = 
    //             planningWeek.User = 
    //             planningWeek.Opération = 
    //             planningWeek.Lundi = 
    //             planningWeek.Mardi = 
    //             planningWeek.Mercredi = 
    //             planningWeek.Jeudi =
    //             planningWeek.Vendredi =
    //             planningWeek.Samedi =
    //             planningWeek.Dimanche =
             
    //     };
    // }

    
//         [HttpPost("addPlanningWeekByrefPlaning")]

// public async Task AddPlanningWeekByrefPlaning([FromBody] AddPlanningWeekDtoByRef addPlanningWeekDtoByRef)
// {
//     // if (addPlanningWeekDtoByRef == null)
//     // {
//     //     throw new ArgumentNullException(nameof(AddPlanningWeekDtoByRef), "AddPlanningWeekDto cannot be null.");
//     // }

//     // Map the userDto to an instance of AppUser
//     var planningWeek = _mapper.Map<PlanningWeek>(addPlanningWeekDtoByRef);
//     if (planningWeek == null)
//     {
//         throw new Exception("Mapping failed.");
//     }

//     // Save the PlanningWeek entity to the database
//     _planningWeekRepository.AddPlanningWeek(planningWeek);
//     await _planningWeekRepository.SaveAllAsync();

//    // Retrieve the planning using GetPlanningDto
//     var getPlanningDto = new GetPlanningDto {
//         refPlanning="09-13 14-18"
//     };
   
//     // var planning = await _planningController.GetPlanning2(getPlanningDto);

   

//     // Assign the existing planning to each day
    
//     planningWeek.Lundi = await _planningController.GetPlanning2(addPlanningWeekDtoByRef.Lundi);
//     planningWeek.Mardi = await _planningController.GetPlanning2(addPlanningWeekDtoByRef.Mardi);
//     planningWeek.Mercredi = await _planningController.GetPlanning2(addPlanningWeekDtoByRef.Mercredi);
//     planningWeek.Jeudi = await _planningController.GetPlanning2(addPlanningWeekDtoByRef.Jeudi);
//     planningWeek.Vendredi = await _planningController.GetPlanning2(addPlanningWeekDtoByRef.Vendredi);
//     planningWeek.Samedi = await _planningController.GetPlanning2(addPlanningWeekDtoByRef.Samedi);
//     planningWeek.Dimanche = await _planningController.GetPlanning2(addPlanningWeekDtoByRef.Dimanche );
// }


    }
}