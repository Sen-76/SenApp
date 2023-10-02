import { useState } from 'react';
import { Avatar, Button, Input, Modal, Radio, RadioChangeEvent, Switch, Table, Tooltip, notification } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { TablePaginationConfig, TableRowSelection } from 'antd/es/table/interface';
import styles from '../AccountManagement.module.scss';
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleFilled,
  ExportOutlined,
  FilterOutlined,
  ImportOutlined,
  ManOutlined,
  PlusOutlined,
  SmileOutlined,
  SolutionOutlined,
  UndoOutlined,
  WomanOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';
import { EDeleteState, EGender, EState } from '../AccountManagement.Model';
import { useLoading } from '@/common/context/useLoading';
import { Link } from 'react-router-dom';
import Paragraph from 'antd/es/typography/Paragraph';
import { useTranslation } from 'react-i18next';
import { util } from '@/common/helpers/util';
import { service } from '@/services/apis';

interface IProps {
  data: A[];
  openPanel: (data?: A) => void;
  openFilterPanel: (data?: A) => void;
  openDetailPanel: (data?: A) => void;
  onSearch: (value: string) => void;
  setPage: (paging: number) => void;
  refreshList: () => void;
  param: Common.IDataGrid;
  tabStatus: number;
  loading: boolean;
}
function DataTable(props: IProps) {
  const { loading, param, tabStatus } = props;
  const [selectedItem, setSelectedItem] = useState<Account.IAccountModel[]>([]);
  const [isModalOpen, setIsOpenModal] = useState<boolean>(false);
  const [choosenUser, setChoosenUser] = useState<Account.IAccountModel | null>();
  const { showLoading, closeLoading } = useLoading();
  const [value, setValue] = useState<EDeleteState>(EDeleteState.None);
  const { t } = useTranslation();
  const { confirm } = Modal;
  const { Search } = Input;

  const columns: ColumnsType<A> = [
    {
      title: t('name'),
      dataIndex: 'fullName',
      key: 'fullName',
      width: 200,
      render: (_, record) => {
        return (
          <Tooltip placement="bottom" title={record.fullName} color="#ffffff" arrow={true}>
            <div style={{ display: 'flex', alignItems: 'center', minWidth: 250 }}>
              <Avatar size={40} src={record.photoUrl} style={{ marginRight: 10, backgroundColor: util.randomColor() }}>
                {record.fullName.charAt(0)}
              </Avatar>
              <Paragraph ellipsis={{ rows: 1, expandable: false }} style={{ maxWidth: 150, minWidth: 30 }}>
                {record.fullName}
              </Paragraph>
            </div>
          </Tooltip>
        );
      }
    },
    {
      title: t('email'),
      dataIndex: 'email',
      width: 300,
      key: 'email',
      render: (_, record) => {
        return (
          <Tooltip placement="bottom" title={record.userEmail} color="#ffffff" arrow={true}>
            <Paragraph ellipsis={{ rows: 1, expandable: false }} style={{ maxWidth: 150, minWidth: 100 }}>
              <Link to={`mailto:${record.userEmail}`}>{record.userEmail}</Link>
            </Paragraph>
          </Tooltip>
        );
      }
    },
    {
      title: t('phone'),
      dataIndex: 'phone',
      width: 110,
      key: 'phone',
      render: (_, record) => {
        return record.userPhone;
      }
    },
    {
      title: t('date of birth'),
      dataIndex: 'dob',
      width: 120,
      key: 'dob',
      render: (_, record) => {
        return <div style={{ width: 115 }}>{dayjs(record.dob).format('DD MMM YYYY')}</div>;
      }
    },
    {
      title: t('gender'),
      dataIndex: 'gender',
      width: 90,
      key: 'gender',
      render: (_, record) => {
        return record.gender === EGender.Male ? (
          <Tooltip placement="bottom" title={t('man')} color="#ffffff" arrow={true}>
            <ManOutlined />
          </Tooltip>
        ) : (
          <Tooltip placement="bottom" title={t('woman')} color="#ffffff" arrow={true}>
            <WomanOutlined />
          </Tooltip>
        );
      }
    },
    {
      title: t('role'),
      dataIndex: 'role',
      width: 100,
      key: 'role',
      render: (_, record) => {
        return (
          <Tooltip placement="bottom" title={record.userEmail} color="#ffffff" arrow={true}>
            <Paragraph ellipsis={{ rows: 1, expandable: false }} style={{ maxWidth: 150, minWidth: 100 }}>
              {record.role}
            </Paragraph>
          </Tooltip>
        );
      }
    },
    {
      title: t('Common_Status'),
      dataIndex: 'status',
      key: 'status',
      className: tabStatus == EState.Deleted ? 'hiddenColumn' : '',
      render: (_, record) => {
        const apiHandle = async (value: boolean) => {
          try {
            showLoading();
            value
              ? await service.accountService.activeAccount([record.id])
              : await service.accountService.deactiveAccount(record.id);
            notification.open({
              message: value ? t('Common_ActivateSuccess') : t('Common_DeactivateSuccess'),
              type: 'success'
            });
            props.refreshList();
            closeLoading();
          } catch (e) {
            console.log(e);
          }
        };
        const activeChange = async (value: boolean) => {
          if (!value) {
            confirm({
              content: `Are you sure you wish to deactivate ${record.fullName}?`,
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
      fixed: 'right',
      width: 180,
      className: 'actionCollumn',
      render: (_, record) => {
        return (
          <div>
            <Tooltip placement="bottom" title={t('Common_ViewDetail')} color="#ffffff" arrow={true}>
              <Button type="text" onClick={() => props.openDetailPanel(record)} icon={<SolutionOutlined />} />
            </Tooltip>
            {tabStatus == EState.Activate ? (
              <>
                <Tooltip placement="bottom" title={t('Common_Edit')} color="#ffffff" arrow={true}>
                  <Button type="text" onClick={() => props.openPanel(record)} icon={<EditOutlined />} />
                </Tooltip>
                <Tooltip placement="bottom" title={t('Common_Delete')} color="#ffffff" arrow={true}>
                  <Button
                    type="text"
                    onClick={() => {
                      setIsOpenModal(true);
                      setChoosenUser(record);
                      setSelectedItem([record]);
                    }}
                    icon={<DeleteOutlined />}
                  />
                </Tooltip>
              </>
            ) : (
              <>
                <Tooltip placement="bottom" title={t('Common_Restore')} color="#ffffff" arrow={true}>
                  <Button type="text" onClick={() => restoreUser(record)} icon={<UndoOutlined />} />
                </Tooltip>
              </>
            )}
          </div>
        );
      }
    }
  ];

  const rowSelection: TableRowSelection<A> = {
    onChange: (_, selectedRows) => {
      setSelectedItem(selectedRows);
    }
  };

  const handleTableChange = (pagination: TablePaginationConfig) => {
    props.setPage(pagination.current ?? 1);
  };

  const onSearch = (val: A) => {
    props.onSearch(val);
  };

  const onRadioChange = (e: RadioChangeEvent) => {
    setValue(Number(e.target.value));
  };

  const onCancelModal = () => {
    setIsOpenModal(false);
    setChoosenUser(null);
    setValue(EDeleteState.None);
  };

  const confirmDelete = async () => {
    try {
      setIsOpenModal(false);
      await service.accountService.deleteAccount({
        isHardDelete: value === EDeleteState.HardDelete,
        id: selectedItem.map((x) => x.id)
      });
      setValue(EDeleteState.None);
      props.refreshList();
      setSelectedItem([]);
      notification.open({
        message: t('Common_DeleteSuccess'),
        type: 'success'
      });
    } catch (e) {
      console.log(e);
    }
  };

  const restoreUser = async (user?: A) => {
    try {
      showLoading();
      const ids = selectedItem.map((x) => x.id)
      console.log(selectedItem.map((x) => x.id));
      console.log(user.id);
      await service.accountService.restoreAccount(user.id ? [user.id] : ids);
      notification.open({
        message: t('Common_RestoreSuccess'),
        type: 'success'
      });
      props.refreshList();
      closeLoading();
    } catch (e) {
      console.log(e);
    }
  };

  const exportExcel = () => {
    notification.open({
      message: t('Common_ExportSuccess'),
      type: 'success'
    });
  };

  const importExcel = () => {
    notification.open({
      message: t('Common_ImportSuccess'),
      type: 'success'
    });
    props.refreshList();
  };

  const TableHeader = () => {
    return (
      <>
        <div className={styles.tableHeaderLeft}>
          {tabStatus == EState.Activate && (
            <>
              <Button type="text" onClick={() => props.openPanel()} icon={<PlusOutlined />}>
                {t('Common_AddNew')}
              </Button>
              <Button
                onClick={() => setIsOpenModal(true)}
                loading={loading}
                type="text"
                icon={<DeleteOutlined />}
                disabled={selectedItem.length === 0}
              >
                {t('Common_DeleteSelected')}
              </Button>
              <Button type="text" onClick={exportExcel} icon={<ExportOutlined />}>
                {t('Common_ExportExcel')}
              </Button>
              <Button type="text" onClick={importExcel} icon={<ImportOutlined />}>
                {t('Common_ImportExcel')}
              </Button>
            </>
          )}
          {tabStatus == EState.Deleted && (
            <>
              <Button
                onClick={restoreUser}
                loading={loading}
                type="text"
                icon={<UndoOutlined />}
                disabled={selectedItem.length === 0}
              >
                {t('Common_RestoreSelected')}
              </Button>
            </>
          )}
        </div>
        <div className={styles.tableHeaderRight}>
          <Tooltip placement="bottom" title={t('Common_Filter')} color="#ffffff" arrow={true}>
            <Button type="text" onClick={() => props.openFilterPanel(param.filter)} icon={<FilterOutlined />} />
          </Tooltip>
          <Search placeholder={t('Common_SearchByName')} allowClear onSearch={onSearch} style={{ width: 250 }} />
        </div>
      </>
    );
  };

  return (
    <>
      <Table
        columns={columns}
        rowSelection={{ ...rowSelection }}
        dataSource={props.data}
        pagination={{
          current: param.pageInfor!.pageNumber,
          pageSize: param.pageInfor!.pageSize,
          total: param.pageInfor!.totalItems,
          simple: false
        }}
        scroll={{ x: 1230 }}
        locale={{
          emptyText: (
            <>
              <SmileOutlined style={{ marginRight: 5 }} /> {t('Common_NoRecord')}
            </>
          )
        }}
        loading={loading}
        onChange={handleTableChange}
        title={() => TableHeader()}
        rowKey={(record) => record.id}
      />
      <Modal
        title={
          <>
            <ExclamationCircleFilled style={{ marginRight: 10, color: '#d0cf23', fontSize: 20 }} />
            <span>{t('Common_ConfirmDelete')}</span>
          </>
        }
        open={isModalOpen}
        footer={<></>}
        onCancel={onCancelModal}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ fontSize: 16, margin: '10px 0' }}>
            {choosenUser
              ? t('Manage_Account_DeleteSingleUser_Text').replaceAll('{0}', choosenUser.fullName)
              : t('Manage_Account_DeleteUser_Text')}
          </div>
          <Radio.Group
            onChange={onRadioChange}
            style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 60, marginLeft: 20 }}
            value={value}
          >
            <Radio value={EDeleteState.HardDelete}>{t('Common_HardDelete')}</Radio>
            <Radio value={EDeleteState.SoftDelete}>{t('Common_SoftDelete')}</Radio>
          </Radio.Group>
          <div className="actionBtnBottom">
            <Button onClick={onCancelModal}>{t('Common_Cancel')}</Button>
            <Button type="primary" disabled={value === EDeleteState.None} onClick={confirmDelete}>
              {t('Common_Delete')}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default DataTable;