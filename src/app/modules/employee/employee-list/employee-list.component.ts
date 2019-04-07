import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '@app/shared/models/employee.model';
import { Page } from '@app/shared/services/paging';
import { Observable } from 'rxjs/internal/Observable';
import { ParamsBuilder } from '@app/shared/services/paging/params.builder';
import { RoleService } from '@app/modules/employee/role.service';

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
    private roleService: RoleService
  ) {}

  ngOnInit() {
    this.data$ = this.route.data;
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

  private navigate(queryParams) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams
    });
  }

  valueChange(builder: ParamsBuilder) {
    console.log(builder);
  }
}
