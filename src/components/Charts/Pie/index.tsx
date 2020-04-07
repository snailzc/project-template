import React from 'react';
import option from './option';
import getOption from './getOption';
import BaseChart from '../lib/BaseChart';

const Pie = (porps:any) => {
  return (
    <BaseChart getOption={getOption} option={option} {...porps} />
  )
}
export default Pie
