import { USER_REGIST } from "@/types/actionType";
import { AllUSERACT } from "@/types/types";
import { User } from "@/model/user";

export default function userList (state: User[] = [], action: AllUSERACT) {
  switch (action.type) {
    case USER_REGIST:
      return state = [...state, new User(action.userInfo)]
    default:
      return state;
  }
}