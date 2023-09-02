
using System.Text.Json.Serialization;
using System.Text.Json;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel;

namespace API.Entities
{
    public class Demande
    {
        public int Id {get; set;}  
        public string refDemande {get; set;} 
        public string NomDeposant {get; set;}
        public string PrenomDeposant {get; set;}
        public string CinDeposant {get; set;}
        public string MatriculeDeposant {get; set;}   
        public string NomTraitant {get; set;} 
        public string PrenomTraitant {get; set;} 

        [JsonConverter(typeof(JsonStringEnumConverter))]
        public string Statut{ get; set; } = "En cours";
        // public enum statut 
        // { 
        //     [Description("En cours ")]
        //     enCours, 
        //     [Description("Annulée")]
        //     annulee,
        //     [Description("Traitée")]
        //     traitee ,
        //     [Description("Rejetée")]
        //     rejetee
        // }
        public string  service { get; set; }
        public string Type { get; set; }
         public string  objet { get; set; }

         [Column(TypeName = "TEXT")]
        public string  details{ get; set; } 

        [NotMapped]
        public IDictionary<string, JsonElement>? DynamicJsonData
        {
            get
            {
                if (!string.IsNullOrEmpty(details))
                {
                    return JsonSerializer.Deserialize<Dictionary<string, JsonElement>>(details);
                }
                return null;
            }
            set
            {
                if (value != null)
                {
                    details = JsonSerializer.Serialize(value);
                }
                else
                {
                    details = null;
                }
            }
        }


        [Column(TypeName = "TEXT")]
        public string  commentaireTraitement { get; set; }
        public string  dateDepot { get; set; }
        public string  dateTraitement { get; set; }
        public string  dateAnnulation { get; set; }
    }

    
}
