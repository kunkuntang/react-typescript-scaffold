import React, { Component, Dispatch } from 'react';
import { Button, List, Avatar } from 'antd';
import { connect } from 'react-redux';
import { User } from '@/model/user';
import { TStoreState } from '@/index';
import * as actions from '@/actions';

import './style.scss';
import { Link } from 'react-router-dom';
const Img = require('./../../assets/img/avatar.png');

type IProps = {
  userInfo: User,
  userList: User[],
  asyncLogin: () => User,
}

type IState = {
}

const baseCls = 'home'

class Home extends Component<IProps, IState> {
  constructor(props: any) {
    super(props)
  }
  componentDidMount() {
    console.log(this.props);
  }

  render() {
    const { userList } = this.props;
    return (
      <div className={baseCls}>
        <div className="left">
          <div className="welcome">
            <h3>这是一个首页，点击右边的登录按钮会触发一个异步的actions</h3>
            <div style={{ marginTop: '15px' }}>已经注册的用户：(从store里取值)</div>
            <List
              itemLayout="horizontal"
              dataSource={userList}
              renderItem={(item, index) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar src={Img} size="large" shape="circle" />}
                    title={<a href="https://ant.design">{item.username}</a>}
                    description={"这是第" + (index + 1) + "个用户注册"}
                  />
                </List.Item>
              )}
            ></List>
          </div>
        </div>
        <div className="right">
          <div className="user-info">
            <div style={{ textAlign: 'center', marginBottom: '25px' }}>
              <Avatar src={Img} size={150} shape="circle" className="user-avatar"></Avatar>
            </div>
          </div>
          <p className="user-info-item">
            用户名: {this.props.userInfo.username}
          </p>
          <p className="user-info-item">
            邮箱: {this.props.userInfo.email}
          </p>
          <div className="operate-panel">
            <Button type="primary" block onClick={this.props.asyncLogin}>登录</Button>
            <Link to="regist"><Button type="link" className="regist-btn">注册</Button></Link>
          </div>
        </div>
      </div>
    );
  }
}

// export default Home;

function mapStateToProps(state: TStoreState) {
  return {
    userInfo: state.user,
    userList: state.userList,
  }
}

function mapDispatchToProps(dispatch: Dispatch<any>) {
  return {
    // login: bindActionCreators<AllUSERACT, ILogin>(actions.login, dispatch)
    login: (userInfo: User) => dispatch(actions.login(userInfo)),
    asyncLogin: () => dispatch(actions.asyncLogin())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
