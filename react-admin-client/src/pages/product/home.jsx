import React, { Component } from 'react';
import {
  Card,
  Select,
  Input,
  Button,
  Icon,
  Table,
  message
} from 'antd'
import LinkButton from '@/components/link-button';
import { reqProducts, reqSearchProducts, reqUpdateProductStatus } from '@/api/index';
import { PAGE_SIZE } from '@/utils/constants';
import memoryUtils from '@/utils/memoryUtils';

const { Option } = Select

export default class ProductHome extends Component {
  constructor(props) {
    super(props)
    this.state = {
      total: 0, // 商品总数
      loading: false,
      products: [],
      searchType: 'productName', // 搜索类型字段
      searchName: '' //搜索关键字
    }
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
        render: (status, product) => { // 1.在售， 2. 已下架
          let btnText = '下架'
          let statusText = '在售'
          if (status === 2) {
            btnText = '上架'
            statusText = '已下架'
          }
          status = status === 1 ? 2 : 1 // 将更新成的status
          return (
            <span>
              <Button type="primary" onClick={() => {
                this.updateProductStatus(product._id, status)
              }}>{btnText}</Button>
              <span>{statusText}</span>
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
              <LinkButton onClick={() => this.showDetail(product)}>详情</LinkButton>
              <LinkButton onClick={() => this.showUpdate(product)}>修改</LinkButton>
            </span>
          )
        }
      }
    ]
  }

  showDetail = (product) => {
    memoryUtils.product = product
    this.props.history.push('/product/detail')
  }

  showUpdate = (product) => {
    memoryUtils.product = product
    this.props.history.push('/product/addupdate')
  }

  componentDidMount() {
    this.getProducts(1)
  }

  getProducts = async (pageNum) => {
    this.pageNum = pageNum // 保存当前所在页面
    this.setState({ loading: true })
    const { searchType, searchName } = this.state
    let res // 不能是const，const必须赋初值
    if (searchName) { // 搜索分页请求
      res = await reqSearchProducts({ pageNum, pageSize: PAGE_SIZE, searchName, searchType })
    }else { // 一般分页请求
      res = await reqProducts(pageNum, PAGE_SIZE)
    }
    if (res.status === 0) {
      const { total, list } = res.data
      this.setState({
        total,
        products: list
      }, () => {
        this.setState({ loading: false })
      })
    }
  }

  updateProductStatus = async (productId, status) => {
    const res = await reqUpdateProductStatus(productId, status)
    if (res.status === 0) {
      message.success('更新状态成功!')
      this.getProducts(this.pageNum || 1)
    }
  }
  
  render() {
    const { products, loading, total } = this.state
    const title = (
      <span>
        <Select 
          value={this.state.searchType}  
          style={{width: 150}}
          onChange={value => this.setState({ searchType: value })}
        >
          <Option value="productName">按名称搜索</Option>
          <Option value="productDesc">按描述搜索</Option>
        </Select>
        <Input 
          value={this.state.searchName}
          placeholder="关键字" 
          style={{width: 150, margin: '0 10px'}}
          onChange={event => this.setState({ searchName: event.target.value })}
        />
        <Button type="primary" onClick={() => { this.getProducts(1) }}>搜索</Button>
      </span>
    )

    return (
      <Card title={title} extra={this.extra}>
        <Table
          bordered
          rowKey="_id"
          loading={loading}
          dataSource={products}
          columns={this.columns}
          pagination={{
            current: this.pageNum,
            defaultPageSize: PAGE_SIZE,
            total,
            showQuickJumper: true,
            onChange: this.getProducts
          }}
        />
      </Card>
    );
  }
}
