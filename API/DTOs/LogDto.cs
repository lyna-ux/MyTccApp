using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class LogDto
    {
        public DateTime LogDate { get; set; }
        public string Date { get; set; }
        public string LogRef { get; set; }
        public string LogOnTimeS1 { get; set; }
        public string LogOffTimeS1 { get; set; }
        public string LogOnTimeS2 { get; set; }
        public string LogOffTimeS2 { get; set; }
        public string LogDurationStr { get; set; }
        public float LogDurationNbr { get; set; }
        public string BreakDurationStr { get; set; }
        public float BreakDurationNbr { get; set; }
        public string LunchBreakDurationStr { get; set; }
        public float LunchBreakDurationNbr { get; set; }
        public string FormationDurationStr { get; set; }
        public float FormationDurationNbr { get; set; }
        public LogStatus logStatus { get; set; }
         [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum LogStatus
        {
            [Description("présent")]
            Present,

            [Description("absent")]
            absent,

            [Description("retard")]
            retard,

            [Description("congé")]
            conge,

            [Description("maladie")]
            maladie,

            [Description("FPE")]
            FPE,
            [Description("Démissionné")]
            demissionne,
        }
        public LogType logType { get; set; }
        public Hybride hybride { get; set; }
         [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum LogType { 
            Production,
            Formation}


     [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum Hybride {

            [Description("Sur site")]
            Site,
            [Description("Télétravail")]
            Teletravail}

         //User Informations
       
        public int IdSage{ get; set; } 
        public string Opération {get; set;}
        public string CIN { get; set; }
        public string Nom { get; set; }
        public string Prenom { get; set; }
        public string refPlanningWeek{ get; set; }
    }
}