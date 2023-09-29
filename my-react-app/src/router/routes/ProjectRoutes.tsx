import { ERole } from '../../common/ERole';
import { lazy } from 'react';

const Projects = lazy(() => import('../../pages/projects/Projects'));

const routes: IRouter.IRoute<'/projects'>[] = [
  {
    path: '/projects',
    name: 'projects',
    exact: true,
    element: Projects,
    meta: { role: [ERole.Admin], pageTitle: 'Projects' }
  }
];

export default routes;
