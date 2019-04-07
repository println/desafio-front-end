import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '@app/shared/models/employee.model';
import { Page } from '@app/shared/services/paging';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: '[stn-employee-list], stn-employee-list',
  templateUrl: './employee-list.component.html'
})
export class EmployeeListComponent implements OnInit {
  data$: Observable<{ [name: string]: Page<Employee> }>;

  constructor(private route: ActivatedRoute, protected router: Router) {}

  ngOnInit() {
    this.data$ = this.route.data;
  }

  changePage(next: number, page: Page<Employee>) {
    const builder = page.getParamsBuilder();
    builder.page = next;
    this.navigate(builder.build());
  }

  private navigate(queryParams) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams
    });
  }
}
