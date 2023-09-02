
namespace API.DTOs
{
    public class AddPlanningDto

    {
        public string refPlanning {get; set;}   
       public string HeureDebut_S1   { get; set; }

       public string HeureFin_S1 { get; set; }
       
       public string HeureDebut_S2  { get; set; }
       public string HeureFin_S2  { get; set; }
     
       public float HeuresPlanifie { get; set; }
      
    }
}