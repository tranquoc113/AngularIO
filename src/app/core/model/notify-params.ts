import {Paging} from './paging';

export class NotifyParams extends Paging{
  notifylist: boolean;

  constructor(
    pageNumber: number,
    pageSize: number,
    notifylist: boolean
  ) {
    super();
    this.pageNumber = pageNumber;
    this.pageSize = pageSize;
    this.notifylist= notifylist;
  };
}
