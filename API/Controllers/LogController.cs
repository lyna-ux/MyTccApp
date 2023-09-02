using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Threading.Tasks;

namespace API.Controllers
{
      [Route("[controller]")]
    public class LogController : ControllerBase
    {   
        private readonly DataContext _context;
        private readonly ILogRepository _logRepository;
        private readonly IMapper _mapper;
        private readonly ILogger<LogController> _logger;
        private readonly HttpClient httpClient;
        
    

        public LogController(DataContext context, ILogRepository logRepository , 
        IMapper mapper,ILogger<LogController> logger)
        {
            _context = context;
            _logRepository = logRepository;
            _mapper = mapper;
            _logger = logger;
            this.httpClient = new HttpClient();
        }


    //    [HttpPost("addLog")]
    // public void AddLog( [FromBody] AddLogDto addLogDto)

    // {
    //      if (addLogDto == null)
    // {
    //     throw new ArgumentNullException(nameof(addLogDto), "LogDto cannot be null.");
    // }

            
    //     // Map the userDto to an instance of AppUser
    
    //     var log = _mapper.Map<log>(addLogDto); 
    //      if (log == null)
    // {
    //     throw new Exception("Mapping log DTO to AppUser failed.");
    // }

    //     // Save the user in the database
    //      _logRepository.AddLog(log);
    //      _logRepository.SaveAllAsync();
   
    

    //     // Map the user to UserDto and include the token
    //     var logDto = new LogDto
    //     {   
    //         LogRef=log.logRef,
    //         CIN=log.CIN,

    //         Date =log.Date,
    //         Opération=log.Opération,
    //         IdSage=log.IdSage,
    //         Nom=log.Nom,
    //         Prenom=log.Prenom,
    //         logStatus= (LogDto.LogStatus)log.logStatus,
    //         LogOnTimeS1 = log.logOnTimeS1,
    //         LogOffTimeS1= log.logOffTimeS1,
    //         LogOnTimeS2 = log.logOffTimeS1,
    //         LogOffTimeS2 = log.logOffTimeS2,
    //         LogDurationStr= log.logDurationStr,
    //         LogDurationNbr = log.logDurationNbr,
    //         logType= (LogDto.LogType)log.logType,
    //         hybride= (LogDto.Hybride)log.hybride,

    //         // BreakDurationStr=log.breakDurationStr,
    //         // LunchBreakDurationStr=log.lunchBreakDurationStr,
    //         // LunchBreakDurationNbr=log.lunchBreakDurationNbr,
    //          //User Informations
    //         //AppUserId = log.AppUserId,
  

    //     };

       
    // }

    [HttpGet("GetLogs")]

     public async Task<ActionResult<IEnumerable<LogDto>>> GetLogs()
    { 

         var logs = await _logRepository.GetLogsAsync();
         var GetLogsDto = _mapper.Map<IEnumerable<GetLogsDto>>(logs);
         return Ok(GetLogsDto);
    }

    [HttpGet("GetLogByLogRef")]
    public async Task<ActionResult<LogDto>> GetLogByLogRef([FromQuery] GetLogDto getLogDto)
    {
        if (getLogDto == null || string.IsNullOrEmpty(getLogDto.LogRef))
        {
            return BadRequest("Invalid input"); // Return 400 Bad Request if the input is invalid
        }

        var log =  _logRepository.GetLogByLogRef(getLogDto.LogRef);

        if (log == null)
        {
            return NotFound(); // Return 404 Not Found if log is not found
        }


        var logDto = _mapper.Map<LogDto>(log);

        return Ok(logDto); // Return the log DTO if found
    }
    [HttpPut("updateLog")]
public IActionResult UpdateLog([FromBody] UpdateLogDto updateLogDto)
{
    if (updateLogDto == null)
    {
        return BadRequest("Invalid input"); // Return 400 Bad Request if the input is invalid
    }

    var log = _logRepository.GetLogByLogRef(updateLogDto.logRef);

    if (log == null)
    {
        return NotFound(); // Return 404 Not Found if log is not found
    }

    // Update the properties of the log based on the values in the updateLogDto
    log.logOnTimeS1 = updateLogDto.LogOnTimeS1;
    log.logOffTimeS1 = updateLogDto.LogOffTimeS1;
    log.logOnTimeS2 = updateLogDto.LogOnTimeS2;
    log.logOffTimeS2 = updateLogDto.LogOffTimeS2;
    // Update other properties as needed

    _logRepository.UpdateLog(log);
    _logRepository.SaveAllAsync();

    return NoContent(); // Return 204 No Content to indicate successful update
}

[HttpPost("addLog")]
public void AddLog2([FromBody] AddLogDto addLogDto)
{
    if (addLogDto == null)
    {
        throw new ArgumentNullException(nameof(addLogDto), "LogDto cannot be null.");
    }

    var existingLog = _logRepository.GetLogByLogRef(addLogDto.LogRef);

    if (existingLog != null)
    {
        // Log with the same LogRef already exists, update it with the new values
        existingLog.logOnTimeS1 = addLogDto.LogOnTimeS1; // Update with the new values
        existingLog.logOffTimeS1 = addLogDto.LogOffTimeS1;
        existingLog.logOnTimeS2 = addLogDto.LogOnTimeS2;
        existingLog.logOffTimeS2 = addLogDto.LogOffTimeS2;
        existingLog.logDurationStr = addLogDto.LogDurationStr;

        // Update other properties as needed

        _logRepository.UpdateLog(existingLog);
        _logRepository.SaveAllAsync();
    }
    else
    {
        //Log does not exist, create a new log
        var log = _mapper.Map<log>(addLogDto);

             if (log == null)
    {
        throw new Exception("Mapping log DTO to AppUser failed.");
    }

        _logRepository.AddLog(log);
        _logRepository.SaveAllAsync();

        var logDto = new LogDto
        {   
            LogRef=log.logRef,
            CIN=log.CIN,

            Date =log.Date,
            Opération=log.Opération,
            IdSage=log.IdSage,
            Nom=log.Nom,
            Prenom=log.Prenom,
            logStatus= (LogDto.LogStatus)log.logStatus,
            LogOnTimeS1 = log.logOnTimeS1,
            LogOffTimeS1= log.logOffTimeS1,
            LogOnTimeS2 = log.logOffTimeS1,
            LogOffTimeS2 = log.logOffTimeS2,
            LogDurationStr= log.logDurationStr,
            LogDurationNbr = log.logDurationNbr,
            logType= (LogDto.LogType)log.logType,
            hybride= (LogDto.Hybride)log.hybride,

            // BreakDurationStr=log.breakDurationStr,
            // LunchBreakDurationStr=log.lunchBreakDurationStr,
            // LunchBreakDurationNbr=log.lunchBreakDurationNbr,
             //User Informations
            //AppUserId = log.AppUserId,
  

        };

    }

   
}



    
}
}