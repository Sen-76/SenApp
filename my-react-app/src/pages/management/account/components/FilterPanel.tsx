import { CloseOutlined } from '@ant-design/icons';
import { Button, Checkbox, Col, Collapse, CollapseProps, Drawer, Form, Row, Typography } from 'antd';
import { forwardRef, useImperativeHandle, useState } from 'react';
import styles from '../AccountManagement.module.scss';
import { DepartmentOptions, GenderOptions, RoleOptions } from '../AccountManagement.Model';
import { useTranslation } from 'react-i18next';

interface IProps {
  refreshList: () => void;
}

function FilterPanel(props: IProps, ref: A) {
  const [open, setOpen] = useState<boolean>(false);
  const [items, setItems] = useState<CollapseProps['items']>([]);
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { Paragraph } = Typography;

  const getFilterValue = () => {
    const DepartmentElement = (
      <Form.Item name="department">
        <Checkbox.Group>
          <Row>
            {DepartmentOptions.map((item: A) => (
              <Col span={12} key={item.value} className={styles.col}>
                <Checkbox value={item.value}>
                  <Paragraph ellipsis={{ rows: 4, expandable: false }}>{item.label}</Paragraph>
                </Checkbox>
              </Col>
            ))}
          </Row>
        </Checkbox.Group>
      </Form.Item>
    );
    const GenderElement = (
      <Form.Item name="gender">
        <Checkbox.Group>
          <Row>
            {GenderOptions.map((item: A) => (
              <Col span={12} key={item.value} className={styles.col}>
                <Checkbox value={item.value}>
                  <Paragraph ellipsis={{ rows: 4, expandable: false }}>{item.label}</Paragraph>
                </Checkbox>
              </Col>
            ))}
          </Row>
        </Checkbox.Group>
      </Form.Item>
    );
    const RoleElement = (
      <Form.Item name="role">
        <Checkbox.Group>
          <Row>
            {RoleOptions.map((item: A) => (
              <Col span={12} key={item.value} className={styles.col}>
                <Checkbox value={item.value}>
                  <Paragraph ellipsis={{ rows: 4, expandable: false }}>{item.label}</Paragraph>
                </Checkbox>
              </Col>
            ))}
          </Row>
        </Checkbox.Group>
      </Form.Item>
    );
    const item = [
      { key: 'department', label: t('department'), children: DepartmentElement },
      { key: 'gender', label: t('gender'), children: GenderElement },
      { key: 'role', label: t('role'), children: RoleElement }
    ];
    setItems(item);
  };

  useImperativeHandle(ref, () => ({
    openDrawer
  }));

  const openDrawer = (data?: A) => {
    console.log(data);
    // const dataTable: A = {
    //   status: data?.filter.find((x: A) => x.key === 'Status')?.value ?? []
    // };
    // form.setFieldsValue(dataTable);
    setOpen(true);
    getFilterValue();
  };

  const closeDrawer = () => {
    setOpen(false);
    resetForm();
  };

  const resetForm = () => {
    form.resetFields();
  };

  const onFinish = (val: A) => {
    console.log(val);
    closeDrawer();
    props.refreshList();
  };

  return (
    <>
      <Drawer
        title={t('Common_Filter')}
        placement="right"
        open={open}
        extra={<CloseOutlined onClick={closeDrawer} />}
        onClose={closeDrawer}
        maskClosable={false}
        closable={false}
        width={420}
        destroyOnClose={true}
      >
        <Form form={form} onFinish={onFinish} layout="vertical" className={styles.panelform}>
          <Collapse
            items={items}
            bordered={false}
            defaultActiveKey={['department', 'gender', 'status', 'role']}
            ghost
            size="large"
            expandIconPosition="end"
            collapsible="icon"
          />
          <div className="actionBtnBottom">
            <Button onClick={closeDrawer}>{t('Common_Cancel')}</Button>
            <Button onClick={resetForm}>{t('Common_Reset')}</Button>
            <Button type="primary" htmlType="submit">
              {t('Common_Confirm')}
            </Button>
          </div>
        </Form>
      </Drawer>
    </>
  );
}

export default forwardRef(FilterPanel);
