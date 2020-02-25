import React, { Component } from 'react';
import { Form, Input } from 'antd';
import PropTypes from 'prop-types';

const { Item } = Form

class UpdateForm extends Component {
  constructor(props) {
    super(props)
    props.setForm(this.props.form)
  }
  static propTypes = { 
    categoryName: PropTypes.string,
    setForm: PropTypes.func.isRequired // 函数属性，向父组件传参
  }

  // shouldComponentUpdate 会阻碍输入结果显示
  render() {
    const { getFieldDecorator } = this.props.form
    const { categoryName } = this.props

    return (
      <Form>
        <Item label="分类名称">
          {
            getFieldDecorator('categoryName', {
              initialValue: categoryName
            })(
              <Input placeholder="请输入分类名称"></Input>
            )
          }
        </Item>
      </Form>
    );
  }
}

export default Form.create()(UpdateForm)