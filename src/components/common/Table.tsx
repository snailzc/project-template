import React, { useState } from 'react';
import classNames from 'classnames';
import moment from 'moment';

import { Table, Popover, Popconfirm, Button } from 'antd';

import styles from './Table.scss';

const FsTable: React.FC = (props: any) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<[]>([]);
  const {
    data,
    loading, // 表格加载loading
    // pageElement, // 权限判断
    // edit = 'btn_edit',//默认编辑code
    // del = 'btn_del',//默认删除code
    columns, // 表格头
    scroll, // 横向、纵向滚动
    tableKey = 'id', // key值，默认为id,传参时选中的是tableKey的值
    pageSize, //  每页数据条数
    current, // 当前页码
    selectRows = true, // 列表项是否可选，默认可选
    operation = true, // 是否显示操作列，默认显示
    // rowNum = false, // 是否显示行序号，默认不显示
    operaWidth = 70, // 操作栏宽度，默认150
    btnsRight, // 右侧功能按钮
    btnsLeft, // 左侧功能按钮
    stStr = 'status', // 需要状态判断的字段,默认审核状态
    stCode = ['AUDITED'], // 状态代码,
    expandedRowRender, // 是否显示从表, 默认不显示
    // className,
    type,
    childrenColumnName,
    // onDoubleClick, // 双击行事件
    handleEdit,
    handleDelete
  } = props;
  const isTotal = data ? Object.keys(data).indexOf('total') !== -1 : false;
  const showTotal = (total: number): string => {
    return `总共 ${total}条`;
  }
  const curPagination = {
    total: isTotal ? data.total : data && data.length,
    pageSize,
    current,
    showTotal: showTotal
  };
  const paginationProps = {
    // position: 'bottom',
    showSizeChanger: true,
    showQuickJumper: true,
    ...curPagination,
  };
  const onSelectChange = (selectedRowKeys: any, selectedRows: any) => {
    let flag = false;
    const list = data.rows ? data.rows : data;
    list.forEach((item: any) => {
      if (((tableKey && item[tableKey]) || item.id) === selectedRowKeys[0]) {
        flag = true;
      }
    });

    if (!flag) {
      selectedRowKeys.shift();
    }
    setSelectedRowKeys(selectedRowKeys);
    /**
     * 选中传参
     * @selectedRowKeys => 当前选中行的key值，默认id，当tableKey存在时为tableKey
     * @selectedRows => 当前选中行的整条数据
     */
    props.selectList(selectedRowKeys, selectedRows);
  };
  const list = isTotal ? data.rows : data;
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    type: type || 'checkbox',
  };
  const renderSpecialColumn = (type: string = 'default', text: any) => {
    if (type === 'default') {
      return text;
    }
    if (type === 'time') {
      return text && moment(text).format('YYYY/MM/DD')
    }
  }
  const handleTableChange = (pagination: any, filters: any, sorter: any) => {
    const values = {...pagination, ...filters, ...sorter};
    props.handleTableChange(values);
  }
  const formatColumns = (item: any) => {
    const {
      render = '',
      width = 80,
      align = 'left',
      type = 'default', // 需要处理的数据,time => 时间; money => 金钱; number => 数字逗号分隔，替换.00
    } = item;
    const colWith = width - 10;
    if (render) {
      return {
        ...item,
        width,
        align,
      };
    } else {
      return {
        ...item,
        width,
        align,
        render: (text: any) => {
          const actions: Map<string, () => any> = new Map([
            ['default', () => text],
            // ['time', () => text && moment(text).format('YYYY/MM/DD')],
            // ['money', () => formatMoney(text)],
            // ['number', () => formatNumber(text)],
          ]);
          return (
            <Popover content={<span>{text}</span>}>
              {renderSpecialColumn(type, text)}
            </Popover>
          );
        },
      };
    }
  };
  const formatTable = columns.map((item: any) => {
    if (item.children && item.children.length) {
      return {
        ...item,
        children: item.children.map((child: any) => formatColumns(child)),
      };
    } else {
      return formatColumns(item);
    }
  });
  const newColumns = operation
      ? [
        ...formatTable,
        {
          title: '操作',
          width: operaWidth,
          align: 'center',
          dataIndex: 'operation',
          render: (text: any, record: any, index: number) => (
            <>
              <div className={styles.operationWrap}>
                { stCode.includes(record[stStr]) ?
                  (<a className="viewBtn" onClick={() => handleEdit(record, true)}>查看</a>)
                    :
                    (
                      <div>
                        <a
                          className="editBtn"
                          onClick={() => handleEdit(record, false)}
                        >
                          修改
                        </a>
                        <Popconfirm
                          title="确定删除吗?"
                          onConfirm={() => handleDelete(record)}
                        >
                          <a>
                          删除
                          </a>
                        </Popconfirm>
                      </div>)
                }
              </div>
            </>
          ),
        },
      ]
      : formatTable;
  return (
    <>
      <div className={styles.grayItem}/>
      <div style={{padding: '0 10px 0 5px'}}>
        <div className={styles.btns}>
          <div className={styles.btnsLeft}>
            {
              btnsLeft && btnsLeft.map((item: {[key: string]: any}) => (
                <Button
                  key={item.name}
                  className={styles.globalBtn}
                  onClick={item.func}
                  htmlType="button"
                  type="primary"
                >
                  {item.name}
                </Button>
              ))}
          </div>
        </div>
        <Table
          {...props}
          bordered
          loading={loading}
          rowKey={tableKey}
          dataSource={list}
          childrenColumnName={childrenColumnName}
          expandedRowRender={expandedRowRender}
          size="middle"
          columns={newColumns}
          rowSelection={selectRows ? rowSelection : null}
          pagination={isTotal && paginationProps}
          indentSize={30}
          padding={0}
          className={classNames('table-can-click', styles.globalTable)}
          scroll={scroll}
          onChange={handleTableChange}
        />
      </div>
    </>
  )
}

export default FsTable;

