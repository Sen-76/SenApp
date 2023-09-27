import { ERole } from '../common/ERole';
import { lazy } from 'react';
import TestRoutes from './routes/TestRoutes';
import Overview from './routes/OverviewRoutes';
import Kanban from './routes/KanbanRoutes';
import User from './routes/UserRoutes';
import Configuration from './routes/ConfigurationRoutes';
import Management from './routes/ManagementRoutes';
import Task from './routes/TaskRoutes';

const NotFound = lazy(() => import('../common/pages/not-found/NotFound'));

const AppLayout = lazy(() => import('../AppLayout'));
const LoginPage = lazy(() => import('../pages/authentication/login/Login'));
const ForgotPage = lazy(() => import('../pages/authentication/forgot/Forgot'));

export const routers: IRouter.IRoute[] = [
  { path: '/login', name: 'login', element: LoginPage, meta: { pageTitle: 'login' } },
  { path: '/forgot', name: 'forgot', element: ForgotPage, meta: { pageTitle: 'forgot' } },
  {
    path: '/',
    element: AppLayout,
    name: 'layout',
    meta: { role: [ERole.Admin], pageTitle: 'layout' },
    children: [...Overview, ...TestRoutes, ...Kanban, ...User, ...Configuration, ...Management, ...Task]
  },
  { path: '/404', name: '404page', element: NotFound, meta: { pageTitle: '404' } },
  { path: '*', name: '404', element: NotFound, meta: { pageTitle: '404' } }
];
