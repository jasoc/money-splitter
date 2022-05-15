import { Router } from '@vaadin/router';
import './pages';

export function initRouter() {
  const router = new Router(document.getElementById('router'));
  router.setRoutes([
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: 'app-home'
    },
    {
      path: '/about',
      component: 'app-about',
    },
    {
      path: '(.*)',
      component: 'not-found-view',
    }
  ]);
}