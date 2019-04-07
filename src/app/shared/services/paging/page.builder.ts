import { HttpResponse } from '@angular/common/http';
import * as parseLinkHeader from 'parse-link-header';
import { Links } from 'parse-link-header';
import { Params } from '@angular/router';
import { Page } from './page.model';
import { ParamsBuilder } from './params.builder';

export class PageBuilder {
  static build<T>(response: HttpResponse<T[]>, queryParams: Params): Page<T> {
    if (Object.entries(response.body).length === 0) {
      return new Page<T>([], 0, 0, 0, new ParamsBuilder(queryParams));
    }

    const totalRecords: number = PageBuilder.extractTotal(response);
    const currentPage: number = PageBuilder.extractCurrent(response);
    const pageSize: number = PageBuilder.extractSize(response);

    const records: T[] = response.body;
    return new Page<T>(
      records,
      totalRecords,
      currentPage,
      pageSize,
      new ParamsBuilder(queryParams)
    );
  }

  private static extractTotal<T>(response: HttpResponse<T[]>): number {
    return parseInt(response.headers.get('x-total-count'), 10);
  }

  private static extractCurrent<T>(response: HttpResponse<T[]>): number {
    const links: Links = parseLinkHeader(response.headers.get('link'));
    let current: number;
    if (links.next) {
      current = parseInt(links.next.page, 10) - 1;
    } else if (links.prev) {
      current = parseInt(links.prev.page, 10) + 1;
    }
    return current;
  }

  private static extractSize<T>(response: HttpResponse<T[]>) {
    const links: Links = parseLinkHeader(response.headers.get('link'));
    return parseInt(links.first.size, 10);
  }
}
