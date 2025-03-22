import * as url from './user_url_helper.ts';
import {del, get, post} from "@/services/ServiceMethods.ts";
import {CreateUserType} from "@/components/users/user-types/UserTypes.ts";

export const createUser = (data:CreateUserType) => post(url.USER_CREATE, data);
export const updateUser = (id:string,data:CreateUserType) => post(`${url.USER_CREATE}/${id}`, data);
export const getAllUsers = (firstName:string,role:string,status:boolean,lastName:string,address:string,limit:number,page:number) => get(`${url.USER_CREATE}?firstName=${firstName}&role=${role}&status=${status}&lastName=${lastName}&address=${address}&limit=${limit}&page=${page}`);
export const deleteUser = (id:string) => del(`${url.USER_CREATE}/${id}`);
