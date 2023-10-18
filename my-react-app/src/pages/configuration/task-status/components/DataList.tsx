import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Col, ColorPicker, List, Modal, Row, Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';
import styles from '../TaskStatusConfiguration.module.scss';
import Paragraph from 'antd/es/typography/Paragraph';

interface IProps {
  data: A[];
  openPanel: (data?: A) => void;
}
function DataList(props: IProps) {
  const { t } = useTranslation();
  const { confirm } = Modal;

  const deleteTaskStatus = async (item: A) => {
    confirm({
      content: t('Department_Delete_Remind_Text').replace('{0}', item.title),
      title: t('Common_Confirm'),
      okText: t('Common_Delete'),
      cancelText: t('Common_Cancel'),
      onOk() {
        // confirmDelete(item.id);
      }
    });
  };

  const TableHeader = (
    <>
      <Button type="text" onClick={() => props.openPanel()} icon={<PlusOutlined />}>
        {t('Common_AddNew')}
      </Button>
    </>
  );

  const item = (item: A) => (
    <List.Item>
      <List.Item.Meta
        title={
          <Row>
            <Col style={{ width: '80%' }}>
              <div className={styles.itemContent}>
                <Col>
                  <ColorPicker defaultValue={item.color} disabled size="small" style={{ marginRight: 20 }} />
                </Col>
                <Col style={{ maxWidth: '80%' }}>
                  <Paragraph ellipsis={{ rows: 1, expandable: false }} style={{ width: 'auto', maxWidth: '100%' }}>
                    {item.title}
                  </Paragraph>
                  <Tooltip placement="bottom" title={item.description} color="#ffffff" arrow={true}>
                    <Paragraph
                      ellipsis={{ rows: 1, expandable: false }}
                      style={{ width: 'auto', maxWidth: '100%', fontWeight: 400 }}
                    >
                      {item.description}
                    </Paragraph>
                  </Tooltip>
                </Col>
              </div>
            </Col>
            <Col>
              <Tooltip placement="bottom" title={t('Common_Edit')} color="#ffffff" arrow={true}>
                <Button type="text" onClick={() => props.openPanel(item)} icon={<EditOutlined />} />
              </Tooltip>
              <Tooltip placement="bottom" title={t('Common_Delete')} color="#ffffff" arrow={true}>
                <Button
                  disabled={!item.deleteable}
                  type="text"
                  onClick={() => deleteTaskStatus(item)}
                  icon={<DeleteOutlined />}
                />
              </Tooltip>
            </Col>
          </Row>
        }
      />
    </List.Item>
  );

  return (
    <>
      <List
        itemLayout="horizontal"
        dataSource={props.data}
        className={styles.list}
        bordered
        renderItem={item}
        header={TableHeader}
      />
    </>
  );
}

export default DataList;
