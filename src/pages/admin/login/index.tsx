import React, {useEffect, useState} from 'react';
import { Form, Tabs, Row, Col, Input, Icon, Button, message } from 'antd';
import router from 'umi/router';
import config from 'src/config/app.config'
import 'assets/admin/wwLogin-1.0.0.js';
import styles from './index.scss';
import left from 'assets/left.png';
import bg from 'assets/bg.png';
import logo from 'assets/logo.png'
import {getToken} from './request'


const { TabPane } = Tabs;
const FormItem = Form.Item;

const inputItem:any = {
  username: {
    props: {
      size: 'large',
      prefix: <Icon type="user" className={styles.prefixIcon} />,
      placeholder: '用户名',
    },
    rules: [{
      required: true, message: '请输入账户名！',
    }],
  },
  password: {
    props: {
      size: 'large',
      prefix: <Icon type="lock" className={styles.prefixIcon} />,
      type: 'password',
      placeholder: '密码',
    },
    rules: [{
      required: true, message: '请输入密码！',
    }],
  },
}

const Index: React.FC = (props:any) => {
  const [loading, isLoading] = useState<boolean>(false)
  const { getFieldDecorator } = props.form;

  const handleSwitch = (type:string) => {
    if(type=== '2') {
      setTimeout(() => {
        window.WwLogin({
          id: 'login_wechat',
          appid: 'ww7d751c0944e1ab5f',
          agentid: '1000024',
          redirect_uri: encodeURI('https://my.imuyuan.com/'),
          state: '',
          href: '',
        });
      }, 800);
    }
  }

  const check = () => {
    props.form.validateFields(async(err:any, values:any) => {
      if (!err) {
        isLoading(true)
        const response = await getToken(values)
        if (response.status === 200) {
            localStorage.token = response.data.rows[0].token;
            localStorage.refreshToken = response.data.rows[0].refreshToken;
            message.success('登录成功！', 1.5, () => {
              router.push('/')
              isLoading(false)
            })
        } else {
          isLoading(false)
        }
      }
    });
  }

  return (
    <div className={styles.login} style={{ background: `url(${bg}) no-repeat center/ cover` }}>
        <header>
          <img src={logo} alt="logo.svg" />
          {config.title}
		    </header>
        <div className={styles.content} >
          <div className={styles.left} style={{ background: `url(${left}) no-repeat center/ cover` }} />
          <div className={styles.right}>
            <Tabs
              defaultActiveKey="1"
              animated={false}
              onChange={handleSwitch}
            >
              <TabPane tab="账户登录" key="1">
                <Form>
                  <Row gutter={[8, 24]}>
                    <Col span={24}>
                      {
                        Object.keys(inputItem).map(item => (
                          <FormItem key={item}>
                            {
                              getFieldDecorator(item, {
                                rules: inputItem[item].rules
                              })(<Input {...inputItem[item].props} />)
                            }
                          </FormItem>
                        ))
                      }
                      <FormItem>
                        <Button loading={loading} className={styles.btn} block={true} type="primary" htmlType="submit" onClick={check}>
                          登 录
                        </Button>
                        忘记密码
                      </FormItem>
                    </Col>
                  </Row>
                </Form>
              </TabPane>
              <TabPane tab="扫码登录" key="2">
                <div id="login_wechat" style={{width: "300px", margin: "-45px auto"}} />
              </TabPane>
            </Tabs>
          </div>
        </div>
        <footer>
          <p>MuYuan Foods Co.,Ltd.牧原食品股份有限公司</p>
          <p>豫ICP备12008773号 豫公网安备 41130302000124号</p>
        </footer>
    </div>
  );
};

export default Form.create()(Index);
