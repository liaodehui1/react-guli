# React项目-硅谷后台
## 过程
1. `yarn add antd`引入`antd` UI库
2. `yarn add react-app-rewired customize-cra babel-plugin-import` 组件按需加载（具体参见antd文档）
3. 引入`yarn add less less-loader`,配置`config-overrides.js`自定义主题
4. 引入`yarn add react-router-dom`路由包
5. 引入重置样式，github搜索`reset css`，引入`minireset.css`的内容，在public下建立reset.css， 并在index.html引入
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