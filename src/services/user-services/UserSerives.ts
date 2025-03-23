import * as url from './user_url_helper.ts';
import {del, get, post, put} from "@/services/ServiceMethods.ts";
import {CreateUserType} from "@/components/users/user-types/UserTypes.ts";

export const createUser = (data:CreateUserType) => post(url.USER_CREATE, data);
export const updateUser = (data:CreateUserType) => put(`${url.USER_CREATE}`, data);
export const getAllUsers = (firstName:string,role:string,status:boolean,lastName:string,address:string,limit:number,page:number) => get(`${url.USER_CREATE}?firstName=${firstName}&role=${role}&status=${status}&lastName=${lastName}&address=${address}&limit=${limit}&page=${page}`);
export const deleteUserById = (id:string) => del(`${url.USER_CREATE}?id=${id}`);
export const getAllUserNames = ()=>get(`${url.USER_CREATE}/all-ie`);
