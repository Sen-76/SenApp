import { ERole } from '../../common/ERole';
import { lazy } from 'react';

const Profilte = lazy(() => import('../../pages/user/profile/Profile'));

const routes: IRouter.IRoute<'/user'>[] = [
  {
    path: '/user/profile',
    name: 'profile',
    exact: true,
    element: Profilte,
    meta: { role: [ERole.Admin], pageTitle: 'Profile' }
  }
];

export default routes;
