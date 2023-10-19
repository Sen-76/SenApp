export enum EStatus {
  Done = 1,
  InProgress = 0,
  Closed = 2
}
export const StatusOptions = [
  { label: 'Done', value: EStatus.Done },
  { label: ' In Progress', value: EStatus.InProgress },
  { label: 'Closed', value: EStatus.Closed }
];
