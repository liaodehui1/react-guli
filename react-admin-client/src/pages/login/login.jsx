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
class Login extends Component {
  handleSubmit = (e) => {
    // 阻止默认行为（不提交表单）
    e.preventDefault()

    // 进行表单所有控件的校验
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        // 校验成功
        const { username, password } = values
        console.log('提交登录请求', username, password)
      } else {
        // 校验失败
        console.log('检验失败')
      }
    })
  }

  // 对密码自定义验证
  validatePwd = (rule, value, callback) => {
    // console.log(value)
    const length = value && value.length
    const pwdReg = /^[a-zA-Z0-9_]+$/
    if (!value) {
      callback('密码必须输入')
    }else if (length < 4) {
      callback('密码必须大于 4 位') 
    }else if (length > 12) {
      callback('密码必须小于 12 位') 
    }else if (!pwdReg.test(value)) {
      callback('密码必须是英文、数组或下划线组成')
    }else {
      callback()  // callback 必须被调用
      
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <div className="login">
        <header className="login-header">
          {/* 图片不能直接使用路径 */}
          <img src={logo} alt="logo" />
          {/* <img src={require('./images/logo.png')} /> */}
          <h1>React项目：硅谷后台</h1>
        </header>
        <section className="login-content">
          <h3>用户登录</h3>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Item>
              {
                /*
                  getFieldDecorator 高阶函数
                  getFieldDecorator(标识名称，配置对象)(组件标签) 返回新的标签
                  经过getFieldDecorator 包装的表单控件会自动添加value和onChange，数据同步将被form接管
                */
                getFieldDecorator('username', { // 配置对象：属性名是特定的一些名称
                  // 声明式验证：直接使用别人定义好的验证规则进行验证
                  rules: [
                    { required:  true, whitespace: true, message: '用户名必须输入'},
                    { min: 4, message: '用户名至少4位' },
                    { max: 12, message: '用户名最多12位' },
                    { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字和下划线组成' }
                  ]
                })(
                  <Input prefix={<Icon type="user" style={{ color: 'rgba(0, 0, 0, .25)' }} />}
                    type="username" placeholder="用户名" />
                )
              }
            </Item>
            <Item>
              {
                getFieldDecorator('password', {
                  rules: [
                   { validator: this.validatePwd }
                  ]
                })(
                  <Input prefix={<Icon type="lock" style={{ color: 'rgba(0, 0, 0, .25)' }} />}
                    type="password" placeholder="密码" />
                )
              }
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

/*
  包装Form组件会生成一个新的组件：Form(Login)
  新的组件给Login传入了一个强大的对象 form
*/
export default Form.create()(Login)