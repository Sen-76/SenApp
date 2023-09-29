import { useBreadcrumb } from '@/components/breadcrum/Breadcrum';
import { BookOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

function Projects() {
  const { setBreadcrumb } = useBreadcrumb();
  const { t } = useTranslation();

  useEffect(() => {
    setBreadcrumb([{ icon: <BookOutlined />, text: t('configuration') }, { text: `Smtp ${t('configuration')}` }]);
  }, [t]);
  return <>Projects</>;
}

export default Projects;
