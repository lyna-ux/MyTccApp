using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;

namespace API.DTOs
{
    public class PlanningWeekDto
    {
        public string refPlanningWeek {get; set;}
        public string User {get; set;}
        public string Opération {get; set;}
        public PlanningDto Lundi {get; set;}
        public PlanningDto Mardi {get; set;}
        public PlanningDto Mercredi {get; set;}
        public PlanningDto Jeudi {get; set;}
        public PlanningDto Vendredi {get; set;}
        public PlanningDto Samedi {get; set;}
        public Planning Dimanche {get; set;}
    }
}