import React, {useState, useEffect, useRef, useReducer} from 'react';
import { Layout, Dropdown, Menu, Icon } from 'antd';
import logo from 'assets/logo.png';
import Link from 'umi/link';
import config from 'src/config/app.config'
import styles from './Header.scss';
import router from 'umi/router';
import {enterFullscreen, exitFullscreen} from  'utils/method'

const { Header } = Layout;

const Index: React.FC = (props: any) => {
  const [screenType, setScreenType] = useState<boolean>(false);
  const handleMenuClick = (e:{key: string}) => {
    if (e.key === 'logout') {
      localStorage.removeItem('token')
      localStorage.removeItem('refreshToken')
      router.push('/login')
    }
  }
  const screenEvent = () => {
    if (!document.fullscreenElement) {
      enterFullscreen();
      setScreenType(true);
    } else {
      exitFullscreen();
      setScreenType(false);
    }
  }

  const menu:React.ReactNode = (
    <Menu className={styles.menu} onClick={handleMenuClick} selectedKeys={[]}>
      {/* <Menu.Item disabled>
        <Icon type="user" />个人中心
      </Menu.Item>
      <Menu.Item disabled>
        <Icon type="setting" />设置
      </Menu.Item> */}
      <Menu.Item key="psd">
        <Icon type="lock" />修改密码
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout">
        <Icon type="logout" />退出登录
      </Menu.Item>
    </Menu>
  );
  return (
    <div className={styles.header}>
      <Header>
        <div className={styles.left}>
          <Link to='/'>
            <img src={logo} alt="" />
          </Link>
          <h1>{config.title}</h1>
          <div className={styles.btn}>
            <Icon
              onClick={props.handleTaggle}
              style={{color: '#fff', fontSize: '18px'}}
              type={props.dir === 'left' ? 'menu-fold' : 'menu-unfold'}
            />

          </div>
        </div>


        <div className={styles.right}>
          <Dropdown overlay={menu}>
            <span className={styles.name}>
              <Icon type="user" />
              {props.info.name}
            </span>
          </Dropdown>
          <Icon
            style={{color: '#fff', fontSize: '16px'}}
            type={!screenType ? 'fullscreen' : 'fullscreen-exit'}
            onClick={screenEvent}
            title={!screenType ? '全屏' : '退出全屏'}
          />
        </div>
      </Header>
    </div>
  );
};

export default Index;
