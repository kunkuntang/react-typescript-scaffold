import React, { Component, Dispatch } from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';
import { IUserPartial, User } from '@/model/user';
import { IRegist } from '@/types/types';
import * as actions from '@/actions';

import './style.scss'
import WrappedRegistrationForm from './RegistForm';

type IProps = {
  regist: (userInfo: IUserPartial) => IRegist,
}

const baseCls = "regist"

class Regist extends Component<IProps> {
  constructor(props: any) {
    super(props)
  }
  
  regist = () => {
    this.props.regist(new User())
  }

  render() {
    return (
      <div className={baseCls}>
        <div className="welcome">
          <h3>这是一个注册页，点击右边的注册按钮会触发一个同步的actions</h3>
          <div style={{ marginTop: '15px' }}>点击注册后会往store里添加一个用户</div>
        </div>
        <div className="regist-form-con">
          <WrappedRegistrationForm></WrappedRegistrationForm>
        </div>
        {/* <div className="operate-panel">
          <Button type="primary" block onClick={this.regist}>注册</Button>
        </div> */}
      </div>
    );
  }
}

function mapDispatchToProps(dispatch: Dispatch<any>) {
  return {
    regist: (userInfo: User) => dispatch(actions.regist(userInfo)),
  }
}

export default connect(null, mapDispatchToProps)(Regist)
