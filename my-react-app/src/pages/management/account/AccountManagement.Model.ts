export enum EState {
  Activate = 0,
  DeActivate = 1
}
export enum EDeleteState {
  None = 0,
  HardDelete = 1,
  SoftDelete = 2
}

export enum EGender {
  Male = 0,
  Female = 1,
  Other = 2
}

export const StatusOptions = [
  {
    label: 'Active',
    value: EState.Activate
  },
  {
    label: 'Inactive',
    value: EState.DeActivate
  }
];

export const GenderOptions = [
  {
    label: 'Male',
    value: EGender.Male
  },
  {
    label: 'Female',
    value: EGender.Female
  },
  {
    label: 'Other',
    value: EGender.Other
  }
];
export const DepartmentOptions = [
  {
    label: 'Tester',
    value: 'Tester'
  },
  {
    label: 'Developer',
    value: 'Developer'
  }
];

export const RoleOptions = [
  {
    label: 'Admin',
    value: 'Admin'
  },
  {
    label: 'Worker',
    value: 'Worker'
  }
];
