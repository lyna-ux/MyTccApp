using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;

namespace API.DTOs
{
    public class AddLogDto
    {
        //public DateTime LogDate { get; set; }//
        public string Date { get; set; }
        public string LogRef { get; set; }// LogDate+Idage
        public string LogOnTimeS1 { get; set; }//
        public string LogOffTimeS1 { get; set; }//
        public string LogOnTimeS2 { get; set; }//
        public string LogOffTimeS2 { get; set; }//
        public string LogDurationStr { get; set; }//
        public float LogDurationNbr { get; set; }//
        // public string BreakDurationStr { get; set; }
        // public float BreakDurationNbr { get; set; }//
        // public string LunchBreakDurationStr { get; set; }//
        // public float LunchBreakDurationNbr { get; set; }//
        // public string FormationDurationStr { get; set; }//
        // public float FormationDurationNbr { get; set; }//
        public string LogStatus { get; set; }
        public string LogType { get; set; }
        public string Hybride { get; set; }

         //User Informations
        public int AppUserId  { get; set;}
        public int IdSage{ get; set; } 
        public string Opération {get; set;}
        public string CIN { get; set; }
        public string Nom { get; set; }
        public string Prenom { get; set; }
        public string refPlanningWeek{ get; set; }
    }
}