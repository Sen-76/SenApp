import { Col, Progress, Row, Space, Tree } from 'antd';
import { useEffect, useState } from 'react';
import type { DataNode } from 'antd/es/tree';
import { AlignLeftOutlined, DownOutlined } from '@ant-design/icons';
import styles from '../Goals.module.scss';
import dayjs from 'dayjs';

function GoalList() {
  const [treeData, setTreeData] = useState<DataNode[]>([]);

  useEffect(() => {
    getGoals();
  }, []);

  const getGoals = () => {
    const goal = (
      <Row style={{ width: '100%' }}>
        <Col>Title nè</Col>
        <Col>
          <Progress style={{ width: 100 }} percent={50} />
        </Col>
        <Col>No Status</Col>
        <Col>{dayjs().format('YYYY MMM DD')}</Col>
        <Col style={{ width: 20 }}>
          <AlignLeftOutlined />
        </Col>
      </Row>
    );
    setTreeData([
      {
        title: goal,
        key: '0-0',
        children: [
          {
            title: goal,
            key: '0-0-0'
          },
          {
            title: goal,
            key: '0-0-1'
          }
        ]
      }
    ]);
  };

  return (
    <div className={styles.goalList}>
      <Space wrap>
        <Progress type="circle" percent={75} />
      </Space>
      <Tree className="draggable-tree" switcherIcon={<DownOutlined />} treeData={treeData} showLine />
    </div>
  );
}

export default GoalList;
