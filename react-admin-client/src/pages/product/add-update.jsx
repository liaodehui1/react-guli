import React, { Component } from 'react';
import {
  Card,
  Input,
  Cascader,
  Icon,
  Form,
  Button,
  message
} from 'antd';
import LinkButton from '@/components/link-button';
import { reqCategorys, reqAddOrUpdateProduct } from '@/api/index';
import PicturesWall from './picture-wall';
import RichTextEditor from './rich-text-editor';

const { Item } = Form
const { TextArea } = Input

class ProductAddUpdate extends Component {
  constructor(props) {
    super(props)
    this.product = props.location.state || {}
    this.isUpdate = !!Object.keys(this.product).length
    this.title = (
      <span>
        <LinkButton onClick={() => props.history.goBack()}>
          <Icon type="arrow-left" style={{ fontSize: 20 }} />
        </LinkButton>
        { this.isUpdate ? '修改商品' : '添加商品' }
      </span>
    )
    // antd栅格布局 24格
    this.formItemLayout = {
      labelCol: { span: 2 }, // label所占格数
      wrapperCol: { span: 8 } // 包裹容器所占格数
    }
    this.state = {
      options: []
    }
    this.pw = React.createRef()
    this.editor = React.createRef()
  }

  componentDidMount() {
    this.getCategorys('0')
  }

  getCategorys = async (parentId) => {
    const res = await reqCategorys(parentId)
    if (res.status === 0) {
      // debugger
      const categorys = res.data
      if (parentId === '0') { // 请求一级列表
        this.initOptions(categorys)
      }else { // 请求二级列表
        return categorys 
      }
    }
  }

  initOptions = async (categorys) => {
    const options = categorys.map(c => ({
      value: c._id,
      label: c.name,
      isLeaf: false
    }))
    // 二级分类商品
    const { isUpdate, product } = this
    const { pCategoryId, categoryId } = product
    if (isUpdate && pCategoryId !== '0') {
      const subCategorys = await this.getCategorys(pCategoryId)
      const childOptions = subCategorys.map(c => ({
        value: c._id,
        label: c.name,
        isLeaf: true
      }))
      const targetOption = options.find(option => option.value === pCategoryId)
      targetOption.children = childOptions
    }
    this.setState({
      options
    })
  }

  // 验证价格
  // value string
  validatePrice = (rules, value, callback) => {
    if (value > 0) {
      callback()
    } else {
      callback('商品价格必须大于0')
    }
  }

  submit = async () => {
    this.props.form.validateFields(async (error, values) => {
      if (!error) {
        // 收集数据封装成product对象
        const { name, desc, price, categoryIds } = values
        let pCategoryId, categoryId
        if (categoryIds.length === 1) {
          pCategoryId = '0'
          categoryId = categoryIds[0]
        }else {
          [pCategoryId, categoryId] = categoryIds
        }
        const imgs = this.pw.current.getImgs() // [图片name]
        const detail = this.editor.current.getDetail()
        const product = { name, desc, price, pCategoryId, categoryId, imgs, detail }
        if (this.isUpdate) { // 更新需要添加_id
          product._id = this.product._id
        }
        const result = await reqAddOrUpdateProduct(product)
        if (result.status === 0) {
          message.success(`${this.isUpdate ? '更新' : '添加'}商品成功`)
        }else {
          message.error(`${this.isUpdate ? '更新' : '添加'}商品失败`)
        }
      } else {
        message.error('保存商品失败')
      }
    })
  }

  // 加载并显示二级列表数据
  loadData = async selectedOptions => {
    // 已选中项组成数组
    const targetOption = selectedOptions[selectedOptions.length - 1];
    // loading状态
    targetOption.loading = true;
    // console.log(targetOption)

    // 请求二级列表
    const subCategorys = await this.getCategorys(targetOption.value)
    if (subCategorys && subCategorys.length > 0) {
      targetOption.children = subCategorys.map(c => ({
        value: c._id,
        label: c.name,
        isLeaf: true
      }))
    }else  {
      targetOption.isLeaf = true
    }
    targetOption.loading = false
    // 更新二级列表
    this.setState({
      options: [...this.state.options]
    })
  };

  render() {
    const { getFieldDecorator } = this.props.form
    const { options } = this.state
    const { isUpdate, product } = this
    const {pCategoryId, categoryId, imgs, detail} = product
    const categoryIds = []
    if (isUpdate) {
      if (pCategoryId === '0') { // 一级分类商品
        categoryIds.push(categoryId)
      }else {
        categoryIds.push(pCategoryId, categoryId)
      }
    }
    console.log(product)
    return (
      <Card title={this.title}>
        <Form {...this.formItemLayout}>
          <Item label="商品名称">
            {
              getFieldDecorator('name', {
                initialValue: product.name,
                rules: [
                  { required: true, message: '商品名称必须输入' }
                ]
              })(
                <Input placeholder="请输入商品名称" />
              )
            }
          </Item>
          <Item label="商品描述">
            {
              getFieldDecorator('desc', {
                initialValue: product.desc,
                rules: [
                  { required: true, message: '商品描述必须输入' }
                ]
              })(
                <TextArea placeholder="请输入商品描述" autoSize />
              )
            }
          </Item>
          <Item label="商品价格">
            {
              getFieldDecorator('price', {
                initialValue: product.price,
                rules: [
                  { required: true, message: '商品价格必须输入' },
                  { validator: this.validatePrice }
                ]
              })(
                <Input type="number" placeholder="请输入商品价格" addonAfter="元" />
              )
            }
          </Item>
          <Item label="商品分类">
            {
              getFieldDecorator('categoryIds', {
                initialValue: categoryIds,
                rules: [
                  {required: true, message: '请必须指定商品分类'}
                ]
              })(
                <Cascader
                  placeholder="请指定商品分类"
                  options={options}
                  loadData={this.loadData}
                />
              )
            }
          </Item>
          <Item label="商品图片">
            <PicturesWall ref={this.pw} imgs={imgs}/>
          </Item>
          <Item label="商品详情" labelCol={{span: 2}} wrapperCol={{span: 20}}>
            <RichTextEditor ref={this.editor} detail={detail} />
          </Item>
          <Item>
            <Button type="primary" onClick={this.submit}>提交</Button>
          </Item>
        </Form>
      </Card>
    );
  }
}

export default Form.create()(ProductAddUpdate)