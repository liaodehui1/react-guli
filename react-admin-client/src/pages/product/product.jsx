import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import ProductHome from './home';
import ProductDetail from './detail';
import ProductAddUpdate from './add-update';

/**
 * 商品路由组件
 */
export default class Product extends Component {
  render() {
    return (
      <Switch>
        <Route path="/product" component={ProductHome} exact />
        <Route path="/product/detail" component={ProductDetail}/>
        <Route path="/product/addupdate" component={ProductAddUpdate} />
      </Switch>
    );
  }
}
