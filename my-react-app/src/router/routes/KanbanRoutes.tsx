import { ERole } from '../../common/ERole';
import { lazy } from 'react';

const Kanban = lazy(() => import('../../pages/kanban/kanban-board/Kanban'));
const Workflow = lazy(() => import('../../pages/kanban/kanban-workflow/Workflow'));

const routes: IRouter.IRoute<'/kanban'>[] = [
  {
    path: '/kanban',
    name: 'kanban',
    exact: true,
    element: Kanban,
    meta: { role: [ERole.Admin], pageTitle: 'Kanban' }
  },
  {
    path: '/kanban/workflow',
    name: 'workflow',
    exact: true,
    element: Workflow,
    meta: { role: [ERole.Admin], pageTitle: 'Workflow' }
  }
];

export default routes;
