import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-table-form',
  templateUrl: './table-form.component.html',
  styleUrls: ['./table-form.component.scss']
})
export class TableFormComponent implements OnInit {
  tableForm!: FormGroup;
  tableData: any = {}; // Initialize tableData as an empty object
  days: string[] = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendrdi', 'Samedi', 'Dimanche'];
  timeSlots: string[] = ['startTime1', 'endTime1', 'startTime2', 'endTime2'];
  selectedDay: string | undefined;
  modeTable:boolean=false;


  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.tableForm = this.formBuilder.group({
      day: ['', Validators.required],
      startTime1: ['', Validators.required],
      endTime1: ['', Validators.required],
      startTime2: ['', Validators.required],
      endTime2: ['', Validators.required]
    });
  }

  
selectDay(day: string): void {
  this.selectedDay = day;
}

createTable(): void {
  if ( this.selectedDay) {
  
    // Retrieve form values
    const day = this.selectedDay;
    const startTime1 = this.tableForm.value.startTime1;
    const endTime1 = this.tableForm.value.endTime1;
    const startTime2 = this.tableForm.value.startTime2;
    const endTime2 = this.tableForm.value.endTime2;



    console.log(day,startTime1,endTime1,endTime2);
  
      // Check the selected option value
      if (day === 'all') {
        // Assign values to all days
        for (const selectedDay of this.days) {
          this.tableData[selectedDay] = {
            startTime1,
            endTime1,
            startTime2,
            endTime2
          };
        }
      } else if (day === 'weekdays') {
        // Assign values to all weekdays except Saturday and Sunday
        const weekdays = this.days.filter(day => day !== 'Saturday' && day !== 'Sunday');
        for (const selectedDay of weekdays) {
          this.tableData[selectedDay] = {
            startTime1,
            endTime1,
            startTime2,
            endTime2
          };
        }
      } else {
        // Assign values to the selected day
        this.tableData[day] = {
          startTime1,
          endTime1,
          startTime2,
          endTime2
        };
      }
    }
  }
  
  
  
}