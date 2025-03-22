import React from "react";

export type CommonErrorType={
    response?:{
        data?: {
            status?:number;
            message?:string;
            data?:{
                error?:{
                    statusCode?:number;
                    customStatusCode?:number;
                    status?:string;
                    isOperational?:boolean;
                }
            }
        }
    }
};

export type navItemsTypes = {
    title?:string;
    icon?:React.ReactElement;
    path?:string;
}