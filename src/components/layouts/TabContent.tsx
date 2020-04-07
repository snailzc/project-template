import React, { useState, useEffect, createElement, ElementType } from 'react';
import { Tabs, Dropdown, Menu, Icon, message } from 'antd';
import styles from './TabContent.scss';
import router from 'umi/router';

const { TabPane } = Tabs;

const menus = require('src/pages/admin/menus/Menus.js').default
const group = require('src/pages/admin/group/Group.js').default
const evp = require('src/pages/admin/evpDataInterface/EvpDataInterface.js').default

const plcDemo = require('src/pages/plcDemo').default
const mapDemo = require('src/pages/mapDemo').default

// pathname => component
const components: {[key: string]: any} = {
  '/bizManager/sampleProjbiz/sampleProjManager/menuManager': menus,
  '/bizManager/sampleProjbiz/sampleProjManager/groupManager': group,
  '/bizManager/sampleProjbiz/sampleProjManager/dataManager': evp,
  '/bizManager/sampleProjbiz/samplePage/plcInfoMaintain': plcDemo
}

const Index: React.FC = (props:any) => {
  const [activeKey, setActiveKey] = useState<string>(props.location.pathname)
  const [panes, setPanes] = useState<any>([
    {
      title: '首页',
      component: mapDemo,
      key: '/'
    }
  ])

  // 刷新页面获取选中菜单
  useEffect(() => {
    const activeKey = props.location.pathname;
    let isExist = false;
    let activeObj = undefined;
    for (let i = 0; i < panes.length; i += 1) {
      if (panes[i].key === activeKey) {
        isExist = true;
        break;
      }
    }
    activeObj = props.menus.find((item:{ path: string, title: string }) => {
      let key = activeKey
      if (activeKey.split('/').slice(-1)[0].indexOf('Manager') > -1) {
        key = `/adminSys/baseManager/${activeKey.split('/').slice(-1)[0]}`
      }
      return item.path === key
    })
    setActiveKey(activeKey)
    if (!isExist) {
      setPanes([...panes, { title: activeObj ? activeObj.title : 404, component: components[activeKey] || plcDemo, key: activeKey }])
    }
  }, [props.location.pathname])

  // 切换tabs
  // useEffect(() => {
  //   router.push(activeKey)
  // }, [activeKey])

  const tabClick = (activeKey: any) => {
    router.push(activeKey);
  }
  // 侧边栏操作
  const handleMenuClick = (e:{key: string}) => {
    if (e.key === '1') {
      remove(activeKey)
    } else if (e.key === '2') {
      const panesActive = panes.filter((pane:{key: string}) => pane.key === activeKey);
      setPanes(panesActive)
    }
  }

  // 删除
  const remove = (targetKey:(string | React.MouseEvent<HTMLElement, MouseEvent>)) => {
    if (panes.length === 1) {
      message.warning('窗口不能全部关闭');
      return;
    }
    let lastIndex:number = 0;
    panes.forEach((pane:{key: string}, i:number) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const panesActive = panes.filter((pane:{key: string}) => pane.key !== targetKey);
    if (panes.length && activeKey === targetKey) {
      if (lastIndex >= 0) {
        setActiveKey(panes[lastIndex].key);
        tabClick(panes[lastIndex].key)
      } else {
        setActiveKey(panes[1].key);
        tabClick(panes[1].key)
      }
    }
    setPanes(panesActive)

  };

  const menu:React.ReactNode = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1">关闭当前页</Menu.Item>
      <Menu.Item key="2">关闭其他</Menu.Item>
    </Menu>
  );
  const operation:React.ReactNode = (
    <Dropdown overlay={menu}>
      <span className={styles.operation}>
        页签操作 <Icon type="down" />
      </span>
    </Dropdown>
  );
  return (
    <div className={styles.tabContent}>
      <Tabs
        hideAdd
        type="editable-card"
        activeKey={activeKey}
        onEdit={remove}
        tabBarExtraContent={operation}
        // onChange={setActiveKey}
        onTabClick={(activeKey: any) => tabClick(activeKey)}
      >
        {
          panes.map((pane:any) => {
            return (
              <TabPane tab={pane.title} key={pane.key}>
                <pane.component {...props} />
              </TabPane>
            )
          })
        }
      </Tabs>
    </div>
  );
};

export default Index;
