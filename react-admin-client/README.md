# React项目-硅谷后台
## 过程
1. `yarn add antd`引入`antd` UI库
2. `yarn add react-app-rewired customize-cra babel-plugin-import` 组件按需加载（具体参见antd文档）
3. 引入`yarn add less less-loader`,配置`config-overrides.js`自定义主题
4. less使用配置，`yarn eject`时报有关git的错误，需要先提交代码到本地仓库
6. less配置完成后重新启动报`Cannot find module 'react-scripts/package.json'`错误，需要`yarn add react-scripts`
5. 引入`yarn add react-router-dom`路由包
6. 引入重置样式，github搜索`reset css`，引入`minireset.css`的内容，在public下建立reset.css， 并在index.html引入
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
