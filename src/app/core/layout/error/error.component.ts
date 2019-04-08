import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'section[stn-error-page], stn-error-page',
  templateUrl: './error.component.html'
})
export class ErrorComponent implements OnInit {
  error;

  constructor(private route: ActivatedRoute, private location: Location) {
  }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.error = data.error;
      if (this.error.url && this.error.url !== this.location.path()) {
        this.location.replaceState(this.error.url);
      }
    });
  }
}
