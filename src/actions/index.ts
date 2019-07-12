import { USER_LOGIN } from "@/types/actionType";
import { IActionType, ILogin } from "@/types/types";
import Axios from 'axios'
import { User, UserServerEntity } from "@/model/user";
import { post } from "@/utils/http";
import { Dispatch } from "react";
import { BaseEntity } from "@/model/common";

export function login(userInfo: Partial<User>):ILogin {
  console.log('userInfo', userInfo)
  return {
    type: USER_LOGIN,
    userInfo: userInfo,
  }
}



export function asyncLogin() {
  return function(dispatch: any) {
    return post('login', {
      username: 'kuntang',
      password: '123'
    }).then(({ data }) => {
      console.log('data', data)
      dispatch(login(data.userInfo))
    })
  }

}