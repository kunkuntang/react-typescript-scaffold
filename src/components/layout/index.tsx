import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';

const { Header, Content, Footer } = Layout;

type IState = {
  contentHeight: number;
}

export default class HomeLayout extends Component<any, IState> {
  state = {
    contentHeight: 380
  }

  constructor(props: any) {
    super(props)
  }

  componentDidMount() {
    this.setContentHeight();
    window.addEventListener('resize', this.setContentHeight);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setContentHeight);
  }

  setContentHeight = () => {
    const winClientWid = document.body.clientHeight;
    console.log('client width', winClientWid)
    this.setState({
      contentHeight: Math.floor(winClientWid - 65 - 70)
    })
  }

  render() {
    return (
      <Layout>
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="1"><Link to="/">Home</Link></Menu.Item>
            <Menu.Item key="2"><Link to="/regist">Regist</Link></Menu.Item>
          </Menu>
        </Header>
        <Content style={{ marginTop: 64 }}>
          <div style={{ background: '#fff', padding: 24, minHeight: this.state.contentHeight }}>
            {this.props.children}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    );
  }
}