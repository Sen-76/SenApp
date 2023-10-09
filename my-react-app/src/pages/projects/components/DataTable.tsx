import React, { useState } from 'react';
import { EditOutlined, ExportOutlined, FilterOutlined, PlusOutlined, SmileOutlined } from '@ant-design/icons';
import { Button, Modal, Switch, Table, Tag, Tooltip, Typography, notification } from 'antd';
import { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import { useTranslation } from 'react-i18next';
import styles from '../Project.module.scss';
import Search from 'antd/es/input/Search';
import dayjs from 'dayjs';
import { useLoading } from '@/common/context/useLoading';

interface IProps {
  data: A[];
  loading: boolean;
  param: Common.IDataGrid;
  openPanel: (data?: A) => void;
  openFilterPanel: (data?: A) => void;
}
function DataTable(props: IProps) {
  const { loading, param, data } = props;
  const { confirm } = Modal;
  const { t } = useTranslation();
  const columns: ColumnsType<A> = [
    {
      title: t('Common_Title'),
      dataIndex: 'title',
      key: 'title',
      render: (_, record) => {
        return record.title;
      }
    },
    {
      title: t('Project_Prioty'),
      dataIndex: 'description',
      key: 'description',
      render: (_, record) => {
        return <Tag>Bloker</Tag>;
      }
    },
    {
      title: t('Project_Assignee'),
      dataIndex: 'modifiedOn',
      key: 'modifiedOn',
      render: (_, record) => {
        return record.assignee;
      }
    },
    {
      title: t('Project_ReportTo'),
      dataIndex: 'modifiedBy',
      key: 'modifiedBy',
      render: (_, record) => record.modifiedBy
    },
    {
      title: t('Project_Status'),
      dataIndex: 'description',
      key: 'description',
      render: (_, record) => {
        return <Tag>Done</Tag>;
      }
    },
    {
      title: t('Common_Action'),
      dataIndex: 'action',
      key: 'action',
      fixed: 'right',
      className: 'actionCollumn',
      width: 120,
      render: (_, record) => {
        const editClick = () => {
          props.openPanel(record);
        };
        return (
          <div>
            <Tooltip placement="bottom" title={t('Common_Edit')} color="#ffffff" arrow={true}>
              <Button type="text" onClick={editClick} icon={<EditOutlined />} />
            </Tooltip>
          </div>
        );
      }
    }
  ];

  const onSearch = (val: A) => {
    console.log(val);
  };

  const TableHeader = () => {
    return (
      <>
        <div className={styles.tableHeaderLeft}>
          <Button type="text" icon={<PlusOutlined />}>
            {t('Common_AddNew')}
          </Button>
          <Button type="text" onClick={exportExcel} icon={<ExportOutlined />}>
            {t('Common_ExportExcel')}
          </Button>
        </div>
        <div className={styles.tableHeaderRight}>
          <Tooltip placement="bottom" title={t('Common_Filter')} color="#ffffff" arrow={true}>
            <Button type="text" onClick={() => props.openFilterPanel(param.filter)} icon={<FilterOutlined />} />
          </Tooltip>
          <Search placeholder={t('Common_SearchByTitle')} allowClear onSearch={onSearch} style={{ width: 250 }} />
        </div>
      </>
    );
  };

  const exportExcel = () => {
    notification.open({
      message: t('Common_ExportSuccess'),
      type: 'success'
    });
  };

  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        scroll={{ x: 780 }}
        locale={{
          emptyText: (
            <>
              <SmileOutlined style={{ marginRight: 5 }} /> {t('Common_NoRecord')}
            </>
          )
        }}
        loading={loading}
        title={() => TableHeader()}
        rowKey={(record) => record.id}
      />
    </>
  );
}

export default DataTable;