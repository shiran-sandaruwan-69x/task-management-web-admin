export type CreateUserType ={
    firstName:string;
    lastName:string;
    email:string;
    mobileNumber:string;
    role:string;
    address?:string;
    status?:boolean;
    userId?:string;
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
    firstName?:string;
    lastName?:string;
    email?:string;
    mobileNumber:string;
    role:string;
    address?:string;
    status?:boolean;
    _id: string,
};

export type UserResApiType ={
    data?:UserResType[]
};