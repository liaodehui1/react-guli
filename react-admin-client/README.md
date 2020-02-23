# React项目-硅谷后台
## 过程
1. `yarn add antd`引入`antd` UI库
2. `yarn add react-app-rewired customize-cra babel-plugin-import` 组件按需加载（具体参见antd文档）  
  `react-app-rewired`和`customize-cra`用于无需`yarn eject`对webpack配置进行修改
3. 引入`yarn add less less-loader`,配置`config-overrides.js`自定义主题
4. 引入`yarn add react-router-dom`路由包
5. 引入重置样式，github搜索`reset css`，引入`minireset.css`的内容，在public下建立reset.css， 并在index.html引入
6. 登录页面编写，使用antd的Form表单组件
- Form.create()(Login) 给Login传入了一个强大的对象 form
- getFieldDecorator(标识名称，{ rules: [], initialValue })(标签)
- form.validateFields(async (err, values) => {}) 进行表单所有控件的校验
7. 封装axios，根据接口文档建立接口函数
8. 从`customize-cra`中引入`addWebpackAlias`，进行别名配置
9. 跨域（协议、域名、端口号）问题：package.json中添加`"proxy": "http://localhost:5000"`配置
10. `yarn add store`引入store对登录状态进行存储，代替原生localStorage操作
11. 设置menuConfig菜单配置表，动态生成菜单
12. 使用`withRouter`高阶组件，传入location、history、match，设置`defaultSelectedKeys`默认选中的菜单项，设置`defaultOpenKeys`默认展开的子菜单
## 知识点
1. react img中的src不支持直接赋值相对路径，即不支持`<img src={./images/logo.png} alt="logo"/>`
- import方法
```js
import logo from './images/logo.png';
<img src={logo} alt="logo"/>
```
- require方法
```js
<img src={require('./images/logo.png')} />
```
2. 高阶组件
- 本质就是一个函数
- 接受一个组件（被包装组件），返回一个新的组件（包装组件），包装组件向被包装组件传入特定的属性
- 作用：扩展组件的功能

3. [表单校验](https://ant.design/components/form-cn/#components-form-demo-normal-login)
- 声明式验证：直接使用别人定义好的验证规则进行验证
- 自定义校验

4. 嵌套路由（有子路由）不要加exact属性，会阻碍子路由匹配，而且`/`路由放到最后才不会阻碍`/login`