import { RouteRecordRaw } from 'vue-router'
import Layout from 'layouts/MainLayout.vue'

export const constantRoutes: RouteRecordRaw[] = [

  {
    path: '/login',
    component: () => import('pages/auth/login/LoginIndex.vue'),
    name: 'Login',
  },

  {
    path: '/',
    component: markRaw(Layout),
    redirect: '/dashboard',
    name: 'Dashboard',
    meta: {
      icon: 'home',
    },
    children: [
      {
        path: 'dashboard',
        component: () => import('pages/IndexPage.vue'),
        name: 'Dashboard',
        meta: {
          title: 'dashboard',
          icon: 'home',
          affix: true,
        },
      },
    ],
  }

]

export const asyncRoutes: RouteRecordRaw[] = [

  {
    path: '/user',
    component: markRaw(Layout),
    redirect: '/user/index',
    name: 'User',
    meta: {
      title: 'users',
      icon: 'person',
      roles: ['administrator'],
    },
    children: [
      {
        path: 'index',
        component: () => import('pages/user/UserIndex.vue'),
        name: 'User',
        meta: {
          title: 'View User List',
          icon: 'user',
        },
      },
      {
        path: 'create',
        component: () => import('pages/user/UserCreate.vue'),
        name: 'User Create',
        meta: {
          title: 'Add New User',
          icon: 'group_add',
        },
      },

    ],
  },

  {
    path: '/role',
    component: markRaw(Layout),
    redirect: '/role/index',
    name: 'Role',
    meta: {
      title: 'roles',
      icon: 'group',
      roles: ['administrator'],
    },
    children: [
      {
        path: 'index',
        component: () => import('pages/role/RoleIndex.vue'),
        name: 'Role Index',
        meta: {
          title: 'Show Roles List',
          icon: 'people',
        },
      },
      {
        path: 'create',
        component: () => import('pages/role/RoleCreate.vue'),
        name: 'Role Create',
        meta: {
          title: 'Create Role',
          icon: 'group_add',
        },
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    name: 'NotFound',
    component: () => import('pages/ErrorNotFound.vue'),
  },

]
