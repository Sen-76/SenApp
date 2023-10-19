declare namespace Milestone {
  export interface IMilestoneStatusModel {
    id: string;
    title: string;
    color: string;
    description: string;
    isDefault: string;
    order: number;
    __entity: string;
  }
  export interface IMilestoneCreateModel {
    title: string;
    description: string;
    projectId: string;
    dueDate: Date;
    startDate: Date;
  }
  export interface IMilestoneUpdateModel {
    id: string;
    title: string;
    description: string;
    projectId: string;
    dueDate: Date;
    startDate: Date;
  }
  export interface IMilestoneDeleteModel {
    isHardDelete: boolean;
    id: string[];
  }
}
