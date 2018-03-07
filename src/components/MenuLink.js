import React from 'react'
import { Route, Link } from 'react-router-dom'
/**
 * 有时候我们希望一个组件不管是否匹配都显示一些东西 children
 * component 对用一个组件，当url路径跟当前Route path匹配时渲染
 * render 对应一个匿名组件函数 当url路径跟当前Route path匹配时渲染 
 */
export default function ({to,label}) { 
    return (
        <Route path={to} children={({match}) => {
            return <li className={match ? 'active':''}><Link to={to}>{label}</Link></li>
        }} />
    )
}


