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
    path: 'menu1-1',
    component: () =>
                import('@/views/nested/menu1/menu1-1'),
    name: 'Menu1-1',
    meta: { title: '医药代表列表' }
  },
  {
    path: 'menu2',
    name: 'Menu2',
    component: () =>
                import('@/views/nested/menu2/index'),
    meta: { title: '经销商列表' }
  }
  ]
}

export default nestedRouter
