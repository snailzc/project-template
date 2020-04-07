import React, {useState} from 'react';
import { Form, Input, Button, Table, Divider, Tag, Modal, Tooltip, Icon} from 'antd';
import styles from './index.scss';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: text => <a>{text}</a>,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: tags => (
      <span>
        {tags.map(tag => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </span>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <span>
        <a>修改</a>
        <Divider type="vertical" />
        <a>删除</a>
      </span>
    ),
  },
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
}


const Index: React.FC  = (props:any) => {
  const { getFieldDecorator } = props.form;
  const [visible, isVisible] = useState<boolean>(false)
  const handleHide = () => {
    isVisible(false)
  }
  const handleShow = () => {
    isVisible(true)
  }
  return (
    <div className={styles.test}>
      <div className={styles.search}>
        <Form layout="inline" >
          <Form.Item>
            {getFieldDecorator('test1')(
              <Input />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('test2')(
              <Input />,
            )}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div className={styles.content}>
        <div className={styles.table_operations}>
          <Button icon="plus" type="primary" size='small' onClick={handleShow}>新增</Button>
        </div>
        <Table  size="small" columns={columns} dataSource={data} />
      </div>
      <Modal
        title="新增"
        visible={visible}
        onOk={handleHide}
        onCancel={handleHide}
        cancelText='取消'
        width='600px'
        okText='保存'
        getContainer={false}
      >
        <div className={styles.modal}>
          <Form {...formItemLayout}>
            <Form.Item label="邮箱">
              {getFieldDecorator('email', {
                rules: [
                  {
                    type: 'email',
                    message: '请输入正确的邮箱地址！',
                  },
                  {
                    required: true,
                    message: '请输入邮箱地址',
                  },
                ],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="密码" hasFeedback>
              {getFieldDecorator('passwor', {
                rules: [
                  {
                    required: true,
                    message: '请输入密码',
                  }
                ],
              })(<Input.Password />)}
            </Form.Item>
            <Form.Item label="确认密码" hasFeedback>
              {getFieldDecorator('confirm', {
                rules: [
                  {
                    required: true,
                    message: '请确认密码',
                  },
                ],
              })(<Input.Password />)}
            </Form.Item>
            <Form.Item
              label={
                <span>
                  Nickname&nbsp;
                  <Tooltip title="What do you want others to call you?">
                    <Icon type="question-circle-o" />
                  </Tooltip>
                </span>
              }
            >
              {getFieldDecorator('nickname', {
                rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="手机号">
              {getFieldDecorator('phone', {
                rules: [{ required: true, message: 'Please input your phone number!' }],
              })(<Input style={{ width: '100%' }} />)}
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </div>
  )
}

export default Form.create()(Index);
