import React, {useState, useEffect, useRef, useImperativeHandle, forwardRef, MutableRefObject } from 'react';
import { Cascader } from 'antd';
import { post } from 'utils/request';

const MyCascader: React.FC = (props: any, ref: any) => {
  const cascaderData = localStorage.setCascader && JSON.parse(localStorage.setCascader);
  const cascaderRef: MutableRefObject<any> = useRef();
  useImperativeHandle(ref, () => {
    return {
      value,
      resetValue: () => {
        setValue([])
      }
    }
  })
  const [options, setOptions] = useState<[]>([]);
  const [value, setValue]= useState<string[]>([]);
  useEffect(() => {
    function fetchData() {
      post('/api/unit_evc/myBaseInfo/treeForSelect', {})
        .then((res: any) => {
          setOptions(res.data);
          localStorage.setCascader = JSON.stringify(res.data);
        })
    }
    if (!cascaderData) {
      fetchData();
    } else {
      setOptions(cascaderData);
    }
  }, []);
  const change = (value: any) => {
    setValue(value);
  }
  return (
    <Cascader
      value={value}
      placeholder="大区/区域/场次/工段/单元"
      style={{width: '200px', height: '30px'}}
      fieldNames={{ label: 'regionName', value: 'regionNum', children: 'children' }}
      options={options}
      onChange={value => change(value)}
      ref={cascaderRef}
    />
  )
}


export default forwardRef(MyCascader);
