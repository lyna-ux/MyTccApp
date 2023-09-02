using System.ComponentModel.DataAnnotations;
using System.ComponentModel;
using API.Data;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Identity;

namespace API.Entities

{
    public class AppUser : IdentityUser<int>
    {

        public int IdSage{ get; set; }
        public string CIN { get; set; }
        public string Nom { get; set; }
        public string Prenom { get; set; }
        public string Adresse { get; set; }
        
         
        [DataType(DataType.EmailAddress)]
        [EmailAddress(ErrorMessage = "Invalid email address")]
        public string  AdresseEmail { get; set; }

        [DataType(DataType.PhoneNumber)]
        [Phone(ErrorMessage = "Invalid phone number")]
        public string  Tel { get; set; }

         [JsonConverter(typeof(DateOnlyJsonConverter))]
        public DateOnly DateNaissance { get; set; }

         [JsonConverter(typeof(JsonStringEnumConverter))]
        public genre Genre { get; set; }
        public enum genre { 
             [Description("Féminin")]
            Feminin,
            Masculin}

        [JsonConverter(typeof(JsonStringEnumConverter))]
        public situationFamiliale SituationFamiliale { get; set; }
        public enum situationFamiliale
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
        public statut Statut { get; set; }
        public enum statut { Actif, Inactif}
        
        public Boolean Badge { get; set; }

        public ICollection <AppUserRole> UserRoles{ get; set; }
        //public List<log> Logs {get; set;}= new();
        public string refPlanningWeek{ get; set; }
        public string logRef{ get; set; }
        public string Opération {get; set;}
        public string Poste {get; set;}
        // public Planning Planning { get; set; } =null;

         
        




    

        
    }
}