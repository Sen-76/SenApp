import { ERole } from '../common/ERole';
import { lazy } from 'react';
import TestRoutes from './routes/TestRoutes';
import Overview from './routes/OverviewRoutes';
import Kanban from './routes/KanbanRoutes';
import User from './routes/UserRoutes';
import Configuration from './routes/ConfigurationRoutes';
import Department from './routes/DepartmentRoutes';

const NotFound = lazy(() => import('../common/pages/not-found/NotFound'));

const AppLayout = lazy(() => import('../AppLayout'));
const LoginPage = lazy(() => import('../pages/authentication/login/Login'));

export const routers: IRouter.IRoute[] = [
  { path: '/login', name: 'login', element: LoginPage, meta: { pageTitle: 'login' } },
  {
    path: '/',
    element: AppLayout,
    name: 'layout',
    meta: { role: [ERole.Admin], pageTitle: 'layout' },
    children: [...Overview, ...TestRoutes, ...Kanban, ...User, ...Configuration, ...Department]
  },
  { path: '/404', name: '404page', element: NotFound, meta: { pageTitle: '404' } },
  { path: '*', name: '404', element: NotFound, meta: { pageTitle: '404' } }
];
