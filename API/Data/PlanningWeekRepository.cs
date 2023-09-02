using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class PlanningWeekRepository : IPlanningWeekRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        private readonly ILogger _logger;

        public PlanningWeekRepository(DataContext context, IMapper mapper,ILogger<PlanningWeekRepository> logger )
    {
        _mapper = mapper;
        _context = context;
        _logger = logger;
    }
        public void AddPlanningWeek(PlanningWeek planningWeek)
        {
             _context.Add(planningWeek);
        }

       public async Task<IEnumerable<PlanningWeek>> GetPlanningsWeekAsync()
            {
                var planningWeeks = await _context.PlanningWeeks
        .Include(pw => pw.Lundi)
        .Include(pw => pw.Mardi)
        .Include(pw => pw.Mercredi)
        .Include(pw => pw.Jeudi)
        .Include(pw => pw.Vendredi)
        .Include(pw => pw.Samedi)
        .Include(pw => pw.Dimanche)
        .ToListAsync();

    return planningWeeks;
            }
        public async Task<IEnumerable<string>> GetRefPlanningsAsync()
{
    var refPlannings = await _context.PlanningWeeks
        .Select(pw => pw.refPlanningWeek)
        .ToListAsync();

    return refPlannings;
}

        public Task<PlanningWeek> GetPlanningWeekByIdAsync(int id)
        {
            throw new NotImplementedException();
        }

       

        public Task<Planning> GetPlanningWeekgByIdAsync(int id)
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

        public void Update(PlanningWeek PlanningWeek)
        {
            throw new NotImplementedException();
        }

        async Task<PlanningWeek> IPlanningWeekRepository.GetPlanningWeekByRefPlanningWeek(string refPlanningWeek)
         {
                string sanitizedRefPlanning = refPlanningWeek.Replace("_", "-");
             return await _context.PlanningWeeks
        .SingleOrDefaultAsync(x => x.refPlanningWeek == sanitizedRefPlanning);
        }
    }
}