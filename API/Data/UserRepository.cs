using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace API.Data

{
    public class UserRepository : IUserRepository
    {
    private readonly DataContext _context;
    private readonly IMapper _mapper;
    private readonly ILogger _logger;
    
    public UserRepository(DataContext context, IMapper mapper,ILogger<UserRepository> logger )
    {
        _mapper = mapper;
        _context = context;
        _logger = logger;
    }

        public void AddUser(AppUser user)
        {
           _context.Add(user);

        
        }

        public void Delete(AppUser user)
        {
               _context.Users.Remove(user);
        }

            public async Task<AppUser> GetUserByCinAsync(string cin)
            {
                return await _context.Users
                    
                        .SingleOrDefaultAsync(x => x.CIN == cin);
            }

        public async Task<AppUser> GetUserByIdAsync(int id)
        {
            return await _context.Users.FindAsync(id);
            
        }

        public async Task<IEnumerable<AppUser>> GetUsersAsync()
        {
           var users = await _context.Users.ToListAsync();
           return users;
        }

       

        public async Task<bool> SaveAlAsync()
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

        public void Update(AppUser user)
        {
            _context.Entry(user).State = EntityState.Modified;
        }
    }
}