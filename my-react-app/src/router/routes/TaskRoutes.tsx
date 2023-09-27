import { ERole } from '../../common/ERole';
import { lazy } from 'react';

const Tasks = lazy(() => import('../../pages/tasks/Tasks'));

const routes: IRouter.IRoute<'/tasks'>[] = [
  {
    path: '/tasks',
    name: 'tasks',
    exact: true,
    element: Tasks,
    meta: { role: [ERole.Admin], pageTitle: 'Tasks' }
  }
];

export default routes;
