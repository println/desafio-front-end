import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { Employee } from '@app/shared/models/employee.model';

@Component({
  selector: 'stn-employee-detail',
  templateUrl: './employee-detail.component.html'
})
export class EmployeeDetailComponent implements OnInit {
  data$: Observable<{ [name: string]: Employee }>;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.data$ = this.route.data;
  }
}
