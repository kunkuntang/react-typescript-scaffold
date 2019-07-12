import React, { Component, Dispatch } from 'react';
import { Button } from 'antd';
import { connect } from 'react-redux';
import { TStoreState } from '../index';
import { AllUSERACT, ILogin } from '@/types/types';
import { bindActionCreators } from 'redux';
import * as actions from '../actions'
import { User, IUserPartial } from '@/model/user';

type IProps = {
  userInfo: User,
  login: (userInfo: IUserPartial) => ILogin,
  asyncLogin: () => User,
}

type IState = {
}

class Home extends Component<IProps, IState> {
  constructor(props: any) {
    super(props)
  }
  componentDidMount() {
    console.log(this.props);
  }

  login = () => {
    console.log(this.props.login)
    this.props.login({
      username: 'kuntang'
    })
  }

  render() {
    return (
      <div>
        this is a home page..
        <div>username: {this.props.userInfo.username}</div>
        <Button type="primary" onClick={this.login}>Login</Button>
        <Button type="primary" onClick={this.props.asyncLogin}>Async Login</Button>
      </div>
    );
  }
}

// export default Home;

function mapStateToProps(state: TStoreState) {
  return {
    userInfo: state.user
  }
}

function mapDispatchToProps (dispatch: Dispatch<any>) {
  return {
    // login: bindActionCreators<AllUSERACT, ILogin>(actions.login, dispatch)
    login: (userInfo: User) => dispatch(actions.login(userInfo)),
    asyncLogin: () => dispatch(actions.asyncLogin())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
