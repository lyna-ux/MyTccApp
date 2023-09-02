import { Component, OnDestroy } from '@angular/core';
import { Subject, interval } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-log-duration',
  template: `
    <div>
      <button (click)="startLog()" [disabled]="status === 'Production'">Start Log</button>
      <button (click)="stopLog()" [disabled]="status === 'Déconnecté'">Stop Log</button>
      <button (click)="toggleBreak()" [class.active]="isBreakActive" [disabled]="status === 'Déconnecté'">Pause Café</button>
      <div>Status: {{ status }}</div>
      <div>Duration: {{ duration }}</div>
      <div>Break Duration: {{ breakDuration }}</div>
      <div>Break timer: {{ breakTimerDuration }}</div>
      <!-- <button (click)="getDuration()">Afficher mes heures</button> -->
      <div>Heures produites: {{ FinalDuration }}</div>
      <div>Connecté depuis {{ logonTime }}</div> 
      <div>Déconnecté à {{ logoffTime }}</div>  
      
    </div>
  `,
  styles: [`
    .active {
      background-color: green;
    }
  `]
})
export class LogDurationComponent implements OnDestroy {
  public logStart$ = new Subject<void>();
  public logStop$ = new Subject<void>();
  public destroy$ = new Subject<void>();

  public duration: string = '00:00:00'; // live prod duration
  public breakDuration: string = '00:00:00'; 
  public accumulatedDuration: number = 0;
  public accumulatedBreakDuration: number = 0;
  public FinalDuration: string = '00:00:00';

  public status: string = 'Déconnecté';
  public logonTime: Date | undefined;
  public logoffTime: Date | undefined;
  public timerSubscription: any;
  public breakTimerSubscription: any;
  public breakTimerDuration: string = '00:00:00'; // live break duration
  public isBreakActive: boolean = false;
  public breakStartTime: Date | undefined;

  constructor() {
    this.logStart$
      .pipe(takeUntil(this.logStop$), takeUntil(this.destroy$))
      .subscribe(() => {
        this.logonTime = new Date();
        this.isBreakActive = false;
        this.status = 'Production';
        this.timerSubscription = interval(1000).subscribe(() => {
          const currentTime = new Date().getTime();
          const elapsedTime = currentTime - this.logonTime!.getTime();
          this.duration = this.formatDuration(elapsedTime);
        });
      });
  }

  startLog() {
    if (!this.timerSubscription) {
      this.logStart$.next();
    }
  }

  stopLog() {
    if (this.timerSubscription) {
      
      //this.duration = this.formatDuration(this.logoffTime.getTime() - this.logonTime!.getTime());
      this.logoffTime = new Date();
      const currentDuration = this.logoffTime.getTime() - this.logonTime!.getTime();
      this.accumulatedDuration += currentDuration ;
      this.FinalDuration =this.formatDuration(this.accumulatedDuration);
      this.isBreakActive = false;
      this.status = 'Déconnecté';
      this.timerSubscription.unsubscribe();
      this.timerSubscription=null;

       // Stop the break timer
       if (this.breakTimerSubscription) {
        this.breakTimerSubscription.unsubscribe();
        this.breakTimerSubscription = null;
      }
    }
  }

  toggleBreak() {

    
    if (!this.isBreakActive) {
      this.startBreak();
    } else {
      this.stopBreak();
    }
  }

  startBreak() {
    if (!this.isBreakActive) {
      this.isBreakActive = true;
      this.breakStartTime = new Date();
      this.status = 'Pause Café';

      // Start the break timer
      this.breakTimerSubscription = interval(1000).subscribe(() => {
        const currentTime = new Date().getTime();
        const elapsedBreakTime = currentTime - this.breakStartTime!.getTime();
        this.breakTimerDuration = this.formatDuration(elapsedBreakTime);
      });
    }
  }

  stopBreak() {
    if (this.isBreakActive && this.breakStartTime) {
      this.isBreakActive = false;
      const BreakStopTime = new Date();
      const CurrentBreakDuration = BreakStopTime.getTime() - this.breakStartTime.getTime();
      this.accumulatedBreakDuration+=CurrentBreakDuration;
      this.breakDuration = this.formatDuration(this.accumulatedBreakDuration);
      this.breakStartTime = undefined;
      this.status = 'Production';

      // Stop the break timer
      if (this.breakTimerSubscription) {
        this.breakTimerSubscription.unsubscribe();
        this.breakTimerSubscription = null;
      }
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private formatDuration(duration: number): string {
    const seconds = Math.floor(duration / 1000) % 60;
    const minutes = Math.floor(duration / (1000 * 60)) % 60;
    const hours = Math.floor(duration / (1000 * 60 * 60));
    return `${this.padNumber(hours)}:${this.padNumber(minutes)}:${this.padNumber(seconds)}`;
  }

   getDuration (){

    return this.FinalDuration;
      
  }

  private padNumber(num: number): string {
    return num.toString().padStart(2, '0');
  }
}
