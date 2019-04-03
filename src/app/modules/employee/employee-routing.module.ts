import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from '@app/modules/employee/employee-list/employee-list.component';
import { EmployeeListResolver } from '@app/modules/employee/employee-list/employee-list-resolver';
import { EmployeeDetailComponent } from '@app/modules/employee/employee-detail/employee-detail.component';
import { EmployeeResolver } from '@app/modules/employee/employee-resolver';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: EmployeeListComponent,
        resolve: {
          employees: EmployeeListResolver
        }
      },
      {
        path: ':employeeId',
        component: EmployeeDetailComponent,
        // data: { breadcrumbs: '{{catalog.id}}' },
        resolve: {
          employee: EmployeeResolver
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule {}
