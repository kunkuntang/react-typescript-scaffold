export class BaseEntity<T> {
  code:number|string = 200;
  msg:string = '';
  data:T|unknown = null;
}

export class ContainerEntity<T> extends BaseEntity<T> {
  constructor(res?: any) {
    super()
    if (res && Object.prototype.toString.call(res) === '[object Object]') {
      this.code = res.code
      this.msg = res.msg
      this.data = res.data
    }
  }
}