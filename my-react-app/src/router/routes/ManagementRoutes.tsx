import { ERole } from '../../common/ERole';
import { lazy } from 'react';

const AccountManagement = lazy(() => import('../../pages/management/account/AccountManagement'));
const DepartmentManagement = lazy(() => import('../../pages/management/department/list/Department'));
const DepartmentDetail = lazy(() => import('../../pages/management/department/view-detail/ViewDetail'));

const routes: IRouter.IRoute<'/management'>[] = [
  {
    path: '/management/account-management',
    name: 'account-management',
    exact: true,
    element: AccountManagement,
    meta: { role: [ERole.Admin], pageTitle: 'Account Management' }
  },
  {
    path: '/management/department-management',
    name: 'department-management',
    exact: true,
    element: DepartmentManagement,
    meta: { role: [ERole.Admin], pageTitle: 'Deparment Management' }
  },
  {
    path: '/management/department-management/department-detail/:name/:id',
    name: 'department-detail',
    exact: true,
    element: DepartmentDetail,
    meta: { role: [ERole.Admin], pageTitle: 'Deparment Management Detail' }
  }
];

export default routes;
