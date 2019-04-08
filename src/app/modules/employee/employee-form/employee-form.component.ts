import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Employee } from '@app/shared/models/employee.model';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '@app/modules/employee/employee.service';
import { RoleService } from '@app/modules/employee/role.service';
import { ROUTES } from '@app/config/routes.config';

@Component({
  selector: 'stn-employee-form',
  templateUrl: './employee-form.component.html'
})
export class EmployeeFormComponent implements OnInit {
  data$: Observable<{ [name: string]: Employee }>;
  roles$: Observable<string[]>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService,
    private roleService: RoleService
  ) {}

  ngOnInit() {
    this.data$ = this.route.data;
    this.roles$ = this.roleService.findAll();
  }

  save(employee: Employee) {
    this.employeeService.create(employee).subscribe(
      val => {
        console.log('CREATE call successful value returned in body', val);
        this.router.navigate([ROUTES.employee, val.id]);
      },
      response => {
        window.alert('CREATE call in error');
        console.log('CREATE call in error', response);
      }
    );
  }

  update(employee: Employee) {
    this.employeeService.update(employee.id, employee).subscribe(
      val => {
        console.log('UPDATE call successful value returned in body', val);
        this.router.navigate([ROUTES.employee, val.id]);
      },
      response => {
        window.alert('UPDATE call in error');
        console.log('UPDATE call in error', response);
      }
    );
  }
}
