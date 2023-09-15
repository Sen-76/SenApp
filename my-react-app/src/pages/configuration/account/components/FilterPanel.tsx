import { CloseOutlined } from '@ant-design/icons';
import { Button, Checkbox, Col, Collapse, CollapseProps, Drawer, Form, Input, Row, Typography } from 'antd';
import { forwardRef, useImperativeHandle, useState } from 'react';
import styles from '../AccountConfiguration.module.scss';
import { DepartmentOptions, GenderOptions, RoleOptions, StatusOptions } from '../AccountConfiguration.Model';
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
    const StatusElement = (
      <Form.Item name="status">
        <Checkbox.Group>
          <Row>
            {StatusOptions.map((item: A) => (
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
      { key: 'department', label: 'Department', children: DepartmentElement },
      { key: 'gender', label: 'Gender', children: GenderElement },
      { key: 'status', label: 'Status', children: StatusElement },
      { key: 'role', label: 'Role', children: RoleElement }
    ];
    setItems(item);
  };

  useImperativeHandle(ref, () => ({
    openDrawer
  }));

  const openDrawer = (data?: A) => {
    console.log(data);
    setOpen(true);
    getFilterValue();
  };

  const closeDrawer = () => {
    setOpen(false);
  };

  const onFinish = (val: A) => {
    console.log(val);
  };

  return (
    <>
      <Drawer
        title={t('filter')}
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
          <div className={styles.actionBtnBottom}>
            <Button onClick={closeDrawer}>Cancel</Button>
            <Button onClick={closeDrawer}>Reset</Button>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </div>
        </Form>
      </Drawer>
    </>
  );
}

export default forwardRef(FilterPanel);
