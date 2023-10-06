declare namespace Department {
  export interface IDepartmentCreateModel {
    title?: string;
    description?: string;
    owner?: string;
    members?: string[];
  }
  export interface IDepartmentModel {
    id: string;
    title: string;
    description: string;
    createdDate: DateTime;
    updateDate: DateTime;
    __entity: string;
  }
}
