import React, { Component } from 'react';
import {
  Form,
  Input,
  Icon,
  Button
} from 'antd';
import './login.less';
import logo from './images/logo.png';

const Item = Form.Item

/**
 * 登录的路由组件
 */
export default class Login extends Component {
  login = (e) => {
    
  }

  render() {
    return (
      <div className="login">
        <header className="login-header">
          {/* 图片不能直接使用路径 */}
          <img src={logo} alt="logo"/>
          {/* <img src={require('./images/logo.png')} /> */}
          <h1>React项目：硅谷后台</h1>
        </header>
        <section className="login-content">
          <h3>用户登录</h3>
          <Form onSubmit={this.login} className="login-form">
            <Item>
              <Input prefix={<Icon type="user" style={{color: 'rgba(0, 0, 0, .25)'}}/>}
                placeholder="用户名"/>
            </Item>
            <Item>
              <Input prefix={<Icon type="lock" style={{color: 'rgba(0, 0, 0, .25)'}}/>}
                type="password" placeholder="密码"/>
            </Item>
            <Item>
            {/* htmlType 设置 button 原生的 type 值 */}
              <Button type="primary" htmlType="submit" className="login-form-button">
                登录
              </Button>
            </Item>
          </Form>
        </section>
      </div>
    );
  }
}
