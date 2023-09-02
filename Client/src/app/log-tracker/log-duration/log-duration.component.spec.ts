import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogDurationComponent } from './log-duration.component';

describe('LogDurationComponent', () => {
  let component: LogDurationComponent;
  let fixture: ComponentFixture<LogDurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogDurationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogDurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
