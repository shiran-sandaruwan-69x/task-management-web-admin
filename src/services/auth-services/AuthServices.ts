import * as url from './auth_url_helper.ts';
import {post} from "@/services/ServiceMethods.ts";
import {SignInType} from "@/auth/auth-types/AuthTypes.ts";
export const signIn = (data:SignInType) => post(url.SIGN_IN, data);