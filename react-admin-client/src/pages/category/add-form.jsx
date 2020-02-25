import React, { Component } from 'react';
import { Select, Form, Input } from 'antd';
import  PropTypes from 'prop-types';

const { Item } = Form
const { Option } = Select

class AddForm extends Component {
  constructor(props) {
    super(props)
    props.setForm(this.props.form)
  }
  static propTypes = { 
    categorys: PropTypes.array.isRequired,
    parentId: PropTypes.string.isRequired,
    setForm: PropTypes.func.isRequired
  }

  // 阻碍输入结果显示
  // shouldComponentUpdate(nextProps, nextState) {
  //   if (this.props.parentId === nextProps.parentId &&
  //     this.props.categorys === nextProps.categorys) {
  //       console.log('不更新')
  //     return false
  //   } else {
  //     return true
  //   }
  // }

  render() {
    const { getFieldDecorator } = this.props.form
    const { parentId, categorys } = this.props

    return (
      <Form>
        <Item label="所属分类">
          {
            getFieldDecorator('parentId', {
              initialValue: parentId
            })(
              <Select>
                <Option key="0" value="0">一级分类</Option>
                {
                  categorys.map(item => (
                    <Option key={item._id} value={item._id}>{item.name}</Option>
                  ))
                }
              </Select>
            )
          }
        </Item>
        <Item label="分类名称">
          {
            getFieldDecorator('categoryName', {
              initialValue: ''
            })(
              <Input placeholder="请输入分类名称"></Input>
            )
          }
        </Item>
      </Form>
    );
  }
}

export default Form.create()(AddForm)