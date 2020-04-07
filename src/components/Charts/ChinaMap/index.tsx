import React, {memo} from 'react'
import 'echarts/map/js/china';
// import 'echarts-gl';
import BaseChart from '../lib/BaseChart';
import option from './option';
import getOption from './getOption';

const ChinaMap = memo((props:any) => {
  return (
    <BaseChart option={option} getOption={getOption} {...props} />
  )
})
export default ChinaMap
