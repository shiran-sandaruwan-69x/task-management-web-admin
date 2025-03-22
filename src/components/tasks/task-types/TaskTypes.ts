export type TaskFormValuesType ={
    taskName:string;
    description?:string;
    startDate?:string;
    endDate?:string;
    assignUser?:string;
    status:boolean;
}

export type TaskResType ={
    taskName:string;
    description?:string;
    startDate?:string;
    endDate?:string;
    assignUser?:string;
    assignee?:string;
    status:boolean;
    _id: string,
}