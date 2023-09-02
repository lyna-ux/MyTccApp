using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using static API.Entities.AppUser;


namespace API.Data
{
    public class DataContext :IdentityDbContext <AppUser, AppRole,int, 
    IdentityUserClaim<int> , AppUserRole ,IdentityUserLogin<int>, 
    IdentityRoleClaim<int> , IdentityUserToken<int>>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
            
        }

        protected override void OnModelCreating(ModelBuilder builder)

         {
           base.OnModelCreating(builder);
            
            builder.Entity<AppUser>()
        .Property(u => u.Id)
        .ValueGeneratedOnAdd();
              // Join Tables
                //UserRole table
        
            builder.Entity<AppUser>()
                .HasMany(ur => ur.UserRoles)
                .WithOne(u=> u.User)
                .HasForeignKey(ur=>ur.UserId)
                .IsRequired();

            builder.Entity<AppRole>()
                .HasMany(ur => ur.UserRoles)
                .WithOne(u=> u.Role)
                .HasForeignKey(ur=>ur.RoleId)
                .IsRequired();

            //enum type to String
            builder.Entity<AppUser>()
             .Property(u =>u.Genre)
             .HasConversion(
             v => v.ToString(),
             v => (genre)Enum.Parse(typeof(genre), v)); 

            builder.Entity<AppUser>()
             .Property(u =>u.SituationFamiliale)
             .HasConversion(
             v => v.ToString(),
             v => (situationFamiliale)Enum.Parse(typeof(situationFamiliale), v));

            builder.Entity<AppUser>()
             .Property(u =>u.Statut)
             .HasConversion(
             v => v.ToString(),
             v => (statut)Enum.Parse(typeof(statut), v));   

             
             
             
            //  builder.Entity<Planning>()
            //     .HasMany(u => u.AppUsers)
            //     .WithOne(p => p.Planning)
            //     .HasForeignKey(u => u.PlanningId)
            //     .OnDelete(DeleteBehavior.Restrict);
                
            // builder.Entity<AppUser>()
            //         .HasOne(u => u.Planning)
            //         .WithMany(u => u.AppUsers)
            //         .HasForeignKey(u => u.PlanningId)
            //         .IsRequired();
          


               
        }

         public DbSet <AppUser> AppUsers   {get ; set; }  
         public DbSet <log> Logs   {get ; set; }  

        public DbSet<Planning> Plannings { get; set; }

        public DbSet<PlanningWeek> PlanningWeeks { get; set; }

         public DbSet<Demande> Demandes { get; set; }

        // public DbSet<Operation> Operations { get; set; }

        

        
    }
}