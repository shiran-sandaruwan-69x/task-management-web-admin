export type SignInType ={
    email:string;
    password:string;
};

export type SignInUserType ={
    address?:string;
    email?:string;
    firstName?:string;
    lastName?:string;
    mobileNumber?:string;
    password?:string;
    role?:string;
    status?:string;
    _id?:string;
};

export type SignInResType ={
    token?:string;
    user:SignInUserType;
};

export type SignInApiResType ={
    data?:SignInResType;
}

export type OtpType ={
    email?:string;
    otp?:string;
};

export type ResetPasswordType ={
    email?:string;
    password?:string;
};