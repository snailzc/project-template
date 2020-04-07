import React, {useState, useEffect} from 'react';
import { Input, Radio, Cascader } from 'antd';

import Form from './ModalForm';
import { positiveInt } from 'utils/pattern';


const PlcForm = (props: any) => {
  const {ifEdit, values, goBack} = props;
  const ifHide = values && values.status === 'AUDITED';
  const [form, setForm] = useState({
    regionId: props.values.regionId || undefined,
    areaId: props.values.areaId || undefined,
    fieldId: props.values.fieldId || undefined,
    segmentId: props.values.segmentId || undefined,
    unitId: props.values.unitId || undefined,
    regionName: props.values.regionName || undefined,
    areaName: props.values.areaName || undefined,
    fieldName: props.values.fieldName || undefined,
    segmentName: props.values.segmentName || undefined,
    unitName: props.values.unitName || undefined,
  })
  const handleChange = (a: any, b: any) => {
    setForm({
      regionId: b[0] && b[0].regionNum,
      areaId: b[1] && b[1].regionNum,
      fieldId: b[2] && b[2].regionNum,
      segmentId: b[3] && b[3].regionNum,
      unitId: b[4] && b[4].regionNum,
      regionName: b[0] && b[0].regionName,
      areaName: b[1] && b[1].regionName,
      fieldName: b[2] && b[2].regionName,
      segmentName: b[3] && b[3].regionName,
      unitName: b[4] && b[4].regionName,
    })
  }
  const formLayout = {
    labelCol: {
      xs: {span: 24},
      sm: {span: 10}
    },
    wrapperCol: {
      xs: {span: 24},
      sm: {span: 12}
    }
  }
  const formItem = [
    {
      key: 'plcName',
      label: '名称',
      formLayout,
      initialValue: values.plcName,
      span: 12,
      component: <Input disabled={ifHide}/>,
      rules: [
        {
          required: true,
          message: '请填写名称',
        },
      ],
    },
    {
      key: 'regionId',
      label: '部署位置',
      formLayout,
      initialValue: values.city,
      span: 12,
      component: (
        <Cascader
          disabled={ifHide}
          showSearch
          fieldNames={{label: 'regionName', value: 'regionNum', children: 'children'}}
          options={JSON.parse(localStorage.setCascader)}
          placeholder="大区/区域/场次/工段/单元"
          onChange={handleChange}
        />
      ),
      rules: [
        {
          required: true,
          message: '请选择部署位置',
        },
      ],
    },
    {
      key: 'innerCode',
      label: '场内编码',
      formLayout,
      initialValue: values.innerCode,
      span: 12,
      component: <Input disabled={ifHide}/>,
      rules: [
        {
          required: true,
          message: '请填写场内编码',
        },
      ],
    },
    {
      key: 'deviceManufactor',
      label: '设备厂家',
      formLayout,
      initialValue: values.deviceManufactor,
      span: 12,
      component: <Input disabled={ifHide}/>,
      rules: [/*
        {
          required: true,
          message: '请填写设备厂家',
        },*/
      ],
    },
    {
      key: 'model',
      label: '设备型号',
      formLayout,
      initialValue: values.model,
      span: 12,
      component: <Input disabled={ifHide}/>,
      rules: [/*
        {
          required: true,
          message: '请填写设备型号',
        },*/
      ],
    },
    {
      key: 'isCommon',
      label: '是否共享',
      formLayout,
      initialValue: (values && values.isCommon && `${values.isCommon}`) || '0',
      span: 12,
      component: (
        <Radio.Group disabled={ifHide}>
          <Radio value="0">否</Radio>
          <Radio value="1">是</Radio>
        </Radio.Group>),
    },
    {
      key: 'ip',
      label: 'IP地址',
      formLayout,
      initialValue: values.ip,
      span: 12,
      component: <Input disabled={ifHide}/>,
      rules: [
        {
          required: true,
          message: '请填写IP地址',
        },
      ],
    },
    {
      key: 'port',
      label: '设备端口',
      formLayout,
      initialValue: values.port,
      span: 12,
      component: <Input disabled={ifHide}/>,
      rules: [
        {
          required: true,
          message: '请输入设备端口',
        }, {
          pattern: positiveInt.reg,
          message: positiveInt.msg,
        },
      ],
    },
    {
      key: 'address1',
      label: '起始地址',
      formLayout,
      initialValue: values.address1,
      span: 12,
      component: <Input disabled={ifHide}/>,
      rules: [
        {
          required: true,
          message: '请输入起始地址',
        },
      ],
    },
    {
      key: 'address2',
      label: '异常起始地址',
      formLayout,
      initialValue: values.address2,
      span: 12,
      component: <Input disabled={ifHide}/>,
      rules: [
        {
          required: true,
          message: '请输入起始地址',
        },
      ],
    },
    // {
    //   key: 'remark',
    //   label: '备注',
    //   formLayout,
    //   initialValue: values.remark,
    //   span: 12,
    //   component: <Input disabled={ifHide}/>,
    // },
  ]
  return (
    <Form
      {...props}
      showCas={true}
      formItem={formItem}
      goBack={goBack}
      ifEdit={ifEdit}
      ifHide={ifHide}
      cascaderChangeValue={form}
    />
  )
}

export default PlcForm;
