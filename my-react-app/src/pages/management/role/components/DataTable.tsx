import { DeleteOutlined, EditOutlined, PlusOutlined, SmileOutlined } from '@ant-design/icons';
import { Button, Input, Modal, Switch, Tooltip, notification } from 'antd';
import Table, { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import styles from '../Role.module.scss';
import { EState } from '../Role.model';
import Paragraph from 'antd/es/typography/Paragraph';

interface IProps {
  data: Role.IRoleModel[];
  openPanel: (data?: A) => void;
  refreshList: () => void;
  onSearch: (value: string) => void;
  setPage: (paging: number) => void;
  loading: boolean;
  param: Common.IDataGrid;
}
function DataTable(props: IProps) {
  const { data, loading, openPanel, param } = props;
  const { t } = useTranslation();
  const { Search } = Input;
  const { confirm } = Modal;

  const columns: ColumnsType<A> = [
    {
      title: t('Common_Title'),
      dataIndex: 'title',
      key: 'title',
      width: 200,
      render: (_, record) => {
        return record.title;
      }
    },
    {
      title: t('Common_Description'),
      dataIndex: 'description',
      key: 'description',
      width: 300,
      render: (_, record) => {
        return (
          <Tooltip placement="bottom" title={record.description} color="#ffffff" arrow={true}>
            <Paragraph ellipsis={{ rows: 1, expandable: false }} style={{ minWidth: 100 }}>
              {record.description}
            </Paragraph>
          </Tooltip>
        );
      }
    },
    {
      title: t('Common_ModifiedOn'),
      dataIndex: 'modifiedOn',
      key: 'modifiedOn',
      width: 150,
      render: (_, record) => {
        return <div style={{ minWidth: 90 }}>{dayjs(record.updatedDate).format('DD MMM YYYY HH:mm')}</div>;
      }
    },
    {
      title: t('Common_ModifiedBy'),
      dataIndex: 'modifiedBy',
      width: 150,
      key: 'modifiedBy',
      render: (_, record) => {
        return (
          <Tooltip placement="bottom" title={record.modifiedBy} color="#ffffff" arrow={true}>
            <Paragraph ellipsis={{ rows: 1, expandable: false }} style={{ minWidth: 100 }}>
              {record.modifiedBy}
            </Paragraph>
          </Tooltip>
        );
      }
    },
    {
      title: t('Common_Status'),
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (_, record) => {
        const apiHandle = async (value: boolean) => {
          try {
            // value
            //   ? await service.accountService.activeAccount([record.id])
            //   : await service.accountService.deactiveAccount(record.id);
            notification.open({
              message: value ? t('Common_ActivateSuccess') : t('Common_DeactivateSuccess'),
              type: 'success'
            });
            props.refreshList();
          } catch (e) {
            console.log(e);
          }
        };
        const activeChange = async (value: boolean) => {
          if (!value) {
            confirm({
              content: t('Common_DeActive_Confirm').replace('{0}', record.title),
              title: t('Common_Confirm'),
              okText: t('Common_Deactivate'),
              cancelText: t('Common_Cancel'),
              onOk: async () => {
                await apiHandle(value);
              }
            });
          } else {
            await apiHandle(value);
          }
        };
        return (
          <div style={{ minWidth: 120 }}>
            <Tooltip
              placement="bottom"
              title={record.status === EState.Activate ? t('Common_Activate') : t('Common_Inactivate')}
              color="#ffffff"
              arrow={true}
            >
              <Switch checked={record.status === EState.Activate} onChange={activeChange} style={{ marginRight: 5 }} />
            </Tooltip>
          </div>
        );
      }
    },
    {
      title: t('Common_Action'),
      dataIndex: 'action',
      key: 'action',
      className: 'actionCollumn',
      fixed: 'right',
      width: 130,
      render: (_, record) => {
        const deleteHandle = () => {
          confirm({
            content: t('Manage_Role_DeleteConfirm').replace('{0}', record.title),
            title: t('Common_Confirm'),
            okText: t('Common_Delete'),
            cancelText: t('Common_Cancel'),
            onOk: async () => {
              notification.open({
                message: t('Common_DeleteSuccess'),
                type: 'success'
              });
              props.refreshList();
            }
          });
        };
        return (
          <div>
            <Tooltip placement="bottom" title={t('Common_Edit')} color="#ffffff" arrow={true}>
              <Button type="text" onClick={() => openPanel(record)} icon={<EditOutlined />} />
            </Tooltip>
            <Tooltip placement="bottom" title={t('Common_Delete')} color="#ffffff" arrow={true}>
              <Button
                type="text"
                onClick={() => {
                  deleteHandle();
                }}
                icon={<DeleteOutlined />}
              />
            </Tooltip>
          </div>
        );
      }
    }
  ];

  const onSearch = (val: A) => {
    props.onSearch(val);
  };

  const handleTableChange = (pagination: TablePaginationConfig) => {
    props.setPage(pagination.current ?? 1);
  };

  const TableHeader = () => {
    return (
      <>
        <div className={styles.tableHeaderLeft}>
          <Button type="text" onClick={() => props.openPanel()} icon={<PlusOutlined />}>
            {t('Common_AddNew')}
          </Button>
        </div>
        <div className={styles.tableHeaderRight}>
          <Search placeholder="Search Name" allowClear onSearch={onSearch} style={{ width: 250 }} />
        </div>
      </>
    );
  };

  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        scroll={{ x: 780 }}
        locale={{
          emptyText: (
            <>
              <SmileOutlined style={{ marginRight: 5 }} /> {t('Common_NoRecord')}
            </>
          )
        }}
        pagination={{
          current: param.pageInfor!.pageNumber,
          pageSize: param.pageInfor!.pageSize,
          total: param.pageInfor!.totalItems,
          simple: false
        }}
        loading={loading}
        onChange={handleTableChange}
        title={() => TableHeader()}
        rowKey={(record) => record.id}
      />
    </>
  );
}

export default DataTable;
