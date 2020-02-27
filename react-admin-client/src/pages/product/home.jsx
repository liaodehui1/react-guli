import React, { Component } from 'react';
import {
  Card,
  Select,
  Input,
  Button,
  Icon,
  Table
} from 'antd'
import LinkButton from '@/components/link-button';

const { Option } = Select

export default class ProductHome extends Component {
  constructor(props) {
    super(props)
    this.title = (
      <span>
        <Select value="1"  style={{width: 150}}>
          <Option value="1">按名称搜索</Option>
          <Option value="2">按描述搜索</Option>
        </Select>
        <Input placeholder="关键字" style={{width: 150, margin: '0 10px'}}/>
        <Button type="primary">搜索</Button>
      </span>
    )
    this.extra = (
      <Button type="primary" onClick={() => {
        props.history.push('/product/addupdate')
      }}>
        <Icon type="plus" />
        添加商品
      </Button>
    )
    this.columns = [
      {
        title: '商品名称',
        dataIndex: 'name'
      },
      {
        title: '商品描述',
        dataIndex: 'desc'
      },
      {
        title: '价格',
        dataIndex: 'price',
        render: (price) => <span>￥{price}</span>
      },
      {
        title: '状态',
        width: 100,
        dataIndex: 'status',
        render: (status) => {
          return (
            <span>
              <Button type="primary">下架</Button>
              <span>在售</span>
            </span>
          )
        }
      },
      {
        title: '操作',
        width: 100,
        render: (product) => {
          return (
            <span>
              <LinkButton onClick={() => {
                this.props.history.push('/product/detail', product)
              }}>详情</LinkButton>
              <LinkButton onClick={() => {
                this.props.history.push('/product/addupdate', product)
              }}>修改</LinkButton>
            </span>
          )
        }
      }
    ]
    this.state = {
      products: []
    }
  }
  render() {
    const { products, columns } = this.state
    return (
      <Card title={this.title} extra={this.extra}>
        <Table
          bordered
          rowKey="_id"
          dataSource={products}
          columns={columns}
        />
      </Card>
    );
  }
}
