import { useEffect, useRef } from 'react';
import { echarts } from '../echartInstall';
// Models
import { EChartsType } from 'echarts/core';
import styles from './PieChart.module.scss';
import { PieChartProps } from './PieChart.model';

const generateOption = (data: PieChartProps['data']) => {
  return {
    tooltip: {
      trigger: 'item',
      formatter: '{b} {c} <div>{d}%</div>',
      textStyle: {
        color: '#222'
      }
    },
    legend: {
      // top: 'middle',
      // right: '40px',
      //orient: 'vertical'
      bottom: '20px',
      left: 'center',
      orient: 'horizontal'
    },
    series: [
      {
        type: 'pie',
        radius: ['30%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 5,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data
      }
    ]
  };
};

const PieChart = (props: PieChartProps) => {
  const { data } = props;
  const chartInstance = useRef<EChartsType>();
  const chartRef = useRef(null);

  useEffect(() => {
    chartInstance.current = echarts.init(chartRef.current);
  }, []);

  useEffect(() => {
    chartInstance.current?.setOption(generateOption(data));
  }, [data]);

  return <div ref={chartRef} className={styles.pieChart}></div>;
};

export default PieChart;
