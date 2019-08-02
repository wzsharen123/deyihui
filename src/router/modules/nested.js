/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const nestedRouter = {
  path: '/nested',
  component: Layout,
  redirect: '/nested/menu1/menu1-1',
  name: 'Nested',
  meta: {
    title: '医药代表管理',
    icon: 'nested'
  },
  children: [{
    path: 'menu1',
    component: () =>
                import('@/views/nested/menu1'),
    name: 'Menu1',
    meta: { title: '医药代表列表' }
  },
  {
    path: 'menu2',
    name: 'Menu2',
    component: () =>
                import('@/views/nested/menu2/index'),
    meta: { title: '经销商列表' }
  },
  {
    path: 'menucread',
    name: 'menucread',
    component: () =>
                import('@/views/nested/menucread/index'),
    meta: { title: '助理编辑' },
    hidden: true
  },
  {
    path: 'doctor',
    name: 'doctor',
    component: () =>
                import('@/views/nested/doctor/index'),
    meta: { title: '医生' }

  },
  {
    path: 'drug',
    name: 'drug',
    component: () =>
                import('@/views/nested/drug/index'),
    meta: { title: '所属药品' }

  }
  ]
}

export default nestedRouter
