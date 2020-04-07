import React, {useState, useEffect} from 'react';

import Form from '@/components/common/SearchForm';
import FsTable from 'components/common/Table';
import PlcForm from 'components/common/PlcForm';
import { Input, Modal, message, Radio } from 'antd'
import { formatStatus } from 'utils/method';

import styles from './index.scss';

import {get, del, put, post} from 'utils/request';

const { confirm } = Modal;
const RadioGroup = Radio.Group;
const Plc = (props: any) => {
  const formItem = [
    {
      key: 'code',
      width: '200px',
      component: (
        <Input placeholder="场内编码"/>
      )
    },    
    {
      key: 'code',
      width: '200px',
      component: (
        <Input placeholder="场内编码"/>
      )
    },
    {
      key: 'code',
      width: '200px',
      component: (
        <Input placeholder="场内编码"/>
      )
    },
    {
      key: 'code',
      width: '200px',
      component: (
        <Input placeholder="场内编码"/>
      )
    },
    {
      key: 'code',
      width: '200px',
      formHidden: true,
      component: (
        <Input placeholder="场内编码"/>
      )
    },
    {
      key: 'code',
      width: '200px',
      formHidden: true,
      component: (
        <Input placeholder="场内编码"/>
      )
    },
    {
      key: 'status',
      initialValue: '',
      formHidden: true,
      component: (
        <RadioGroup>
          <Radio key={''} value={''}>全部</Radio>
          <Radio key={'AUDITED'} value={'AUDITED'}>已审核</Radio>
          <Radio key={'NORMAL'} value={'NORMAL'}>未审核</Radio>
        </RadioGroup>
      ),
    }
  ]
  const [tableData, setTableData] = useState<any>([]);
  const [params, setParams] = useState<{[key: string]: any}>({
    page: 1,
    limit: 20
  })
  const [count, setCount] = useState<number>(0);
  const [selectedRows, setSelectedRows] = useState<[]>([]);
  const [visible, setVisible] = useState<boolean>(false);
  const [values, setValues] = useState<any>({});
  const [ifEdit, setIfEdit] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const fetchData = () => {
    setLoading(true);
    get('/api/unit_evc/myEvcPlcInfo/getPageList', params)
      .then((data: any) => {
        setLoading(false);
        setTableData(data.data);
      })
  }
  useEffect(() => {
    fetchData();
  }, [count])
  const handleOperation = (res: any) => {
    if (res.status === 200) {
      message.success('操作成功');
      setCount(count + 1);
    } else {
      message.success('操作失败，请重新尝试');
    }
  }
  const searchHandler = (values: any) => {
    const {field, ...value} = values;
    const newValues = {
      ...value,
      regionId: values.field && values.field[0] || '',
      areaId: values.field && values.field[1] || '',
      fieldId: values.field && values.field[2] || '',
      segmentId: values.field && values.field[3] || '',
      unitId: values.field && values.field[4] || '',
    }
    setParams({...params, ...newValues});
    setCount(count + 1);
  }
  const selectList = (selectedRowKeys: [number], selectedRows: []): void => {
    setSelectedRows(selectedRows);
  }
  const handleEdit = (value: {[key: string]: any}, flag: boolean) => {
    let cascaderValue = {
      city: [value.regionId, value.areaId, value.fieldId, value.segmentId, value.unitId]
    }
    setVisible(true);
    setIfEdit(true);
    setValues({...value, ...cascaderValue});
  }
  const handleDelete = (val: {[key: string]: any}) => {
    let ids = val.id;
    del('/api/unit_evc/myEvcPlcInfo/delete', {ids})
      .then((res: any)=> {
        setVisible(false);
        handleOperation(res);
      })
  }
  const goBack = () => {
    setVisible(false);
    setValues({});
  }
  const onCancel = () => {
    setVisible(false);
    setValues({});
  }
  const handleSubmit = (value: any) => {
    let newParams = {...values, ...value};
    if (!ifEdit) {
      post('/api/unit_evc/myEvcPlcInfo/add', newParams)
        .then((res: any) => {
          setVisible(false)
          handleOperation(res);
        })
    }
    put('/api/unit_evc/myEvcPlcInfo/update', newParams)
      .then((res: any) => {
        setVisible(false);
        handleOperation(res);
      })
  }
  const handleAdd = () => {
    setVisible(true);
    setIfEdit(false);
    setValues({});
  }
  const handleConfirm = () => {
    const noSaveRows = selectedRows.some((el: any) => el.status === 'AUDITED');
    if (!selectedRows.length) {
      return message.error('请选择需要审核的数据！');
    } else if (noSaveRows) {
      return message.error('只能对【未审核】数据进行审核操作！');
    }
    const selectedRowsId = selectedRows.map((el: any) => el.id);
    confirm({
      title: '确认审核这些数据？',
      onOk: () => {
        post('/api/unit_evc/myEvcPlcInfo/review', {ids: selectedRowsId.join(',')})
          .then((res: any) => {
            handleOperation(res);
          })
      }
    })
  }
  const handleUnConfirm = () => {
    const noSaveRows = selectedRows.some((el: any) => el.status !== 'AUDITED');
    if (!selectedRows.length) {
      return message.error('请选择需要反审核的数据！');
    } else if (noSaveRows) {
      return message.error('只能对【已审核】数据进行审核操作！');
    }
    const selectedRowsId = selectedRows.map((el: any) => el.id);
    confirm({
      title: '确认反审核这些数据？',
      onOk: () => {
        post('/api/unit_evc/myEvcPlcInfo/unreview', {ids: selectedRowsId.join(',')})
          .then((res: any) => {
            handleOperation(res);
          })
      }
    })
  }
  const handleTableChange = (value: any) => {
    let {current, pageSize} = value;
    setParams({...params, ...{page: current, limit: pageSize}});
    setCount(count + 1);
  }
  const btnsLeft = [
    {
      name: '新增',
      func: handleAdd
    },
    {
      name: '审核',
      func: handleConfirm
    },
    {
      name: '反审核',
      func: handleUnConfirm
    },
  ];
  const columns = [
    {
      title: '区域',
      dataIndex: 'areaName'
    },
    {
      title: '场区',
      dataIndex: 'fieldName',
      width: 120,
    },
    {
      title: '工段',
      dataIndex: 'segmentName',
    },
    {
      title: '单元',
      dataIndex: 'unitName',
      // width: 90,
    },
    {
      title: '场内编码',
      dataIndex: 'innerCode',
    },
    {
      title: '是否共享',
      dataIndex: 'isCommon',
      render: (val: number) => (val === 0 ? '否' : '是'),
    },
    {
      title: 'IP地址',
      dataIndex: 'ipInfo',
      width: 150,
      render: (text: any, record: {ip: string, port: string}) => {
        return <span>{`${record.ip}:${record.port}`}</span>;
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 80,
      render: (val: string) => formatStatus(val),
    }, {
      title: '创建日期',
      dataIndex: 'crtTime',
      type: 'time',
      width: 100,
    }, {
      title: '创建人',
      dataIndex: 'crtName',
    },
  ]
  return (
    <>
      <div className={styles.form_header}>
        <Form {...props} showCas formItem={formItem} searchHandler={searchHandler}/>
      </div>
      <FsTable
        {...props}
        data={tableData}
        columns={columns}
        current={params.page}
        pageSize={params.limit}
        handleTableChange={handleTableChange}
        scroll={{x: 1600, y: true}}
        selectList={selectList}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        btnsLeft={btnsLeft}
        loading={loading}
      />
      <Modal
        width="70%"
        footer={null}
        title="PLC信息维护"
        visible={visible}
        onCancel={onCancel}
        destroyOnClose={true}
      >
        <PlcForm
          handleSubmit={handleSubmit}
          goBack={goBack}
          values={values}
          ifEdit={ifEdit}
        />
      </Modal>
    </>
  )
}
export default Plc;
