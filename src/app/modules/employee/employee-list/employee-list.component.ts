import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '@app/modules/employee/employee.service';
import { HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Employee } from '@app/shared/models/employee.model';

@Component({
  selector: '[stn-employee-list], stn-employee-list',
  templateUrl: './employee-list.component.html'
})
export class EmployeeListComponent implements OnInit {
  error: any;
  totalItems: any = 1000;
  itemsPerPage: any = 15;
  page = 1;
  predicate: any;
  previousPage: any;
  reverse: any;

  links: any;
  queryCount: any;

  data$;

  constructor(
    private route: ActivatedRoute,
    protected router: Router,
    private service: EmployeeService
  ) {
    // this.route.data.subscribe(data => {
    //   this.page = data.pagingParams.page;
    //   this.previousPage = data.pagingParams.page;
    //   this.reverse = data.pagingParams.ascending;
    //   this.predicate = data.pagingParams.predicate;
    // });
  }

  ngOnInit() {
    this.loadAll();
  }

  loadAll() {
    const data = {
      _page: this.page,
      _size: this.itemsPerPage
      //sort: this.sort()
    };

    this.service.query(data).subscribe(e => this.paginateProducts(e));
  }

  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.transition();
    }
  }

  transition() {
    this.router.navigate(['/employees'], {
      queryParams: {
        page: this.page,
        size: this.itemsPerPage,
        sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
      }
    });
    this.loadAll();
  }

  protected paginateProducts(data: Employee[]) {
    //this.links = this.parseLinks.parse(headers.get('link'));
    this.totalItems = 1000;
    this.queryCount = this.totalItems;
    this.data$ = data;
  }
}
