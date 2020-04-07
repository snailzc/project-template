import React from 'react';
import { Card, Labels } from '@/components/Card';
import { ChartData } from './data.d';
import Pie from '@/components/Charts/Pie';
import { genEquipment } from '@/utils/genChartData';
import styles from './index.scss';

const legends = {
  PC: {
    key: 'PC',
    label: 'PC',
    type: 'circle',
    backgroundColor: '#FF8700',
  },
  Android: {
    key: 'Android',
    label: 'Android',
    type: 'circle',
    backgroundColor: '#ffc300',
  },
  Iphone: {
    key: 'Iphone',
    label: 'Iphone',
    type: 'circle',
    backgroundColor: '#00e473',
  },
  其它: {
    key: '其它',
    label: '其它',
    type: 'circle',
    backgroundColor: '#009DFF',
  },
};
const equipment:ChartData[] = [
  { name: 'PC', value: 10211 },
  { name: 'Android', value: 6111 },
  { name: 'Iphone', value: 7711 },
  { name: '其他', value: 3711 },
];
const channel:ChartData[] = [
  { name: '合作方', value: 9400 },
  { name: '核算', value: 7400 },
  { name: '自营', value: 5400 },
  { name: '其它', value: 3400 },
];
function calculate(data:ChartData[], max:number = 0) {
  let mmax = max;
  if (!mmax) {
    mmax = data.reduce((prev, cur) => cur.value + prev, 0);
  }
  return data.map(e => ({ ...e, percent: `${((e.value * 100) / mmax).toFixed(2)}%` }));
}
const equipmentData = genEquipment(equipment);
const Index: React.FC = () => {
  return (
    <Card title="设备渠道" legends={<Labels data={Object.values(legends)} />}>
      <Pie data={equipmentData} style={{ height: 240 }} />
      <div className={styles.channel}>
        <div className={styles.title}>渠道排行</div>
        {calculate(channel).map(({ name, percent }) => (
          <div className={styles.column} key={name}>
            <div className={styles.label}>{name}</div>
            <div className={styles.bars}>
              <div className={styles.inner} />
              <div className={styles.outer} style={{ width: percent }} />
            </div>
            <div className={styles.num}>{percent}</div>
          </div>
        ))}
      </div>
    </Card>
  )
}

export default Index
