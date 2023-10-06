declare namespace Role {
  export interface IRoleCreateModel {
    title?: string;
    description?: string;
    permission?: A[];
  }
  export interface IRoleModel {
    id: string;
    title: string;
    description: string;
    createdDate: DateTime;
    updateDate: DateTime;
    __entity: string;
  }
}
