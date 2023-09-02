using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class AddPlanningWeekDtoByRef

    {  
    public string RefPlanningWeek { get; set; }
    public string User { get; set; }
    public string Opération { get; set; }
    public GetPlanningDto Lundi { get; set; }
    public PlanningDto Mardi { get; set; }
    public PlanningDto Mercredi { get; set; }
    public PlanningDto Jeudi { get; set; }
    public PlanningDto Vendredi { get; set; }
    public PlanningDto Samedi { get; set; }
    public PlanningDto Dimanche { get; set; }
       
    }
}