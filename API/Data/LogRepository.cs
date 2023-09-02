using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class LogRepository : ILogRepository
    {

    private readonly DataContext _context;
    private readonly IMapper _mapper;

    private readonly ILogger _logger;

    public LogRepository(DataContext context, IMapper mapper,ILogger<UserRepository> logger )
    {
        _mapper = mapper;
        _context = context;
        _logger = logger;
    }
        public void AddLog(log Log)
        {
             _context.Add(Log);
        }

        public  log GetLogByLogRef(string logRef)
            {
                    var existingLog = _context.Logs.FirstOrDefault(log => log.logRef == logRef);
                    return existingLog;            
            }



        public async Task<IEnumerable<log>> GetLogsAsync()
        {
            var logs = await _context.Logs.ToListAsync();
           return logs;
        }

       

        public async Task<bool> SaveAllAsync()
        {
             try
    {
        // Save changes to the database asynchronously
        int affectedRows = await _context.SaveChangesAsync();

        // Return true if any rows were affected
        return affectedRows > 0;
    }
    catch (Exception ex)
    {
        // Log the error or perform any necessary error handling
        // Example: Log the exception message and stack trace
        _logger.LogError(ex, "An error occurred while saving changes.");

        // Return false indicating that an error occurred during saving
        return false;
    }
        }
     public void UpdateLog(log log)
    {
        _context.Entry(log).State = EntityState.Modified;
    }

    
     
    }

    

   
    
}