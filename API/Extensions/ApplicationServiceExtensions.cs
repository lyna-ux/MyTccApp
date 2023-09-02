using API.Controllers;
using API.Data;
using API.Interfaces;
using API.Services;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services,
        IConfiguration config)

        {
            services.AddCors();
            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<IUserRepository , UserRepository>();
            services.AddScoped<ILogRepository , LogRepository>();
            services.AddScoped<IPlanningRepository , PlanningRepository>();
            services.AddScoped<IPlanningWeekRepository , PlanningWeekRepository>();
            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
            services.AddScoped<PlanningController>();
            services.AddScoped<IDemandeRepository , DemandeRepository>();

            return services;
        }
    }
}