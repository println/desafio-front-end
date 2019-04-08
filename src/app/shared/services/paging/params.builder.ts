import { Params } from '@angular/router';
import { Direction } from './direction';

export class ParamsBuilder {
  public page: number;
  public size: number;
  public sort: string;
  public direction: Direction = Direction.ASC;
  public domain?: Params = {};

  constructor(private general?: Params) {
    if (!general) {
      return;
    }
    if (general.page) {
      this.page = parseInt(general.page, 10);
    }
    if (general.size) {
      this.size = parseInt(general.size, 10);
    }
    if (general.sort) {
      if (general.sort.includes(',')) {
        const sortKey = general.sort.split(',');
        this.sort = sortKey[0];
        this.direction = sortKey[1] === Direction.ASC ? Direction.ASC : Direction.DESC;
      } else {
        this.sort = general.sort;
      }
    }
    this.domain = this.extractDomainParams(general);
  }

  build(): Params {
    let params = Object.assign({}, this.domain);
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
    return this.extractValidParams(params);
  }

  buildNew(): Params {
    return this.extractValidParams(this.domain);
  }

  private extractValidParams(params): Params {
    return Object.entries(params)
      .filter(([k, v]) => {
        return v !== null && v !== undefined && v.toString().length > 0;
      })
      .reduce((obj, arr) => {
        obj[arr[0]] = arr[1];
        return obj;
      }, {});
  }

  private extractDomainParams(params): Params {
    return Object.entries(params)
      .filter(([k, v]) => !['page', 'size', 'sort'].includes(k))
      .reduce((obj, arr) => {
        obj[arr[0]] = arr[1];
        return obj;
      }, {});
  }
}
