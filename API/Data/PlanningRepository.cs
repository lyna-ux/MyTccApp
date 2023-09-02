using AutoMapper;

using API.Interfaces;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class PlanningRepository : IPlanningRepository
    {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            private readonly ILogger _logger;
    
    public PlanningRepository(DataContext context, IMapper mapper,ILogger<PlanningRepository> logger )
    {
        _mapper = mapper;
        _context = context;
        _logger = logger;
    }
        public void AddPlanning(Planning planning)
        {
           _context.Add(planning);
        }

        public async Task<Planning> GetPlanningByIdAsync(int id)
        {
                return await _context.Plannings.FindAsync(id);

        }

        public Task<IEnumerable<Planning>> GetPlanningsAsync()
        {
            throw new NotImplementedException();
        }

       

        public void Update(Planning planning)
        {
            throw new NotImplementedException();
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

        public async Task<Planning> GetPlanningByRefPlanning(string refPlanning)
            {
                string sanitizedRefPlanning = refPlanning.Replace("_", "-");
             return await _context.Plannings
        .SingleOrDefaultAsync(x => x.refPlanning == sanitizedRefPlanning);
        }
    }
}