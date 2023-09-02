using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class UpdateDemandeDto
    {
        
        public string refDemande {get; set;} 
        public string statut {get; set;}
        public string NomTraitant {get; set;} 
        public string PrenomTraitant {get; set;} 
        public string  commentaireTraitement { get; set; }
        public string  dateDepot { get; set; }
        public string  dateTraitement { get; set; }
        public string  dateAnnulation { get; set; }


    }
}