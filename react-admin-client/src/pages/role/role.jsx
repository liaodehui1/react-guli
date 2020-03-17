import React, { Component } from 'react';
import {
  Card,
  Button,
  Table,
  Modal,
  message
} from 'antd';
import { PAGE_SIZE } from '@/utils/constants';
import memoryUtils from '@/utils/memoryUtils';
import { formateDate } from '@/utils/dateUtils';
import { reqRoles, reqAddRole, reqUpdateRole } from '@/api';
import AddForm from './add-form';
import AuthForm from './auth-form';

export default class Role extends Component {
  constructor(props) {
    super(props)
    this.state = {
      roles: [],
      role: {},
      showAdd: false,
      showAuth: false
    }
    this.initColumn()
    this.auth = React.createRef()
  }

  async componentDidMount() {
    const result = await reqRoles()
    if (result.status === 0) {
      const roles = result.data
      this.setState({
        roles
      })
    }
  }

  initColumn = () => {
    this.columns = [
      {
        title: '角色名称',
        dataIndex: 'name'
      },
      {
        title: '创建时间',
        dataIndex: 'create_time',
        render: formateDate
      },
      {
        title: '授权时间',
        dataIndex: 'auth_time',
        render: formateDate
      },
      {
        title: '授权人',
        dataIndex: 'auth_name'
      },
    ]
  }

  onRow = (role) => {
    return {
      onClick: event => { // 点击行
        this.setState({
          role
        })
      },
    }
  }

  addRole = () => {
    this.form.validateFields(async (error, values) => {
      if (!error) {
        const { roleName } = values
        const result = await reqAddRole(roleName)
        if (result.status === 0) {
          this.setState({showAdd: false})
          this.form.resetFields()
          message.success('添加角色成功')
          const role = result.data
          this.setState(state => ({
            roles: [...state.roles, role]
          }))

        }else {
          message.error('添加角色失败')
        }
      }else {
        message.error('表单数据校验有误')
      }
    })
  }

  updateRole = async () => {
    const { role } = this.state // role 引用了state.roles中的一个role
    role.menus = this.auth.current.getMenus()
    role.auth_time = Date.now()
    role.auth_name = memoryUtils.user.username
    const result = await reqUpdateRole(role)
    if (result.status === 0) {
      this.setState({showAuth: false})
      message.success('更新角色成功')
      // 无需setState也能实现更新
      this.setState({
        roles: [...this.state.roles]
      })
    }else {
      message.error('更新角色失败')
    }
  }

  render() {
    const { roles, role, showAdd, showAuth } = this.state
    const title = (
      <span>
        <Button 
          type="primary" 
          onClick={() => this.setState({showAdd: true})}
        >创建角色</Button>&nbsp;&nbsp;
        <Button 
          type="primary" 
          disabled={!role._id}
          onClick={() => this.setState({showAuth: true})}
        >设置角色权限</Button>
      </span>
    )
    return (
      <Card title={title}>
        <Table
          dataSource={roles}
          columns={this.columns}
          bordered // 展示边框
          pagination={{ pageSize: PAGE_SIZE}}
          // 指定key
          rowKey="_id"
          rowSelection={{type: 'radio', selectedRowKeys: [role._id]}} // checkbox/radio
          onRow={this.onRow} // 处理点击事件
        />
        <Modal
          title="添加角色"
          visible={showAdd}
          onOk={this.addRole}
          onCancel={() => {
            this.setState({showAdd: false})
            // 清空表单
            this.form.resetFields()
          }}
        >
          <AddForm setForm={(form) => this.form = form} />
        </Modal>
        <Modal
          title="设置角色权限"
          visible={showAuth}
          onOk={this.updateRole}
          onCancel={() => {
            this.setState({showAuth: false})
          }}
        >
          <AuthForm ref={this.auth} role={role} />
        </Modal>
      </Card>
    );
  }
}
