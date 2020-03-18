import React, { PureComponent } from 'react';
import { Form, Input, Select } from 'antd';
import PropTypes from 'prop-types';

const { Item } = Form
const { Option } = Select

class UserForm extends PureComponent {
  constructor(props) {
    super(props)
    // 向父组件传参form
    props.setForm(this.props.form)
    this.formItemLayout = {
      labelCol: { span: 4 }, // label所占格数
      wrapperCol: { span: 16 } // 包裹容器所占格数
    }
  }
  static propTypes = {
    setForm: PropTypes.func.isRequired,
    roles: PropTypes.array,
    user: PropTypes.object
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { roles, user } = this.props

    return (
      <Form {...this.formItemLayout}>
        <Item label="用户名">
          {
            getFieldDecorator('username', {
              initialValue: user.username,
              rules: [{
                required: true,
                message: '用户名必须输入'
              }]
            })(
              <Input placeholder="请输入用户名"></Input>
            )
          }
        </Item>
        {
          !user._id ? (
            <Item label="密码">
              {
                getFieldDecorator('password', {
                  initialValue: '',
                  rules: [{
                    required: true,
                    message: '密码必须输入'
                  }]
                })(
                  <Input type="password" placeholder="请输入密码"></Input>
                )
              }
            </Item>
          ) : null
        }
        <Item label="手机号">
          {
            getFieldDecorator('phone', {
              initialValue: user.phone,
              rules: [{
                required: true,
                message: '手机号必须输入'
              }]
            })(
              <Input placeholder="请输入手机号"></Input>
            )
          }
        </Item>
        <Item label="邮箱">
          {
            getFieldDecorator('email', {
              initialValue: user.email,
              rules: [{
                required: true,
                message: '邮箱必须输入'
              }]
            })(
              <Input placeholder="请输入邮箱"></Input>
            )
          }
        </Item>
        <Item label="角色">
          {
            getFieldDecorator('role_id', {
              initialValue: user.role_id || roles[0]._id
            })(
              <Select>
                {
                  roles.map(role => (
                    <Option
                      key={role._id}
                      value={role._id}
                    >{role.name}</Option>
                  ))
                }
              </Select>
            )
          }
        </Item>
      </Form>
    );
  }
}

export default Form.create()(UserForm)