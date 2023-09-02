using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class GetPlanningWeekId
    {
        public GetPlanningDtoId Lundi {get; set;}
        public GetPlanningDtoId Mardi {get; set;}
        public GetPlanningDtoId Mercredi {get; set;}
        public GetPlanningDtoId Jeudi {get; set;}
        public GetPlanningDtoId Vendredi {get; set;}
        public GetPlanningDtoId Samedi {get; set;}
        public GetPlanningDtoId Dimanche {get; set;}
    }
}