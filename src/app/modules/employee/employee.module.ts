import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { EmployeeFormComponent } from './employee-form/employee-form.component';

@NgModule({
  declarations: [EmployeeListComponent, EmployeeDetailComponent, EmployeeFormComponent],
  imports: [CommonModule, FormsModule, EmployeeRoutingModule, NgbPaginationModule]
})
export class EmployeeModule {}
