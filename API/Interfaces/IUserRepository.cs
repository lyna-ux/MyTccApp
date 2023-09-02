using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
    public interface IUserRepository
    {
        void Update(AppUser user);
        void Delete(AppUser user);
        Task<bool> SaveAlAsync();
        void AddUser(AppUser AppUser);
        Task<IEnumerable<AppUser>> GetUsersAsync();
        Task<AppUser> GetUserByIdAsync(int id);
        Task<AppUser> GetUserByCinAsync(string cin);
        
    }
}