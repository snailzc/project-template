import React, {memo} from 'react'
import BaseChart from '../lib/BaseChart';
import option from './option';
import getOption from './getOption';

const Bar = memo((props:any) => {
  return (
    <BaseChart option={option} getOption={getOption} {...props} />
  )
})
export default Bar
