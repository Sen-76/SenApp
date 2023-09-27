declare namespace Common {
  export interface IDataGrid {
    filter?: IFilter[];
    searchValue?: string;
    searchColumn?: string[];
    orderBy?: A[];
    pageSize?: number;
    pageNumber?: number;
  }
  export interface IFilter {
    key: string;
    value: A[];
  }
}
