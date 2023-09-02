
using System.ComponentModel.DataAnnotations.Schema;
using API.Data;
using API.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace API.Entities
{
     [Table("Planning")]
    public class Planning
    {
        public int Id {get; set;}
        public string refPlanning {get; set;}
       public string HeureDebut_S1 { get; set; }

       public string HeureFin_S1  { get; set; }
       
       public string HeureDebut_S2  { get; set; }
       public string HeureFin_S2  { get; set; }
       public float HeuresPlanifie { get; set; }

        public static implicit operator Planning(PlanningDto dto)
{
    return new Planning
    {
        // Set the properties of the Planning object based on the properties of the PlanningDto object
        // For example:
        Id = dto.Id,
        // Set other properties here
    };
}
        
    }
}