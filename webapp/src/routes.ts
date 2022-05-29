import { Router } from '@vaadin/router';
import './pages';

export function initRouter(element: HTMLElement) {
  const router = new Router(element);
  router.setRoutes([
    { path: '/',      redirect:  '/home' },
    { path: '/home',  component: 'app-home' },
    { path: '/split', component: 'app-split' },
    { path: '/humans', component: 'app-add-human' },
    // { path: '(.*)',   component: 'not-found-view' }
  ]);
}