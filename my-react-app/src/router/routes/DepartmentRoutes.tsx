import { ERole } from '../../common/ERole';
import { lazy } from 'react';

const Department = lazy(() => import('../../pages/department/list/Department'));
const DepartmentDetai = lazy(() => import('../../pages/department/view-detail/ViewDetail'));

const routes: IRouter.IRoute<'/department'>[] = [
  {
    path: '/department',
    name: 'department',
    exact: true,
    element: Department,
    meta: { role: [ERole.Admin], pageTitle: 'Departments' }
  },
  {
    path: '/department/department-detail/:name/:id',
    name: 'departmentDetail',
    exact: true,
    element: DepartmentDetai,
    meta: { role: [ERole.Admin], pageTitle: 'Departments Detail' }
  }
];

export default routes;
