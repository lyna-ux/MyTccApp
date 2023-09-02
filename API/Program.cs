

using API.Data;
using API.Interfaces;
using API.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Identity;
using API.Entities;
using System.Text.Json.Serialization;
using API.Extensions;

var builder = WebApplication.CreateBuilder(args);

//Add services to the container.

builder.Services.AddControllers();
builder.Services.AddApplicationServices(builder.Configuration);
builder.Services.AddIdentityServices(builder.Configuration);

builder.Services.AddDbContext<DataContext>(opt =>
{
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});

// DateOnly & Enum JsonSerialization
builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.Converters.Add(new DateOnlyJsonConverter());
    options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());          
});
            
// **** Config replaced by IdentityServiceExtentions && ApplicationServiceExtentions***

            // builder.Services.AddCors();

            
            // builder.Services.AddIdentityCore<AppUser>(opt =>
            // {
            //     opt.Password.RequireNonAlphanumeric = false;
            // })
            //     .AddRoles<AppRole>()
            //     .AddRoleManager<RoleManager<AppRole>>()
            //     .AddEntityFrameworkStores<DataContext>();

           
            // builder.Services.AddScoped<ITokenService, TokenService>();
            // builder.Services.AddScoped<IUserRepository , UserRepository>();
            // builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
          

            // builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            // .AddJwtBearer(options =>
            // {
            //     options.TokenValidationParameters = new  TokenValidationParameters
            //     {
            //         ValidateIssuerSigningKey = true,
            //         IssuerSigningKey = new SymmetricSecurityKey(Encoding.
            //         UTF8.GetBytes(builder.Configuration ["TokenKey"])),
            //         ValidateIssuer = false,
            //         ValidateAudience = false,

            //     };
                
            // });

//********End of conifg**********


// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();



var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseCors(builder => builder
    .AllowAnyHeader()
    .AllowAnyMethod()
    .AllowCredentials()
    .WithOrigins("http://localhost:4200" ));

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;
try
{
    var context = services.GetRequiredService<DataContext>();
    var userManager = services.GetRequiredService<UserManager<AppUser>>();
    var roleManager = services.GetRequiredService<RoleManager<AppRole>>();
    await context.Database.MigrateAsync(); // Asynchronously applies any pending migrations & create the database if it does not already exist.
    //await Seed.ClearConnections(context);
   await Seed.SeedUsers(userManager,roleManager);
}
catch (Exception ex)
{
    var logger = services.GetService<ILogger<Program>>();
    logger.LogError(ex, "An error occurred during migration");
}

app.Run();
