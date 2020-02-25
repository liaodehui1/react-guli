import React, { Component } from 'react';
import { Card, Button, Icon, Table, message, Modal } from 'antd';
import LinkButton from '@/components/link-button';
import { reqCategorys, reqUpdateCategory } from '@/api';
import AddForm from './add-form';
import UpdateForm from './update-form';

export default class Category extends Component {
  constructor(props) {
    super(props)
    this.columns = [
      {
        title: '分类的名称',
        dataIndex: 'name', // 对应列数据项的key
        // key: 'name', // 有dataIndex则无需key
      },
      {
        title: '操作',
        width: 300,
        key: 'operation',
        render: (category) => ( // 参数：当前行的值，当前行的数据，索引
          <span>
            <LinkButton onClick={() => {
              this.showUpdate(category)
            }}>修改分类</LinkButton>
            {/* 函数声明，而不是调用 */}
            {
              this.state.parentId === '0' ? ( // 被加入render内，所以有效
                <LinkButton onClick={() => {
                  this.showSubCategorys(category)
                }}>查看子分类</LinkButton>
              ) : null
            }
          </span>
        )
      }
    ];
    this.state = {
      Categorys: [],
      subCategorys: [],
      parentId: '0',
      parentName: '',
      loading: false,
      showStatus: 0 // 是否显示对话框 0都不显示 1显示添加 2显示更新
    }
    this.extra = (
      <Button type="primary" onClick={this.showAdd}>
        <Icon type="plus"></Icon>
        添加
      </Button>
    )
  }

  // 获取一级/二级分类列表
  getCategorys = async (parentId) => {
    // 更新loadIng状态：加载中
    this.setState({
      loading: true
    })

    parentId = parentId || this.state.parentId

    // 获取分类列表
    const result = await reqCategorys(parentId)
    // 更新loading状态：加载完成
    this.setState({
      loading: false
    })
    if (result.status === 0) {
      const categorys = result.data
      if (parentId === '0') {
        this.setState({
          categorys
        })
      } else {
        this.setState({
          subCategorys: categorys
        })
      }
    } else {
      message.error('获取列表失败')
    }
  }

  // 返回一级分类列表
  showCategorys = () => {
    this.setState({
      parentName: '',
      parentId: '0',
      subCategorys: [],
      showStatus: 0
    })
  }

  // 显示二级分类列表
  showSubCategorys = (category) => {
    // console.log(category)
    this.setState({
      parentId: category._id,
      parentName: category.name
    }, () => { // 在更新state且render后执行
      // console.log(this.state.parentId)
      this.getCategorys()
    })
    // console.log(this.state.parentId) // setState异步更新
  }

  // 显示添加分类
  showAdd = () => {
    this.setState({
      showStatus: 1
    })
  }

  // 显示更新分类
  showUpdate = (category) => {
    // 1. 给更新对话框传name
    // 2. 给updateCategory传_id
    this.category = category
    this.setState({
      showStatus: 2
    })
  }

  // 关闭对话框
  handleCancel = () => {
    // 重置为初始状态
    this.form.resetFields()
    this.setState({
      showStatus: 0
    })
  }

  // 添加分类
  addCategory = () => {

  }

  // 更新分类
  updateCategory = async () => {
    // 1. 关闭对话框
    this.setState({
      showStatus: 0
    })
    // 2. 请求更新
    const categoryId = this.category._id
    const categoryName = this.form.getFieldValue('categoryName')
    // 重置为初始状态 initialValue
    this.form.resetFields()
    const res = await reqUpdateCategory({ categoryId, categoryName })
    if(res.status === 0) {
      // 3. 更新页面
      this.getCategorys()
    }
  }

  componentDidMount() {
    this.getCategorys()
  }

  render() {
    const { 
      parentId,
      parentName,
      categorys,
      subCategorys,
      loading,
      showStatus 
    } = this.state
    const category = this.category || {}
    const title = parentId === '0' ? '一级分类列表' : (
      <span>
        <LinkButton onClick={this.showCategorys}>一级分类列表</LinkButton>
        <Icon type="arrow-right" style={{ marginRight: 5 }}></Icon>
        <span>{parentName}</span>
      </span>
    )

    return (
      <Card title={title} extra={this.extra}>
        <Table dataSource={parentId === '0' ? categorys : subCategorys}
          columns={this.columns}
          loading={loading}
          bordered // 展示边框
          pagination={{ pageSize: 5, showQuickJumper: true, showSizeChanger: true }}
          rowKey="_id" />
        <Modal
          title="添加分类"
          visible={showStatus === 1}
          onOk={this.addCategory}
          onCancel={this.handleCancel}
        >
          <AddForm parentId={parentId} categorys={categorys}
            setForm={(form) => this.form = form}/>
        </Modal>
        <Modal
          title="更新分类"
          visible={showStatus === 2}
          onOk={this.updateCategory}
          onCancel={this.handleCancel}
        >
          <UpdateForm categoryName={category.name}
            setForm={(form) => this.form = form}/>
        </Modal>
      </Card>
    );
  }
}
