/**
 * 前端路由配置
 * 所有组件都被wrappers组件覆盖(高阶组件)
 * 用于判断登录状态，提供全局的登录登出操作
 */

export default [
  {
    path: '/',
    component: '@/wrappers',
    routes: [
      {
        path: '/login',
        component: '@/pages/Login',
        exact: true,
      },
      {
        path: '/workPlace',
        component: '@/pages/HomePage',
        exact: true,
      },
    ],
  },
];
