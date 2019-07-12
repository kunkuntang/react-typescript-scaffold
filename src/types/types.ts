import { USER_LOGIN } from "./actionType";
import { User } from "@/model/user";

// common action type
export interface IActionType {
  type: string;
  [key:string]: any
}

export interface ILogin {
  type: USER_LOGIN;
  userInfo: Partial<User>;
}

export type AllUSERACT = ILogin | IActionType;