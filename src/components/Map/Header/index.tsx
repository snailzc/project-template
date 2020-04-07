import React, { memo, useState, useEffect } from 'react';
import moment from 'moment';
import { Card } from '@/components/Card';
import { Icon } from 'antd';
import styles from './index.scss';



const FORMAT = 'YYYY/MM/DD HH:mm:ss';

const Header: React.FC = memo(() => {
  const [time, setTime] = useState(+new Date());

  useEffect(() => {
    const t = setInterval(() => {
      setTime(+new Date());
    }, 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <Card>
      <div className={styles.header}>
        <div className={styles.time}>
          <Icon type="clock-circle" />
          {moment(time).format(FORMAT)}
        </div>
        <div className={styles.title}>实时数据看板</div>
        <div className={styles.desc}>
          <Icon type="setting" />
          统计维度：昨天
        </div>
      </div>
    </Card>
  );
});

export default Header;
