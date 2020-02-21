import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/login/login';
import Admin from './pages/admin/admin';

/**
 * 应用根组件
 */
function App() {
  return (
    <BrowserRouter>
    {/* switch 只配一个 */}
      <Switch>
        {/* exact 精准匹配 */}
        <Route path="/" component={Admin} exact></Route>
        <Route path="/login" component={Login}></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
