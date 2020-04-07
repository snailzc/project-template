import React, { useState, MutableRefObject, useRef } from 'react';
import { Button, Form, Icon } from 'antd';
import MyCascader from './Cascader';
import classNames from 'classnames';

import styles from './SearchForm.scss';

const FormItem = Form.Item;

const FormCom = (props: any) => {
  const casRef: MutableRefObject<any> = useRef();
  const { getFieldDecorator, resetFields, validateFields } = props.form;
  const { showCas, formItem, searchHandler } = props;
  const [initClass, setInitClass] = useState<string>('inactive');
  const searchEvent = (e: any) => {
    e.preventDefault();
    let cascaderValue = casRef.current.value;
    validateFields((err: any, values: any) => {
      if (!err) {
        let newValue: any = {...values};
        if (cascaderValue.length) {
          newValue = {...newValue, ...{field: cascaderValue}};
        }
        searchHandler(newValue);
      }
    })
  }
  const resetHandler = () => {
    resetFields();
    casRef.current.resetValue();
    validateFields((err: any, values: any) => {
        searchHandler(values);
      }
    )
  }
  const arrowHandler = () => {
    setInitClass(initClass === 'inactive' ? 'active' : 'inactive');
  }
  return (
    <div className={classNames(styles.formWrap)}>
    <Form layout="inline" className={classNames(styles.form, styles[initClass])}>
      {
        showCas ? (
          <FormItem key="field" className={styles.formItem}>
            <MyCascader ref={casRef}/>
          </FormItem>
        ) : null
      }
      {
        formItem.map((item: any, index:number) => {
          if (initClass === 'active' || !item.formHidden) {
            return (
              <FormItem key={index} className={styles.formItem} style={{width: item.width}}>
                {getFieldDecorator(item.key, {
                  initialValue: item.initialValue,
                  rules: item.rules || []
                })(
                  item.component
                )}
              </FormItem>
            )
          }
        })
      }
    </Form>
    <div className={styles.btns}>
      <div className={classNames(styles.searchButton, styles[initClass])}>
        <Button htmlType="submit" onClick={searchEvent} type="primary">查询</Button>
        <Button onClick={resetHandler}>重置</Button>
      </div>
      <div className={classNames(styles.arrow, styles[initClass])} onClick={arrowHandler}>
        <Icon style={{fontSize: '14px'}} type="down" />
      </div>
      </div>
    </div>
  )
}

export default Form.create()(FormCom)
