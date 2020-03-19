import React, { Component } from 'react';
import {
  Card,
  List,
  Icon
} from 'antd';
import LinkButton from '@/components/link-button';
import './product.less';
import { BASE_IMG_URL } from '@/utils/constants';
import { reqCategoryById } from '@/api/index';
import memoryUtils from '@/utils/memoryUtils';

const { Item } = List

export default class ProductDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cName1: '',
      cName2: ''
    }
    this.title = (
      <span>
        <LinkButton onClick={() => this.props.history.goBack()}>
          <Icon type="arrow-left" style={{fontSize: 20}}/>
        </LinkButton>
        &nbsp;&nbsp;商品详情
      </span>
    )
  }

  componentDidMount() {
    this.getCategoryName()
  }

  getCategoryName = async () => {
    const { categoryId, pCategoryId } = memoryUtils.product
    let cName1, cName2
    if (pCategoryId === '0') {
      const res = await reqCategoryById(categoryId)
      cName1 = res.data.name
      this.setState({ cName1 })
    }else {
      // 同时发起多个请求，无需等待，返回结果有序
      const res = await Promise.all([reqCategoryById(pCategoryId), reqCategoryById(categoryId)])
      cName1 = res[0].data.name
      cName2 = res[1].data.name
      this.setState({ cName1, cName2 })
    } 
  }

  render() {
    const { name, imgs, desc, price, detail } = memoryUtils.product
    const { cName1, cName2 } = this.state
    // console.log(detail)

    return (
      <Card title={this.title} className="product-detail">
        <List>
          <Item>
            <span className="left">商品名称：</span>
            <span>{name}</span>
          </Item>
          <Item>
            <span className="left">商品描述：</span>
            <span>{desc}}</span>
          </Item>
          <Item>
            <span className="left">商品价格：</span>
            <span>{price}元</span>
          </Item>
          <Item>
            <span className="left">所属分类：</span>
            <span>{cName1}{cName2 ? '-->' + cName2 : ''}</span>
          </Item>
          <Item>
            <span className="left">商品图片：</span>
            {
              imgs.map(img => 
                <img className="product-img" 
                  src={BASE_IMG_URL + img}  
                  alt="img"
                  key={img} 
                />
              )
            }
          </Item>
          <Item>
            <span className="left">商品详情：</span>
            {/* <div dangerouslySetInnerHTML={{__html: '<p>a</p>\\n'}}></div> */}
            <span dangerouslySetInnerHTML={{__html: detail}}></span>
          </Item>
        </List>
      </Card>
    );
  }
}
