
namespace API.DTOs
{
    public class AddUserDto
    {
         public int IdSage { get; set; }

        
        public string CIN { get; set; }

        
        public string Nom { get; set; }

       
        public string Prenom { get; set; }

        
        public string Adresse { get; set; }

       
        
        public string AdresseEmail { get; set; }


        public string Tel { get; set; }

        
        public DateOnly DateNaissance { get; set; }

       
        public string Genre { get; set; }

        
        public string SituationFamiliale { get; set; }

        public DateOnly DateEntree { get; set; }

        
        public DateOnly DateSortie { get; set; }
        

        public float SoldeConge { get; set; }

        
        public string Statut { get; set; }

        public bool Badge { get; set; }

        public string refPlanningWeek{ get; set; }
        public string logRef{ get; set; }
        public string Opération {get; set;}
         public string Poste {get; set;}

        

    }
}