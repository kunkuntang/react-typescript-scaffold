import { Button, List, Avatar, Form, Input, Cascader, Tooltip, Icon, Checkbox } from 'antd';
import React, { Component, Dispatch, EventHandler, ReactEventHandler, ChangeEvent, FormEvent } from 'react';
import { FormComponentProps } from 'antd/lib/form';
import { connect } from 'react-redux';
import { User, IUserPartial } from '@/model/user';
import * as actions from '@/actions';
import { IRegist } from '@/types/types';
import { Redirect, withRouter } from 'react-router';
import { createBrowserHistory, History } from 'history';
import { history } from '@/App';

// const history = createBrowserHistory();

interface UserFormProps extends FormComponentProps {
  age: number;
  name: string;
  regist: (userInfo: IUserPartial) => IRegist,
  history: History
}

class RegistrationForm extends React.Component<UserFormProps> {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };

  handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err: any, values: any) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.regist(new User(values))
        history.replace('/')
        // this.props.history.replace('/')
      }
    });
  };

  handleConfirmBlur = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule: any, value: any, callback: any) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule: any, value: any, callback: any) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  render() {
    console.log(this.props)
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };

    return (
      <div>
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item
            label={
              <span>
                Username&nbsp;
              <Tooltip title="What do you want others to call you?">
                  <Icon type="question-circle" />
                </Tooltip>
              </span>
            }
          >
            {getFieldDecorator('username', {
              rules: [{ required: true, message: 'Please input your username!', whitespace: true }],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="E-mail">
            {getFieldDecorator('email', {
              rules: [
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
                {
                  required: true,
                  message: 'Please input your E-mail!',
                },
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="Password" hasFeedback>
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: 'Please input your password!',
                },
                {
                  validator: this.validateToNextPassword,
                },
              ],
            })(<Input.Password />)}
          </Form.Item>
          <Form.Item label="Confirm Password" hasFeedback>
            {getFieldDecorator('confirm', {
              rules: [
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                {
                  validator: this.compareToFirstPassword,
                },
              ],
            })(<Input.Password onBlur={this.handleConfirmBlur} />)}
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            {getFieldDecorator('agreement', {
              valuePropName: 'checked',
            })(
              <Checkbox>
                I have read the <a href="">agreement</a>
              </Checkbox>,
            )}
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              注册
          </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const WrappedRegistrationForm = Form.create({ name: 'register' })(RegistrationForm);

// export default WrappedRegistrationForm;

function mapDispatchToProps(dispatch: Dispatch<any>) {
  return {
    regist: (userInfo: User) => dispatch(actions.regist(userInfo)),
  }
}

// @ts-ignore
export default withRouter(connect(null, mapDispatchToProps)(WrappedRegistrationForm))