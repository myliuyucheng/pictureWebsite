 // 用户列表
 const user = {
    path: 'users',
    name: "Users",
    component: ()=>import("@/components/users/User"),
    meta: {
      title: "用户列表",
      breadcrumb: true,   
    },
    children: [{
      path: "",
      name: "UserList",
      component: ()=>import("@/components/users/base/UserList"),
    }]
}

export default user