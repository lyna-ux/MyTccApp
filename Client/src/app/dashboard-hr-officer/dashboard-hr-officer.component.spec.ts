import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardHrOfficerComponent } from './dashboard-hr-officer.component';

describe('DashboardHrOfficerComponent', () => {
  let component: DashboardHrOfficerComponent;
  let fixture: ComponentFixture<DashboardHrOfficerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardHrOfficerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardHrOfficerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
