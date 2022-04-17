
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/PageAuth.vue')},
      { path: '/home', component: () => import('pages/Home.vue')},
      { path: '/collect_med', component: () => import('pages/Collect_Med.vue')},
      { path: '/queue', component: () => import('pages/Queue.vue')},
      { path: '/sign_up', component: () => import('pages/Sign_up.vue')},
      { path: '/online', component: () => import('pages/online.vue') },
      { path: '/debit', component: () => import('pages/debit.vue') },
      { path: '/topup', component: () => import('pages/TopUp.vue') },
      { path: '/topupexact', component: () => import('pages/TopUpExact.vue') },
      { path: '/onlineexact', component: () => import('pages/onlineExact.vue') },
      { path: '/payment', component: () => import('pages/payment.vue') },
      { path: '/successexact', component: () => import('pages/exactsuccess.vue') },
      { path: '/fail', component: () => import('pages/fail.vue') },
      { path: '/stopup', component: () => import('pages/successdeduct.vue') },
      { path: '/paysu', component: () => import('pages/paymentsccess.vue') },
      { path: '/ex', component: () => import('pages/exactsuccess.vue') },
      { path: '/sc', component: () => import('pages/successcard.vue') },      
      { path: '/sc2', component: () => import('pages/successcard2.vue') },      
      { path: '/debit_exact', component: () => import('pages/debitExact.vue') },  
      { path: '/qr', component: () => import('pages/ScanQR.vue') },  
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
