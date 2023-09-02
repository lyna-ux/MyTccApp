using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using API.Data;
namespace API.Entities
{
    [Table("logs")]
    public class log
    {
    //Log Informations
        public int Id {get; set;}
        [JsonConverter(typeof(DateOnlyJsonConverter))]
        public DateTime logDate { get; set; }

        public string Date { get; set; }
        public String logRef{get; set;}
        
        public string logOnTimeS1  { get; set; }
        public string logOffTimeS1  { get; set; }
        public string logOnTimeS2  { get; set; }
        public string logOffTimeS2  { get; set; }
        public string logDurationStr  { get; set; }
        public float logDurationNbr  { get; set; }
         public string breakDurationStr  { get; set; }
        public float breakDurationNbr  { get; set; }
        public string lunchBreakDurationStr  { get; set; }
        public float lunchBreakDurationNbr  { get; set; }
        public string formationDurationStr  { get; set; }
        public float formationDurationNbr  { get; set; }
        
        public LogStatus logStatus { get; set; }

        [JsonConverter(typeof(JsonStringEnumConverter))]
        

        public LogType logType { get; set; }
        
       
        public Hybride hybride { get; set; }

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
        public int Ticket{ get; set;}  

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