import { Component, OnInit } from '@angular/core';
import { PATHS } from '@app/config/paths.config';

@Component({
  selector: 'header[stn-header], stn-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  home = '';

  constructor() {}

  ngOnInit() {
    this.home = PATHS.root();
  }
}
