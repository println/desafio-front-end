import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from '@app/modules/employee/employee-list/employee-list.component';
import { EmployeeListResolver } from '@app/modules/employee/employee-list/employee-list-resolver';
import { EmployeeDetailComponent } from '@app/modules/employee/employee-detail/employee-detail.component';
import { EmployeeResolver } from '@app/modules/employee/employee-resolver';
import { EmployeeFormComponent } from '@app/modules/employee/employee-form/employee-form.component';
import { EmployeeFactoryResolver } from '@app/modules/employee/employee-form/employee-factory-resolver.service';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: EmployeeListComponent,
        runGuardsAndResolvers: 'paramsOrQueryParamsChange',
        resolve: {
          page: EmployeeListResolver
        }
      },
      {
        path: 'new',
        pathMatch: 'full',
        component: EmployeeFormComponent,
        resolve: {
          employee: EmployeeFactoryResolver
        }
      },
      {
        path: ':employeeId/edit',
        pathMatch: 'full',
        component: EmployeeFormComponent,
        resolve: {
          employee: EmployeeResolver
        }
      },
      {
        path: ':employeeId',
        pathMatch: 'full',
        component: EmployeeDetailComponent,
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
