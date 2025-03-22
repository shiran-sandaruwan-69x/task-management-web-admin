export type CreateUserType ={
    firstName:string;
    lastName:string;
    email:string;
    password:string;
    mobileNumber:string;
    role:string;
    address?:string;
    status:boolean;
};

export type UserRolesType={
    id:string;
    name:string;
};

export type UserStatusType={
    id:boolean;
    name:string;
};

export type UserFilteredValuesType ={
    firstName?:string;
    lastName?:string;
    role?:string;
    address?:string;
    status?:boolean;
}

export type UserResType ={
    firstName:string;
    lastName:string;
    email:string;
    password:string;
    mobileNumber:string;
    role:string;
    address?:string;
    status:boolean;
    _id: string,
};