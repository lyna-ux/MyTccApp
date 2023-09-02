using API.Entities;

namespace API.Interfaces
{
    public interface ILogRepository
    {
        
        Task<bool> SaveAllAsync();
        void AddLog(log Log);
        void UpdateLog(log Log);
        Task<IEnumerable<log>> GetLogsAsync();
        log GetLogByLogRef(string logRef);
        
    }
}