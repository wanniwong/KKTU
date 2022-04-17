
const routes = [
  {
    path: '/', component: () => import('layouts/FirstLogin.vue'),
    children: [
      { path: '', component: () => import('pages/Login.vue') }
    ]
  },
  {
    path: '/Dashboard',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Dashboard.vue') },
      { path: '/Call', component: () => import('pages/Call.vue') },
      { path: '/Pharmacy', component: () => import('pages/Pharmacy.vue') },
      { path: '/QueueList', component: () => import('pages/QueueList.vue') },
      { path: '/Monthly', component: () => import('pages/Monthly.vue') },
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
