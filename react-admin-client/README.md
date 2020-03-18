# React项目-硅谷后台
## 过程
1. `yarn add antd`引入`antd` UI库
2. `yarn add react-app-rewired customize-cra babel-plugin-import` 组件按需加载（具体参见antd文档）  
  `react-app-rewired`和`customize-cra`用于无需`yarn eject`对webpack配置进行修改
3. 引入`yarn add less less-loader`,配置`config-overrides.js`自定义主题
4. 引入`yarn add react-router-dom`路由包
5. 引入重置样式，github搜索`reset css`，引入`minireset.css`的内容，在public下建立reset.css， 并在index.html引入
6. 从`customize-cra`中引入`addWebpackAlias`，进行别名配置

## 登录页面
1. 使用antd的Form表单组件
- Form.create()(Login) 给Login传入了一个强大的对象 form
- getFieldDecorator(标识名称，{ rules: [], initialValue })(标签)
- form.validateFields(async (err, values) => {}) 进行表单所有控件的校验
2. 封装axios，根据接口文档建立接口函数
3. 跨域（协议、域名、端口号）问题：package.json中添加`"proxy": "http://localhost:5000"`配置
4. `yarn add store`引入store对登录状态进行存储，代替原生localStorage操作
- 建立storageUtils，保存、获取和删除localStorage中的user
- 建立memoryUtils，在内存中保存user
5. 重新运行程序时，在`index.js`中将存储的user信息读入内存

## admin页面
此页面使用antd的`Layout`布局，进行了子路由管理

## LeftNav组件
此组件使用了antd的`Menu`和`SubMenu`
1. 设置menuConfig菜单配置表，`constructor`阶段`getMenuNodes`递归动态生成菜单，只创建一次
2. 使用`withRouter`高阶组件，传入location、history、match属性
- 设置`defaultOpenKeys`默认展开的子菜单
- 设置`selectedKeys`当前选中的菜单项
- 设置`defaultSelectedKeys`默认选中的菜单项 初次无效？
3. `getDerivedStateFromProps`阶段通过判断`pathname`是否改变，更改`selectKey`和`openKey`

## Header组件
1. `getDerivedStateFromProps`阶段根据`pathname`判断是否需要更新title
2. `componentDidMount`阶段通过`jsonp`获取天气信息；建立`dateUtils`格式化时间，开启时间模式，时间模式需要在`componentWillUnmount`阶段清除
3. 封装a标签为公共组件`LinkButton`，退出登录使用antd的Modal组件进行提示，确认退出则删除内存中和客户端存储的user信息 

## Category组件
1. 整体使用antd的`Card`组件，分类列表使用`table`组件

## product/ProductHome组件
1. 建立`utils/constants.js`存储变量
2. 根据ID/Name搜索产品分类列表时，`[searchType]: searchName`一个接口函数完成两种查询操作

## product/ProductDetail组件
1. `antd`的`List.Item`中的`.ant-list-item`样式的`justify-content`默认为`space-between`,将其改为`flex-start`

## product/ProductAddUpdate组件
1. form的item布局：为`Form`组件传入`formItemLayout`
2. 通过`ref`获取子组件imgs和detail

## product/PicturesWall组件
1. 使用了antd的`upload`组件，选择图片后会自动上传图片到后台

## product/RichTextEditor组件
1. `yarn add react-draft-wysiwyg draftjs-to-html`安装依赖
2. 设置`toolbar`属性，实现了图片上传与插入

## role/AuthForm组件
1. 使用了antd的`Tree`树形控件
2. 通过`getDerivedStateFromProps`判断是否需要需要重置state数据

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
- 自定义校验：validator

4. 嵌套路由（有子路由）不要加exact属性，会阻碍子路由匹配，将`/`路由放到最后才不会阻碍`/login`
```js
// app.js
// '/'进入首界面
// '/home'重定向到'/home'，但是由于精准匹配，此时匹配不到了
<Route path="/" component={Admin} exact></Route>
<Route path="/login" component={Login}></Route>
// admin.js
...
// 第一次'/'进入时没有匹配到的子路由，重定向
<Redirect to='/home' />
```

5. jsonp
- 只处理GET请求跨域问题
- jsonp不是ajax请求，只是一般的GET请求
- 过程  
一、浏览器端：通过script请求，并且带上函数参数  
二、服务端：产生结果数据后，返回一个函数调用的代码，并将结果以函数实参传入  
三、客户端：接收到结果则会调用函数

5. setState
- 异步更新state
- 回调函数，在更新state且render()后执行
- 支持函数作为参数，this.setState((state, props) => ({}))

6. `antd`的columns中的`render`接收的参数
- 一般第一个参数是，该列的值
- 而当为actions操作列时，参数为该行的数据item