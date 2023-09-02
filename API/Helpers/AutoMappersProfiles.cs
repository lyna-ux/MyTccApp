using API.DTOs;
using API.Entities;
using AutoMapper;
using static API.Entities.AppUser;

namespace API.Helpers
{
    public class AutoMappersProfiles : Profile

    {
        public AutoMappersProfiles()
        {
             CreateMap<AppUser, UserDto>()
                .ForMember(dest => dest.Genre, opt => opt.MapFrom(src => src.Genre.ToString()))
                .ForMember(dest => dest.SituationFamiliale, opt => opt.MapFrom(src => src.SituationFamiliale.ToString()))
                .ForMember(dest => dest.Statut, opt => opt.MapFrom(src => src.Statut.ToString()))
                .ForMember(dest => dest.DateNaissance, opt => opt.MapFrom(src => src.DateNaissance))
                .ForMember(dest => dest.DateEntree, opt => opt.MapFrom(src => src.DateEntree));
           
            CreateMap<RegisterDto,AppUser>();
            CreateMap<ChangePasswordDto,AppUser>();
            CreateMap<GetUserDto,AppUser>();
            CreateMap<AppUser, GetUsersDto>()
                 .ForMember(dest => dest.Genre, opt => opt.MapFrom(src => src.Genre.ToString()))
                .ForMember(dest => dest.SituationFamiliale, opt => opt.MapFrom(src => src.SituationFamiliale.ToString()))
                .ForMember(dest => dest.Statut, opt => opt.MapFrom(src => src.Statut.ToString()))
                .ForMember(dest => dest.DateNaissance, opt => opt.MapFrom(src => src.DateNaissance))
                .ForMember(dest => dest.DateEntree, opt => opt.MapFrom(src => src.DateEntree));
            
            CreateMap<log,LogDto>()
            .ForMember(dest => dest.logStatus, opt => opt.MapFrom(src => src.logStatus.ToString()))
            .ForMember(dest => dest.logType, opt => opt.MapFrom(src => src.logType.ToString()))
            .ForMember(dest => dest.hybride, opt => opt.MapFrom(src => src.hybride.ToString()));
            
            CreateMap<Planning,PlanningDto>();
            CreateMap<AddPlanningDto,Planning>();
            CreateMap<GetPlanningDto,Planning>();
             
            CreateMap<PlanningWeek,PlanningWeekDto>();
            CreateMap<AddPlanningWeekDto,PlanningWeek>();
            CreateMap<AddPlanningWeekDtoByRef,PlanningWeek>();
            CreateMap<GetPlanningWeekDto,PlanningWeek>();   

            

            CreateMap<AddUserDto,AppUser>()
                 .ForMember(dest => dest.DateNaissance, opt => opt.MapFrom(src => new DateOnly(src.DateNaissance.Year, src.DateNaissance.Month, src.DateNaissance.Day)))
                 .ForMember(dest => dest.DateEntree, opt => opt.MapFrom(src => new DateOnly(src.DateEntree.Year, src.DateEntree.Month, src.DateEntree.Day)))
                 .ForMember(dest => dest.DateSortie, opt => opt.MapFrom(src => new DateOnly(src.DateSortie.Year, src.DateSortie.Month, src.DateSortie.Day)))
                 .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.Nom + "." + src.IdSage));
            CreateMap<UpdateUserDto,AppUser>()
                 .ForMember(dest => dest.DateNaissance, opt => opt.MapFrom(src => new DateOnly(src.DateNaissance.Year, src.DateNaissance.Month, src.DateNaissance.Day)))
                 .ForMember(dest => dest.DateEntree, opt => opt.MapFrom(src => new DateOnly(src.DateEntree.Year, src.DateEntree.Month, src.DateEntree.Day)))
                 .ForMember(dest => dest.DateSortie, opt => opt.MapFrom(src => new DateOnly(src.DateSortie.Year, src.DateSortie.Month, src.DateSortie.Day)))
                 .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.Nom + "." + src.IdSage));
            
            CreateMap<AddLogDto,log>();   
            CreateMap<UpdateLogDto,log>() ;
               
            CreateMap<log, GetLogsDto>()
                .ForMember(dest => dest.LogStatus, opt => opt.MapFrom(src => src.logStatus))
                .ForMember(dest => dest.LogType, opt => opt.MapFrom(src => src.logType))
                .ForMember(dest => dest.Hybride, opt => opt.MapFrom(src => src.hybride))
                .ForMember(dest => dest.Operation, opt => opt.MapFrom(src => src.Opération));

                // .ForMember(dest => dest.logDate, opt => opt.MapFrom(src => new DateOnly(src.LogDate.Year, src.LogDate.Month, src.LogDate.Day)));

                //  .ForMember(dest => dest.logRef, opt => opt.MapFrom(src => src.AppUser.IdSage + "_" + src.LogDate.ToString("d")  ));     
        
            CreateMap<AddDemandeDto,Demande>();
            CreateMap<Demande, DemandeDto>() ;
            CreateMap<Demande, GetDemandesDto>();
            CreateMap<GetDemandeDto, Demande>();
             
        }
            
    
            
  
    }
}
        
    
