import { Button, Col, Dropdown, MenuProps, Progress, Row, Tree } from 'antd';
import { DataNode } from 'antd/es/tree';
import { useTranslation } from 'react-i18next';
import styles from '../ProjectDetail.module.scss';
import dayjs from 'dayjs';
import { DeleteOutlined, MoreOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';

const draftMilestone = [
  {
    id: '1',
    title: 'Milestone 1',
    startDate: '10/10/2012',
    endDate: '10/10/2015',
    status: 1,
    tasks: 20,
    taskDone: 17
  },
  {
    id: '1',
    title: 'Milestone 1',
    startDate: '10/10/2012',
    endDate: '10/10/2015',
    status: 1,
    tasks: 20,
    taskDone: 17
  }
];
function Milestone() {
  const { t } = useTranslation();
  const [treeData, setTreeData] = useState<DataNode[]>([]);

  useEffect(() => {
    genMilestoneElement();
  }, []);

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <div className={styles.menuitem}>
          <DeleteOutlined /> <div>{t('Milestone_Delete')}</div>
        </div>
      )
    }
  ];

  const genMilestoneElement = () => {
    draftMilestone.map((item) => ({
      title: (
        <Row className={styles.milestoneItem}>
          <Col>
            <Row className={styles.title}>Milestone</Row>
            <Row>
              {dayjs('10/10/2010').format('DD MMM YYYY')}-{dayjs('10/10/2012').format('DD MMM YYYY')}
            </Row>
          </Col>
          <Row>
            <Col className={styles.progressCol}>
              <Progress percent={50} />
            </Col>
            <Col>
              <Dropdown menu={{ items }} arrow={true} placement="bottomRight" trigger={['click']}>
                <Button type="text" icon={<MoreOutlined />} />
              </Dropdown>
            </Col>
          </Row>
        </Row>
      ),
      key: '0'
    }));
  };

  //   const treeData: DataNode[] = [
  //     {
  //       title: (
  //         <Row className={styles.milestoneItem}>
  //           <Col>
  //             <Row className={styles.title}>Milestone</Row>
  //             <Row>
  //               {dayjs('10/10/2010').format('DD MMM YYYY')}-{dayjs('10/10/2012').format('DD MMM YYYY')}
  //             </Row>
  //           </Col>
  //           <Row>
  //             <Col className={styles.progressCol}>
  //               <Progress percent={50} />
  //             </Col>
  //             <Col>
  //               <Dropdown menu={{ items }} arrow={true} placement="bottomRight" trigger={['click']}>
  //                 <Button type="text" icon={<MoreOutlined />} />
  //               </Dropdown>
  //             </Col>
  //           </Row>
  //         </Row>
  //       ),
  //       key: '0'
  //     }
  //   ];

  return (
    <>
      <Tree treeData={treeData} checkable />
    </>
  );
}

export default Milestone;
