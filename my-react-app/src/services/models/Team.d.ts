declare namespace Team {
  export interface ITeamCreateModel {
    title: string;
    owner: string;
    description: string;
    departmentId: string;
    member: string[];
  }
  export interface ITeamUpdateModel {
    id: string;
    title: string;
    owner: string;
    description: string;
    departmentId: string;
    member: string[];
  }
  export interface IKickMemberModel {
    id: string;
    member: string[];
  }
}
