import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ROUTES } from '@app/config/routes.config';
import { HomeComponent } from '@app/core/layout/home/home.component';
import {ErrorComponent} from '@app/core/layout/error/error.component';
import {ErrorCodeResolver} from '@app/core/layout/error/error-code.resolver';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'prefix',
    // data: {breadcrumbs: 'Home'},
    children: [
      {
        path: ROUTES.home,
        pathMatch: 'full',
        component: HomeComponent
      },
      {
        path: ROUTES.employee,
        loadChildren: '@app/modules/employee/employee.module#EmployeeModule'
      },
      {
        path: `${ROUTES.error}/:statusCode`,
        component: ErrorComponent,
        data: { breadcrumbs: 'Erro {{error.code}}' },
        resolve: {
          error: ErrorCodeResolver
        }
      },
      { path: '**', redirectTo: `${ROUTES.error}/404` }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
