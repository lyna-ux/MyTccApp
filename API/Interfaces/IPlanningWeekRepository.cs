using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;

namespace API.Interfaces
{
    public interface IPlanningWeekRepository
    {
         void AddPlanningWeek(PlanningWeek planningWeek);
        void Update(PlanningWeek planningWeek);
        Task<bool> SaveAllAsync();
        Task<IEnumerable<PlanningWeek>> GetPlanningsWeekAsync();
        Task<IEnumerable<string>> GetRefPlanningsAsync();
        Task<PlanningWeek> GetPlanningWeekByIdAsync(int id);
        Task<PlanningWeek> GetPlanningWeekByRefPlanningWeek(string refPlanningWeek);
    }
}