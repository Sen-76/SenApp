import { Button, Checkbox, Col, Form, Input, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import styles from './ChangePassword.module.scss';
import { UserOutlined } from '@ant-design/icons';
import { useBreadcrumb } from '@/components/breadcrum/Breadcrum';
import { useEffect, useState } from 'react';
import { useRule } from '@/common/rule/rule';

function ChangePassword() {
  const { t } = useTranslation();
  const { setBreadcrumb } = useBreadcrumb();
  const [isValid, setIsValid] = useState<A>(['eightCharacters']);
  const [customAlert, setCustomAlert] = useState<A>();
  const [form] = Form.useForm();
  const validPassList = [
    {
      label: t('At_Least_8_Character'),
      value: 'eightCharacters'
    },
    {
      label: t('At_Least_1_Digit'),
      value: 'number'
    },
    {
      label: t('At_Least_1_Special_Character'),
      value: 'special'
    },
    {
      label: t('At_Least_1_Lowercase_Character'),
      value: 'lowerCase'
    },
    {
      label: t('At_Least_1_Uppercase_Character'),
      value: 'upperCase'
    }
  ];

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = event.target.value;
    setIsValid([
      /[A-Z]/.test(newPassword) && 'upperCase',
      /[a-z]/.test(newPassword) && 'lowerCase',
      newPassword.length >= 8 && 'eightCharacters',
      /\d/.test(newPassword) && 'number',
      /[!@#$%^&*()_+{}[\]:;<>,.?~\\-]/.test(newPassword) && 'special'
    ]);
  };

  const validatePasword = (rule: A, value: string) => {
    if (!/[A-Z]/.test(value)) {
      return Promise.reject('At_Least_1_Uppercase_Character');
    }
    if (!/[a-z]/.test(value)) {
      return Promise.reject('At_Least_1_Lowercase_Character');
    }
    if (!/[!@#$%^&*()_+{}[\]:;<>,.?~\\-]/.test(value)) {
      return Promise.reject('At_Least_1_Special_Character');
    }
    if (!/\d/.test(value)) {
      return Promise.reject('At_Least_1_Digit');
    }
    if (value.length < 8) {
      return Promise.reject('At_Least_8_Character');
    }
    return Promise.resolve();
  };

  const formRule = {
    oldPassword: [useRule().createRequiredRule(true, false)],
    newPassword: [{ validator: validatePasword }, useRule().createRequiredRule(true, false)],
    rePassword: [useRule().createRequiredRule(true, false)]
  };

  const onFinish = async () => {
    const validate = await form.validateFields();
    if (validate) {
      if (form.getFieldValue('newPass') !== form.getFieldValue('rePassword')) {
        setCustomAlert({ rePassword: 'Password_Are_Not_Match' });
      }

      console.log(form.getFieldsValue());
    }
  };

  useEffect(() => {
    setBreadcrumb([{ icon: <UserOutlined />, text: `${t('management')}` }, { text: `${t('Change_Password')}` }]);
  }, [t]);

  return (
    <div className={styles.changePassword}>
      <Row>
        <Col span={12}>
          <Form layout="vertical" form={form} onFinish={onFinish}>
            <Form.Item
              label={t('Old_Password')}
              name="oldPass"
              rules={formRule.oldPassword}
              className={customAlert?.oldPassword && 'customFieldAlert'}
            >
              <Input.Password onChange={() => setCustomAlert({ ...customAlert, oldPassword: '' })} />
            </Form.Item>
            {customAlert?.oldPassword && <div className="customAlert">{t('Common_Login_PasswordRequire_Alert')}</div>}
            <Form.Item label={t('New_Password')} name="newPass" rules={formRule.newPassword}>
              <Input.Password onChange={handlePasswordChange} />
            </Form.Item>
            <Form.Item
              label={t('Confirm_Password')}
              name="rePassword"
              rules={formRule.rePassword}
              className={customAlert?.rePassword && 'customFieldAlert'}
            >
              <Input.Password onChange={() => setCustomAlert({ ...customAlert, rePassword: '' })} />
            </Form.Item>
            {customAlert?.rePassword && <div className="customAlert">{t('Password_Are_Not_Match')}</div>}
          </Form>
        </Col>
        <Col span={12}>
          <Checkbox.Group
            disabled
            options={validPassList}
            value={isValid}
            style={{ display: 'flex', flexDirection: 'column', gap: 20, color: '#222222 !important' }}
          />
        </Col>
      </Row>
      <div className="actionBtnBottom">
        <Button type="primary" onClick={onFinish}>
          {t('Common_Confirm')}
        </Button>
      </div>
    </div>
  );
}

export default ChangePassword;
