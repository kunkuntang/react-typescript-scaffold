import { USER_LOGIN } from "@/types/actionType";
import { AllUSERACT } from "@/types/types";
import { User } from "@/model/user";

export default function user (state = new User(), action: AllUSERACT) {
  switch (action.type) {
    case USER_LOGIN:
      return state = new User(action.userInfo)
    default:
      return state;
  }
}