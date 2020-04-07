import React, { useState, useEffect } from 'react';
import { Layout, Icon, ConfigProvider } from 'antd';
import config from 'src/config/app.config'
import SiderMenu from 'components/layouts/SiderMenu';
import Header from 'components/layouts/Header';
import TabContent from 'components/layouts/TabContent'
import styles from './index.scss';
import {wideTraversal} from 'utils/method.tsx';
import router from 'umi/router';
import {getMenus, getInfo} from './request'

import zhCN from 'antd/es/locale/zh_CN';

const { Sider, Content } = Layout;

const a = Object.keys(Array.from({length: 20}))
const BasicLayout: React.FC = (props:any) => {
  const [menus, setMenus] = useState<any>(localStorage.menu ? (JSON.parse(localStorage.menu)[0] ? JSON.parse(localStorage.menu) : []) : [])
  const [dir, setDir] = useState<string>('left')
  const [info, setInfo] = useState<object>(localStorage.info ? JSON.parse(localStorage.info) : {})
  const getData = async() => {
    const menu:any = await getMenus();
    if (menu && menu[0]) {
      setMenus(menu)
      localStorage.menu = JSON.stringify(menu)
    }
    const info:any = await getInfo();
    if (info.id) {
      setInfo(info)
      localStorage.info = JSON.stringify(info)
    }
  }
  /**
   * 现在使用了useState,防止报错
   * 不在条件里使用useEffect
   */
  useEffect(() => {
    if (!localStorage.token) {
      router.push('/login')
    }
    document.title = config.title;
    getData()
  }, [])

  // if (props.location.pathname === '/login') {
  //   return <>{props.children}</>
  // }

  const toggleMenu = () => {
    setDir(dir === 'left' ? 'right' : 'left');
  }

  return (
    <ConfigProvider locale={zhCN}>
      <Layout className={styles.layout}>
        <Header {...props} info={info} dir={dir} handleTaggle={toggleMenu}  />
        <Layout>
          <Sider className={dir}>
            <SiderMenu {...props} menus={menus}/>
          </Sider>
          <Content>
            <TabContent {...props} menus={wideTraversal(menus)} />
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default BasicLayout;

