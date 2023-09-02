using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;

namespace API.DTOs
{
    public class AddPlanningWeekDto
    {
        public string refPlanningWeek {get; set;}
        public string User {get; set;}
        public string Opération {get; set;}
        public AddPlanningDto Lundi {get; set;}
        public AddPlanningDto Mardi {get; set;}
        public AddPlanningDto Mercredi {get; set;}
        public AddPlanningDto Jeudi {get; set;}
        public AddPlanningDto Vendredi {get; set;}
        public AddPlanningDto Samedi {get; set;}
        public AddPlanningDto Dimanche {get; set;}
    }
}