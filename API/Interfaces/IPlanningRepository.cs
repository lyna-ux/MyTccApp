
using API.Entities;

namespace API.Interfaces
{
    public interface IPlanningRepository
    {    
        
        void AddPlanning(Planning planning);    
        void Update(Planning planning);
        Task<bool> SaveAllAsync();
        Task<IEnumerable<Planning>> GetPlanningsAsync();
        Task<Planning> GetPlanningByIdAsync(int id);
        Task<Planning> GetPlanningByRefPlanning(string refPlanning);
     
    }
}