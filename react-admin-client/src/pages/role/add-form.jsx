import React, { Component } from 'react';
import { Form, Input } from 'antd';
import  PropTypes from 'prop-types';

const { Item } = Form

class AddForm extends Component {
  constructor(props) {
    super(props)
    // 向父组件传参form
    props.setForm(this.props.form)
    this.formItemLayout = {
      labelCol: { span: 4 }, // label所占格数
      wrapperCol: { span: 15 } // 包裹容器所占格数
    }
  }
  static propTypes = { 
    setForm: PropTypes.func.isRequired
  }

  render() {
    const { getFieldDecorator } = this.props.form

    return (
      <Form>
        <Item label="角色名称" {...this.formItemLayout}>
          {
            getFieldDecorator('roleName', {
              initialValue: '',
              rules: [{
                required: true,
                message: '角色名称必须输入'
              }]
            })(
              <Input placeholder="请输入角色名称"></Input>
            )
          }
        </Item>
      </Form>
    );
  }
}

export default Form.create()(AddForm)