import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: '[stn-employee-list], stn-employee-list',
  templateUrl: './employee-list.component.html'
})
export class EmployeeListComponent implements OnInit {
  private data$;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.data$ = this.route.data;
  }
}
