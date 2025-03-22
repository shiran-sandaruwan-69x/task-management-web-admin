import * as url from './task_url_helper.ts';
import {del, get, post} from "@/services/ServiceMethods.ts";
import {TaskFormValuesType} from "@/components/tasks/task-types/TaskTypes.ts";

export const createTask = (data:TaskFormValuesType) => post(url.CREATE_TASK, data);
export const updateTask = (id:string,data:TaskFormValuesType) => post(`${url.CREATE_TASK}/${id}`, data);
export const getAllTasks = (firstName:string,role:string,status:boolean,lastName:string,address:string,limit:number,page:number) => get(`${url.CREATE_TASK}?firstName=${firstName}&role=${role}&status=${status}&lastName=${lastName}&address=${address}&limit=${limit}&page=${page}`);
export const deleteTask = (id:string) => del(`${url.CREATE_TASK}/${id}`);