import * as url from './auth_url_helper.ts';
import {get, post, put} from "@/services/ServiceMethods.ts";
import {OtpType, ResetPasswordType, SignInType} from "@/auth/auth-types/AuthTypes.ts";
export const signIn = (data:SignInType) => post(`${url.SIGN_IN}/login`, data);
export const getOtp = (email:string) => get(`${url.SIGN_IN}/otp/req?email=${email}`);
export const verifyOtp = (data:OtpType) => post(`${url.SIGN_IN}/otp/verify`,data);
export const resetPassword = (data:ResetPasswordType) => put(`${url.SIGN_IN}/reset-password`,data);