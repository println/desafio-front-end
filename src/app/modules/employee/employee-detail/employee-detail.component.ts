import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { Employee } from '@app/shared/models/employee.model';
import { EmployeeService } from '@app/modules/employee/employee.service';
import { ROUTES } from '@app/config/routes.config';

@Component({
  selector: 'stn-employee-detail',
  templateUrl: './employee-detail.component.html'
})
export class EmployeeDetailComponent implements OnInit {
  data$: Observable<{ [name: string]: Employee }>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService
  ) {}

  ngOnInit() {
    this.data$ = this.route.data;
  }

  delete(employee: Employee) {
    if (!confirm(`Are you sure to delete ${employee.firstName}  ${employee.lastName}?`)) {
      return;
    }

    this.employeeService.deleteById(employee).subscribe(
      val => {
        console.log('DELETE call successful value returned in body', val);
        this.router.navigate([ROUTES.employee]);
      },
      response => {
        window.alert('DELETE call in error');
        console.log('DELETE call in error', response);
      }
    );
  }
}
