import React, { Component } from "react";

export default class UserDetail extends Component {
  render() {
    // history
    // location
    // match
    let id = this.props.match.params.id;
    // 从缓存中读取用户列表字符串 nul 字符串
    let userStr = localStorage.getItem("users");
    // 转成对象数组
    let users = userStr ? JSON.parse(userStr) : [];
    let user = users.find(user => user.id === Number(id));
    return (
      <table className="table table-border">
        <thead>
          <tr>
            <td>ID </td>
            <td>姓名 </td>
          </tr>
        </thead>
        
        <tbody>
          <tr>
            <td>{user.name}</td>
            <td>{user.id}</td>
          </tr>
        </tbody>
      </table>
    );
  }
}
