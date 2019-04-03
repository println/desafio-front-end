import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'stn-employee-detail',
  templateUrl: './employee-detail.component.html'
})
export class EmployeeDetailComponent implements OnInit {
  private data$: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.data$ = this.route.data;
  }

}
