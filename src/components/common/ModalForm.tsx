import React, { useEffect } from 'react';
import { Button, Form, Row, Col, Spin } from 'antd';
import styles from './ModalForm.scss';

const FormItem = Form.Item;

const ModalForm = (props: any) => {
  const {
    cascaderChangeValue,
    formItem,
    ifEdit,
    ifHide = false,
    loading,
    goBack,
    handleSubmit,
    header = ''
  } = props;
  const { getFieldDecorator, validateFields, resetFields } = props.form;
  const formSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    validateFields((err: any, values: any) => {
      if (!err) {
        let {regionId} = values;
        values.city = regionId;
        values.regionId = regionId[0];
        handleSubmit({...values, ...cascaderChangeValue});
      }
    })
  }
  const formLayout = {
    labelCol: {
      xs: {span: 24},
      sm: {span: 8}
    },
    wrapperCol: {
      xs: {span: 24},
      sm: {span: 12}
    }
  }
  return (
    <Spin
      spinning={!loading ? false : loading}
      key="modalForm"
      wrapperClassName={styles.spin}
    >
      <div key="titleKey" className={styles.titleWrap}>
        {
          header && (
            <ul className={styles.mainTitle}>
              <li className={styles.titleItem}>{header.title}{ifHide ? '查看' : (ifEdit ? '修改' : '新增')}</li>
              <li key="crtuser">录入人:{'测试姓名'}</li>
            </ul>
          )
        }
      </div>
      <Form
        key="formWrap"
        className={styles.formWrap}
        onSubmit={formSubmit}
      >
        <Row>
          {formItem.map((item: any) => (
            <Col
              span={item.span || 12}
              key={item.key}
            >
              <FormItem
                label={item.label}
                {...formLayout}
                {...item.formLayout}
                validateStatus={item.validateStatus}
              >
                {getFieldDecorator(item.key, {
                  initialValue: item.initialValue,
                  rules: item.rules || []
                })(item.component)}
              </FormItem>
            </Col>
          ))}
        </Row>
        <Row className={styles.buttonRow}>
          <Button icon="arrow-left" onClick={goBack}>返回列表</Button>
          {ifEdit ? (
            <Button
              className={styles.submitBtn}
              htmlType="submit"
              style={{ display: ifHide ? 'none' : 'inline-block' }}
            >
              更新
            </Button>
          ) : (
            <Button
              className={styles.submitBtn}
              htmlType="submit"
            >
              保存
            </Button>
          )}
        </Row>
      </Form>
    </Spin>
  )
}

export default Form.create()(ModalForm)
