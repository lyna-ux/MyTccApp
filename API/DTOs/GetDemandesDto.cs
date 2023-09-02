using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class GetDemandesDto
    {
        public string refDemande {get; set;} 
        public string NomDeposant {get; set;}
        public string PrenomDeposant {get; set;}
        public string MatriculeDeposant {get; set;}   
        public string CinDeposant {get; set;}  
        public string NomTraitant {get; set;} 
        public string PrenomTraitant {get; set;} 

        public string Statut { get; set; }

        public string Type { get; set; }
        public string  service { get; set; }
        public string  objet { get; set; }
        public string  details{ get; set; }

        public string  commentaireTraitement { get; set; }
        public string  dateDepot { get; set; }
        public string  dateTraitement { get; set; }
        public string  dateAnnulation { get; set; }
    }
}