import React, { useRef, useEffect } from 'react';
import Echarts from 'echarts-for-react';
interface PorpsType {
  option?:any,
  data?: any,
  getOption?: any,
  style?: any,
  runAction?: any,
}

const BaseChart: React.FC<PorpsType>  = ({ option, data, getOption, style, runAction }) =>  {
  const chartRef = useRef<any>(null);
  const getStyle = (style: {}) => {
    return Object.assign(
      {
        position: 'relative',
      },
      style
    );
  }
  const finalOption = getOption(option, data);
  const finalStyle = getStyle(style);
  useEffect(() => {
    if (chartRef && runAction) {
      const chartIns = chartRef.getEchartsInstance();
      window.setTimeout(() => {
        runAction(chartIns);
      }, 300);
    }
  }, [])

  return (
    <Echarts
      ref={chartRef}
      style={finalStyle}
      option={finalOption}
      notMerge
      lazyUpdate
    />
  );
}

export default BaseChart


