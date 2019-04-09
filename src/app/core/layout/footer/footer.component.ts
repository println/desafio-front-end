import { Component, OnInit } from '@angular/core';
import { BasicEmployeeService } from '@app/shared/services/basic-employee.service';

@Component({
  selector: 'footer[stn-footer], stn-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {
  total: number;
  constructor(private employeeService: BasicEmployeeService) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.employeeService.count().subscribe(total => {
      this.total = total;
    });
  }
}
