using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class PlanningWeek
    {   
        public int Id {get; set;}
        public string refPlanningWeek {get; set;}
        public string User {get; set;}
        public string Opération {get; set;}
        public Planning Lundi {get; set;}
        public Planning Mardi {get; set;}
        public Planning Mercredi {get; set;}
        public Planning Jeudi {get; set;}
        public Planning Vendredi {get; set;}
        public Planning Samedi {get; set;}
        public Planning Dimanche {get; set;}

       
    }
}