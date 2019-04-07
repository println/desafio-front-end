import { Params } from '@angular/router';

export class ServerParamsFilter {
  /* size=100&page=1&sort=age,desc */
  static filter(params: Params): Params {
    if (!params) {
      return {};
    }
    const keys: any[] = ['size', 'page', 'sort'];
    return Object.entries(params)
      .filter(([k, v]) => keys.includes(k))
      .reduce((obj, arr) => {
        obj[arr[0]] = arr[1];
        return obj;
      }, {});
  }
}
