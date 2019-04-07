import { ParamsBuilder } from '@app/shared/services/paging/params.builder';

export class Page<T> {
  constructor(
    public records: T[],
    public total: number,
    public current: number,
    public size: number,
    private paramsBuilder: ParamsBuilder
  ) {}

  getParamsBuilder(): ParamsBuilder {
    return this.paramsBuilder.clone();
  }
}
