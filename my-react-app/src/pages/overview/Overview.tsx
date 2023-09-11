import {
  AlignLeftOutlined,
  BarsOutlined,
  CalendarOutlined,
  CarryOutOutlined,
  FlagOutlined,
  SmileOutlined
} from '@ant-design/icons';
import { useBreadcrumb } from '../../components/breadcrum/Breadcrum';
import { useEffect } from 'react';
import { Calendar, Checkbox, Col, List, Progress, Row, Timeline } from 'antd';
import styles from './Overview.module.scss';
import { Link } from 'react-router-dom';
import PieChart from '../../components/chart/pie-chart/PieChart';
import BarChart from '../../components/chart/bar-chart/BarChart';
import useGetData from './useGetData';

const Overview = () => {
  const monthNamesAbbreviated = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const data = [
    {
      title: 'Task Title 1',
      assignDate: '2020-01-01'
    },
    {
      title: 'Task Title 2',
      assignDate: '2020-01-01'
    },
    {
      title: 'Task Title 3',
      assignDate: '2020-01-01'
    },
    {
      title: 'Task Title 4',
      assignDate: '2020-01-01'
    }
  ];
  const { pieChartData, barChartData } = useGetData();
  const { setBreadcrumb } = useBreadcrumb();
  useEffect(() => {
    setBreadcrumb([{ path: '/', icon: <BarsOutlined />, text: 'Overview' }]);
  }, []);
  return (
    <div className={styles.overview}>
      <Row className={styles.wrapProcessManage}>
        <Col className={styles.processManage}>
          <Row className={styles.processInfo}>
            <div>
              <FlagOutlined /> To do
            </div>
            <div>11/14</div>
          </Row>
          <Progress percent={30} />
        </Col>
        <Col className={styles.processManage}>
          <Row className={styles.processInfo}>
            <div>
              <FlagOutlined /> To do
            </div>
            <div>11/14</div>
          </Row>
          <Progress percent={30} />
        </Col>
        <Col className={styles.processManage}>
          <Row className={styles.processInfo}>
            <div>
              <FlagOutlined /> To do
            </div>
            <div>11/14</div>
          </Row>
          <Progress percent={30} />
        </Col>
        <Col className={styles.processManage}>
          <Row className={styles.processInfo}>
            <div>
              <FlagOutlined /> To do
            </div>
            <div>11/14</div>
          </Row>
          <Progress percent={30} />
        </Col>
      </Row>
      <Row className={styles.contentOverview}>
        <Col className={styles.left}>
          <div className={styles.draft}>
            <BarChart xAxisData={barChartData.values} xAxisLabel={barChartData.labels} />
          </div>
          <div className={styles.draftHalf}>
            <PieChart data={pieChartData} />
          </div>
          <div className={styles.draftHalf}></div>
          <div className={styles.draft}></div>
        </Col>
        <Col className={styles.right}>
          <Calendar
            className={styles.callendar}
            fullscreen={false}
            headerRender={({ value }) => (
              <div className={styles.callenderHeader}>
                <div>
                  <CalendarOutlined /> {monthNamesAbbreviated[value.month()]} - {value.year()}
                </div>
                <Link to={'./'}>View schedule</Link>
              </div>
            )}
          />
          <List
            size="large"
            className={styles.todoList}
            header={
              <div className={styles.todoHeader}>
                <div>
                  <CarryOutOutlined /> Todo List
                </div>
                <Link to={'./'}>View all</Link>
              </div>
            }
            dataSource={data}
            renderItem={(item) => (
              <List.Item>
                <div>
                  <Checkbox>{item.title}</Checkbox>
                </div>
                <div>{item.assignDate}</div>
              </List.Item>
            )}
          />
          <div className={styles.timeLine}>
            <div className={styles.timeLineHeader}>
              <div>
                <AlignLeftOutlined /> Recently Activity
              </div>
              <Link to={'./'}>View all</Link>
            </div>
            <Timeline
              className={styles.timeContent}
              items={[
                {
                  color: 'green',
                  children: 'Create a services site 2015-09-01'
                },
                {
                  color: 'green',
                  children: 'Create a services site 2015-09-01'
                },
                {
                  color: 'red',
                  children: (
                    <>
                      <p>Solve initial network problems 1</p>
                      <p>Solve initial network problems 2</p>
                      <p>Solve initial network problems 3 2015-09-01</p>
                    </>
                  )
                },
                {
                  children: (
                    <>
                      <p>Technical testing 1</p>
                      <p>Technical testing 2</p>
                      <p>Technical testing 3 2015-09-01</p>
                    </>
                  )
                },
                {
                  color: 'gray',
                  children: (
                    <>
                      <p>Technical testing 1</p>
                      <p>Technical testing 2</p>
                      <p>Technical testing 3 2015-09-01</p>
                    </>
                  )
                },
                {
                  color: 'gray',
                  children: (
                    <>
                      <p>Technical testing 1</p>
                      <p>Technical testing 2</p>
                      <p>Technical testing 3 2015-09-01</p>
                    </>
                  )
                },
                {
                  color: '#00CCFF',
                  dot: <SmileOutlined />,
                  children: <p>Custom color testing</p>
                }
              ]}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Overview;
