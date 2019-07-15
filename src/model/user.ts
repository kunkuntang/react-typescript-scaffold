import { ContainerEntity } from "./common";

export type IUser = {
  username: string;
  password: string;
  sex: string | null;
  email: string;
}

export type IUserPartial = Partial<User>

export class User {
  username:string = ''
  password:string = ''
  sex:string | null = null
  email: string = ''

  constructor(userInfo?: IUserPartial) {
    console.log('userInfo', userInfo)
    if (userInfo) {
      const { username = '', password = '', sex = '', email = '' } = userInfo
      this.username = username
      this.password = password
      this.sex = sex
      this.email = email
    }
  }
}

export class UserServerEntity {
  age:number|null = null;
  assiationroleid:number|null = null;
  classnum:string|null = null;
  classroleid:number|null = null;
  collage:string|null = null;
  email:string|null = null;
  id:number|null = null;
  major:string|null = null;
  nickname:string|null = null;
  openid:number|null = null;
  password:string|null = null;
  phone:string|null = null;
  sex:string|null = null;
  username:string|null = null;
  xkroleid:number|null = null;

  constructor() {

  }
}

export class UserServerContaienrEntity extends ContainerEntity<UserServerEntity> {
  constructor(res?: UserServerEntity|undefined) {
    super()
    console.log(this.data)
    console.log(this.code)
    console.log(this.msg)
  }
}