import { ERole } from '../../common/ERole';
import { lazy } from 'react';

const AccountConfiguration = lazy(() => import('../../pages/configuration/account/AccountConfiguration'));

const routes: IRouter.IRoute<'/configuration'>[] = [
  {
    path: '/configuration/account-configuration',
    name: 'accountconfiguration',
    exact: true,
    element: AccountConfiguration,
    meta: { role: [ERole.Admin], pageTitle: 'Account Configuration' }
  }
];

export default routes;
