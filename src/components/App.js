import React from "react";
import {
  // HashRouter as Router, // 容器
  BrowserRouter as Router,
  Route, // 一条路由,
  // Link
  Switch
} from "react-router-dom";
import MenuLink from "./MenuLink";

import "bootstrap/dist/css/bootstrap.css";

import Home from "./Home";
import User from "./User";
import Profile from "./Profile";
import Login from './Login'
import ProtectedRoute from './ProtectedRoute'

export default (
  <Router>
    <div>
      <nav className="navbar navbar-inverse">
        <div className="container-fluid">
          <div className="navbar-header">
            <div className="navbar-brand">JUDDY管理系统</div>
          </div>
          <ul className="nav navbar-nav">
            <MenuLink label="首页" to="/home" />
            <MenuLink label="用户管理" to="/user" />
            <MenuLink label="个人设置" to="/profile" />
          </ul>
        </div>
      </nav>
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <Switch>
              <Route exact path="/" render={props => <div>首页</div>} />
              <Route path="/login" component={Login} />
              <Route path="/home" component={Home} />
              <Route path="/user" component={User} />
              <ProtectedRoute path="/profile" component={Profile} />
            </Switch>
          </div>
        </div>
      </div>
    </div>
  </Router>
);

/**
 * 1.A <Router> may have only one child element
 *   需要用div进行包裹
 * 2.http://localhost:3000/#/profile
     切换#之后的路径进行匹配
     如果匹配多个就显示多个
   3.Link
    <Link to="/home">首页</Link>  相当于a标签
   4.<Route
                path="/:name"
                render={props => <div>{props.match.params.name}</div>}
              />
 */
