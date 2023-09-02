import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class PlanningService {
  tableForm!: FormGroup;
  tableData: any = {};
  days: string[] = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
  timeSlots: string[] = ['Début_S1', 'Fin_S1', 'startTime2', 'endTime2'];
  selectedDay: string | undefined;
  modeTable: boolean = false;

  constructor(private formBuilder: FormBuilder) {
    this.initializeForm();
  }

  initializeForm(): void {
    this.tableForm = this.formBuilder.group({
      day: ['', Validators.required],
      Début_S1: ['', Validators.required],
      Fin_S1: ['', Validators.required],
      startTime2: ['', Validators.required],
      endTime2: ['', Validators.required]
    });
  }

  selectDay(day: string): void {
    this.selectedDay = day;
  }

  createTable(): void {
    if (this.selectedDay) {
      const day = this.selectedDay;
      const Début_S1 = this.tableForm.value.Début_S1;
      const Fin_S1 = this.tableForm.value.Fin_S1;
      const startTime2 = this.tableForm.value.startTime2;
      const endTime2 = this.tableForm.value.endTime2;
  
      console.log(day, Début_S1, Fin_S1, endTime2);
  
      if (day === 'Tous') {
        for (const selectedDay of this.days) {
          this.tableData[selectedDay] = {
            Début_S1,
            Fin_S1,
            startTime2,
            endTime2
          };
        }
      } else if (day === 'LundiVendredi') {
        const weekdays = this.days.filter(day => day !== 'Samedi' && day !== 'Dimanche');
        for (const selectedDay of weekdays) {
          // Use different start and end times for each day
          const specificStartTime2 = selectedDay === 'Vendredi' ? this.tableForm.value.startTime2 : '';
          const specificEndTime2 = selectedDay === 'Vendredi' ? this.tableForm.value.endTime2 : '';
  
          this.tableData[selectedDay] = {
            Début_S1,
            Fin_S1,
            startTime2: specificStartTime2,
            endTime2: specificEndTime2
          };
        }
      } else {
        this.tableData[day] = {
          Début_S1,
          Fin_S1,
          startTime2,
          endTime2
        };
      }
    }
  }
  

  getPlanning(){
      
  }
  
}
