using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using API.Data;

namespace API.DTOs
{
    public class UserDto

    {
        public string Nom  { get; set; } 
        public string Prenom  { get; set; }         
        public string CIN { get; set; }
        public int IdSage { get; set; }
        public string Adresse { get; set; }
        [DataType(DataType.EmailAddress)]
        [EmailAddress(ErrorMessage = "Invalid email address")]
        public string AdresseEmail { get; set; }

        [DataType(DataType.PhoneNumber)]
        [Phone(ErrorMessage = "Invalid phone number")]
        public string Tel { get; set; }

        [JsonConverter(typeof(DateOnlyJsonConverter))]
        public DateOnly DateNaissance { get; set; }

         [JsonConverter(typeof(JsonStringEnumConverter))]
           public genre Genre { get; set; }
        public enum genre { 
             [Description("Féminin")]
            Feminin,
            Masculin}
       
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public SituationFamilialeEnum SituationFamiliale { get; set; }
        public enum SituationFamilialeEnum
        {
            [Description("célibataire")]
            Celibataire,

            [Description("marié(e)")]
            Marie,

            [Description("veuf(ve)")]
            Veuf,

            [Description("divorcé(e)")]
            Divorce
        }

        [JsonConverter(typeof(DateOnlyJsonConverter))]
        public DateOnly DateEntree { get; set; }

        [JsonConverter(typeof(DateOnlyJsonConverter))]
        public DateOnly DateSortie { get; set; }
        public float SoldeConge { get; set; }

        [JsonConverter(typeof(JsonStringEnumConverter))]
        public StatutEnum Statut { get; set; }
        public enum StatutEnum
        {
            Actif,
            Inactif
        }
        public bool Badge { get; set; }
        public string refPlanningWeek{ get; set; }
        public string logRef{ get; set; }
        public string Opération {get; set;}
    
        //account credentials
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Token { get; set; }
        public string RoleName { get; set; }
        public string Poste {get; set;}
       
        
    }
}