import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '@app/shared/models/employee.model';
import { Page } from '@app/shared/services/paging';
import { Observable } from 'rxjs/internal/Observable';
import { ParamsBuilder } from '@app/shared/services/paging/params.builder';
import { RoleService } from '@app/modules/employee/role.service';
import { EmployeeService } from '@app/modules/employee/employee.service';

@Component({
  selector: '[stn-employee-list], stn-employee-list',
  templateUrl: './employee-list.component.html'
})
export class EmployeeListComponent implements OnInit {
  data$: Observable<{ [name: string]: Page<Employee> }>;
  roles$: Observable<string[]>;

  constructor(
    private route: ActivatedRoute,
    protected router: Router,
    private renderer: Renderer2,
    private employeeService: EmployeeService,
    private roleService: RoleService
  ) {}

  ngOnInit() {
    this.data$ = this.route.data;
    this.load();
  }

  private load() {
    this.roles$ = this.roleService.findAll();
  }

  applyFilter(params: ParamsBuilder, name, age, role) {
    params.domain.name = name;
    params.domain.age = age;
    params.domain.role = role;
    this.navigate(params.buildNew());
  }

  changePage(page: Page<Employee>, nextPage: number) {
    const params = page.params;
    params.page = nextPage;
    this.navigate(params.build());
  }

  delete(employee: Employee, event: UIEvent) {
    if (!confirm(`Are you sure to delete ${employee.firstName}  ${employee.lastName}?`)) {
      return;
    }

    const el = event.currentTarget as HTMLElement;
    const parent = el.parentElement;

    this.employeeService.deleteById(employee).subscribe(
      val => {
        console.log('DELETE call successful value returned in body', val);
        this.renderer.setStyle(parent, 'display', 'none');
        this.load();
      },
      response => {
        window.alert('DELETE call in error');
        console.log('DELETE call in error', response);
      }
    );
  }

  private navigate(queryParams) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams
    });
  }
}
