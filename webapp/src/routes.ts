import { Router } from '@vaadin/router';
import './pages';

export function initRouter(element: HTMLElement) {
  const router = new Router(element);
  router.setRoutes([
    { path: '/',      redirect:  '/home' },
    { path: '/home',  component: 'app-home' },
    { path: '/about', component: 'app-about' },
    { path: '(.*)',   component: 'not-found-view' }
  ]);
}