import { ERole } from '../../common/ERole';
import { lazy } from 'react';

const AccountConfiguration = lazy(() => import('../../pages/configuration/account/AccountConfiguration'));
const FileConfiguration = lazy(() => import('../../pages/configuration/file/FileConfiguration'));
const EmailConfiguration = lazy(() => import('../../pages/configuration/email/EmailConfiguration'));

const routes: IRouter.IRoute<'/configuration'>[] = [
  {
    path: '/configuration/account-configuration',
    name: 'accountconfiguration',
    exact: true,
    element: AccountConfiguration,
    meta: { role: [ERole.Admin], pageTitle: 'Account Configuration' }
  },
  {
    path: '/configuration/file-configuration',
    name: 'fileconfiguration',
    exact: true,
    element: FileConfiguration,
    meta: { role: [ERole.Admin], pageTitle: 'File Configuration' }
  },
  {
    path: '/configuration/email-configuration',
    name: 'emailconfiguration',
    exact: true,
    element: EmailConfiguration,
    meta: { role: [ERole.Admin], pageTitle: 'Email Configuration' }
  }
];

export default routes;
