### 搭建最简单的路由环境

#### 1.生成项目

  create-react-app react-router-4
  cd react-router-4
  yarn start

#### 2.安装react-router-dom
  
  npm install react-router-dom -S

#### 3.配置基本路由

  src/App.js

#### 4.跑通路由

  1.HashRouter

    1) 多个Route，需要div包裹
      ReactDOM.render(
        <Router>
            <div>
                <Route path="/" component={Root} />
                <Route path="/home" component={Home} />
                <Route path="/user" component={User} />
                <Route path="/profile" component={Profile} />
            </div>
        </Router>,document.querySelector('#root')
      );

    2) / 符合所有条件 /home /profile ……都会显示

#### 5.小功能 ： 首页 / 用户管理 / 个人设置  登陆拦截

    <Link to="/home">首页</Link>  相当于a标签

    栈 ： 先进后出

    index.js:2177 Warning: Hash history cannot PUSH the same path; a new entry will not be added to the history stack

    BrowserRouter不存在这种问题

    嵌套路由：在一个组件里面有切换的时候可以采用嵌套路由

    详情
    this.props
    {
      "history":{}, // 路由跳转 路径
      "location":{// 当前路径 pathname 当前路径
        pathname: "/user/detail/2", 
        search: "", 
        hash: "", 
        state: undefined, 
        key: "corerd"
      },
      match:{ // 匹配结果，如果匹配上就是对象，匹配不上就是null
        path: "/user/detail/:id", 
        url: "/user/detail/2", 
        isExact: true, // 精确匹配
        params: {
          id:1
        }
      }
    }

    pathname很重要

    <input type="text" className="form-control" ref={ref => this.name=ref} />
    ref引用，代表真实的dom元素

#### 6.switch

    // 精确匹配
    <Route exact path="/" render={props => <div>首页</div>} />

    // 从上到下进行匹配，如果符合就不再匹配 switch只显示一个组件
    <Switch>
        <Route exact path="/" render={props => <div>首页</div>} />
        <Route path="/:name" render={props => <div>{props.match.params.name}</div>} />
        <Route path="/home" component={Home} />
        <Route path="/user" component={User} />
        <Route path="/profile" component={Profile} />
    </Switch>

#### 7.实现登录和退出功能

    Redirect 重定向到另一个路由
    
    withRouter 使用此方法来插入react-router路由参数

    <ProtectedRoute path="/profile" component={Profile} />

    // ProtectedRoute.js
    export default  function({component:Component,...rest}) {
        return <Route {...rest} render={(props)=>
            localStorage.getItem('login')?<Component />: <Redirect to={{
                pathname:'/login',
                state:{from:props.location.pathname}
            }} />
        } />
    }

    // login.js
    export default function (props) {
        return <button className="btn btn-primary" onClick={() => {
          localStorage.setItem('login','true');
          props.history.push(props.location.state.from);
        }}>登陆</button>
    }

#### 8.自定义菜单
    children不管当前的路径是否匹配上，都会渲染对应的组件
    match

    export default function ({to,label}) { 
        return (
            <Route path={to} children={({match}) => {
                return <li className={match ? 'active':''}><Link to={to}>{label}</Link></li>
            }} />
        )
    }

    app.js
    <ul className="nav navbar-nav">
        <MenuLink label="首页" to="/home" />
        <MenuLink label="用户管理" to="/user" />
        <MenuLink label="个人设置" to="/profile" />
    </ul>

#### 9.在跳转的时候进行提示

    userAdd.js

    // 设置全局的状态
    constructor(props) {
      super(props);
      // 默认不阻止
      this.state = { blocking: false };
    }

    提示的组件
    import { Prompt } from "react-router-dom";

    <Prompt
      when={this.state.blocking}
      message={(location) =>`你确定你要跳转到${location.pathname}吗？`}
    />

    <div className="form-group">
      <lable htmlFpr="name">姓名</lable>
      <input
        type="text"
        className="form-control"
        onChange={this.handleChange}
        ref={ref => (this.name = ref)}
      />
    </div>

    handleChange = event => {
      this.setState({
        blocking: event.target.value && event.target.value.length > 0
      });
    };

    // 排除正常的跳转  在handleSubmit里去修改全局的状态
    this.setState({
      blocking: false
    },()=>{
      // history.push 跳转到列表
      this.props.history.push("/user/list");
    });

#### 10.404页面

    import React from 'react'
    export default function () {  
        return <div>页面不存在</div>
    }

    不用写path,从上到下进行匹配
    <Route component={NotFound} />


    

    




