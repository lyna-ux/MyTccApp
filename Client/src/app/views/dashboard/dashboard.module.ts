import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DocsComponentsModule } from '@docs-components/docs-components.module';
import { WidgetsRoutingModule } from '../widgets/widgets-routing.module';
import { FormsModule } from '@angular/forms';
import { BadgeModule } from '@coreui/angular';
import { CalloutModule } from '@coreui/angular';
import { CarouselModule } from '@coreui/angular';
import { CollapseModule } from '@coreui/angular';

 

import {
  AvatarModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  GridModule,
  NavModule,
  ProgressModule,
  TableModule,
  TabsModule,
  FormModule,
  DropdownModule,


 
} from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { ChartjsModule } from '@coreui/angular-chartjs';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { WidgetsModule } from '../widgets/widgets.module';
// import { TableFormComponent } from '../table-form/table-form.component';
import{DashboardSupervisorComponent} from '../dashboard-supervisor/dashboard-supervisor.component';
import { DashboardAdminComponent } from 'src/app/dashboard-admin/dashboard-admin.component';
import { FilterPipe } from 'src/app/_services/filter.pipe';
import { DashboardHrOfficerComponent } from 'src/app/dashboard-hr-officer/dashboard-hr-officer.component';
import { ProfileEmployeeComponent } from 'src/app/profile-employee/profile-employee.component';






@NgModule({
  imports: [
    DashboardRoutingModule,
    CardModule,
    NavModule,
    IconModule,
    TabsModule,
    CommonModule,
    GridModule,
    ProgressModule,
    ReactiveFormsModule,
    ButtonModule,
    FormModule,
    ButtonModule,
    ButtonGroupModule,
    ChartjsModule,
    AvatarModule,
    TableModule,

    DocsComponentsModule,
    WidgetsRoutingModule,
    FormsModule,
    DropdownModule,
    CollapseModule,
    BadgeModule,
    CalloutModule,
    CarouselModule,
   
    
    
    
    
  ],
  declarations: [DashboardAdminComponent,DashboardHrOfficerComponent,FilterPipe, DashboardComponent ,DashboardSupervisorComponent, ProfileEmployeeComponent]
  
})

export class DashboardModule {
}
