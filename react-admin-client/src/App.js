import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/login/login';
import Admin from './pages/admin/admin';

/**
 * 应用根组件
 */
function App() {
  return (
    <HashRouter>
    {/* switch 只配一个 */}
      <Switch>
        {/* exact 精准匹配 嵌套路由不要加exact属性*/}
        <Route path="/login" component={Login}></Route>
        <Route path="/" component={Admin} ></Route>
      </Switch>
    </HashRouter>
  );
}

export default App;
