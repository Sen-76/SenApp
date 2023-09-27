declare namespace Account {
  export interface IAccountModel {
    id: string;
    userName: string;
    userEmail: string;
    fullName: string;
    userPhone: string;
    dob: Date;
    gender: number;
    userRole?: string | null;
    userStar: number;
    userDepartment?: string | null;
    teamId: string | null;
    createdDate: DateTime;
    updateDate: DateTime;
    deactiveDate: DateTime | null;
    status: number;
    jobTitle: string;
    password: string;
    previousPassword: string;
  }
  export interface IAccountCreateModel {
    userEmail: string;
    password: string;
    userName: string;
    fullName: string;
    userPhone: string;
    dob: Date;
    gender: number;
    userStar: number;
    status: number;
    jobTitle: string;
    userDepartment?: string;
    userTeam?: string;
    userRole?: string;
  }
}
