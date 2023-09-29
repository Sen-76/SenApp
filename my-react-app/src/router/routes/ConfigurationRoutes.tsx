import { ERole } from '../../common/ERole';
import { lazy } from 'react';

const FileConfiguration = lazy(() => import('../../pages/configuration/file/FileConfiguration'));
const EmailConfiguration = lazy(() => import('../../pages/configuration/email/EmailConfiguration'));
const SmtpConfiguration = lazy(() => import('../../pages/configuration/smtp/Smtp'));

const routes: IRouter.IRoute<'/configuration'>[] = [
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
  },
  {
    path: '/configuration/smtp-configuration',
    name: 'smtpconfiguration',
    exact: true,
    element: SmtpConfiguration,
    meta: { role: [ERole.Admin], pageTitle: 'SMTP Configuration' }
  }
];

export default routes;
