import { Params } from '@angular/router';
import { ServerParamsFilter } from './server-params.filter';
import { Direction } from './direction';

export class ParamsBuilder {
  public page: number;
  public size: number;
  public sort: string;
  public direction: Direction = Direction.ASC;

  constructor(private params?: Params) {
    params = ServerParamsFilter.filter(params);
    if (params.page) {
      this.page = parseInt(params.page, 10);
    }
    if (params.size) {
      this.size = parseInt(params.size, 10);
    }
    if (params.sort) {
      if (params.sort.includes(',')) {
        const sortKey = params.sort.split(',');
        this.sort = sortKey[0];
        this.direction = sortKey[1] === Direction.ASC ? Direction.ASC : Direction.DESC;
      } else {
        this.sort = params.sort;
      }
    }
  }

  public build(): Params {
    let params = {};
    if (this.page) {
      params = Object.assign(params, { page: this.page });
    }
    if (this.size) {
      params = Object.assign(params, { size: this.size });
    }
    if (this.sort) {
      if (this.direction === Direction.DESC) {
        params = Object.assign(params, {
          sort: `${this.sort},${this.direction.toString()}`
        });
      } else {
        params = Object.assign(params, { sort: this.sort });
      }
    }
    return params;
  }

  public clone() {
    return Object.assign(new ParamsBuilder(), this);
  }
}
