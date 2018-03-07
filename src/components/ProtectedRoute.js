import React from "react";
import { Redirect, Route } from "react-router-dom";

// 函数方式声明组件
// 当通过函数来定义组件的时候参数是属性对象
// 当一个组件不需要状态的时候-> 函数声明
// 当一个组件需要状态的时候-> 类声明

// props = {path:'/profile',compoment:Profile}
// rest = {path:'/profile'}
// <Route path:'/profile' />

// export default  function({component:Component,...rest}) {
//     return <Route {...rest} render={(props)=>
//         localStorage.getItem('login')?<Component />: <Redirect to={{
//             pathname:'/login',
//             state:{from:props.location.pathname}
//         }} />
//     } />
// }

// 解构赋值 {component:Component,...rest}
export default function({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        localStorage.getItem("login") ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location.pathname }
            }}
          />
        )
      }
    />
  );
}
