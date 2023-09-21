declare namespace Account {
  export interface IAccountCreateModel {
    userEmail: string;
    password: string;
    userName: string;
    fullName: string;
    userPhone: string;
    dob: DateTime;
    gender: number;
    userStar: number;
    status: number;
    jobTitle: string;
    userDepartment?: string;
    userTeam?: string;
    userRole?: string;
  }
}
