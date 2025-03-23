import * as url from './task_url_helper.ts';
import {del, get, post, put} from "@/services/ServiceMethods.ts";
import {TaskFormValuesType} from "@/components/tasks/task-types/TaskTypes.ts";

export const createTask = (data:TaskFormValuesType) => post(url.CREATE_TASK, data);
export const updateTask = (id:string,data:TaskFormValuesType) => put(`${url.CREATE_TASK}?taskId=${id}`, data);
export const getAllTasksApi = (taskName:string,assignUser:string,status:boolean,description:string,startDate:string,endDate:string,completeDate:string,firstName:string,limit:number,page:number) => get(`${url.CREATE_TASK}?taskName=${taskName}&assignUser=${assignUser}&description=${description}&startDate=${startDate}&endDate=${endDate}&completeDate=${completeDate}&firstName=${firstName}&limit=${limit}&page=${page}`);
export const deleteTaskById = (id:string) => del(`${url.CREATE_TASK}?taskId=${id}`);