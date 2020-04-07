import React, { useState, useEffect } from 'react';
import { Menu, Icon } from 'antd';
import Link from 'umi/link';
import config from 'src/config/app.config'
import styles from './SiderMenu.scss';

const { SubMenu } = Menu;


interface SelectParam {
  key: string;
  keyPath: Array<string>;
  item: any;
  domEvent: Event;
  selectedKeys: Array<string>;
}

const Index: React.FC = (props:any) => {
  const [active, setActive] = useState<Array<string>>([])
  const [openKeys, setOpenKeys] = useState<Array<string>>([])

  const getManagementMenuItems = (data:[], path: string):React.ReactNode => {
    return data.map((item:any) => {
      var arr = item.path.split('/')
      return (
        <Menu.Item key={`${path}/${arr[arr.length - 1]}`}>
          <Link to={`${path}/${arr[arr.length - 1]}`}>
            {/* <Icon type={item.icon} /> */}
            <span>{item.title}</span>
          </Link>
        </Menu.Item>
      )
    })
  }
  const getNavMenuItems = (data:[]):React.ReactNode => {
    return data.map((item:any) => {
      if (config.appcode) {
        if (item.appCode && config.appcode !== item.appCode) {
          return false
        } else if (!item.appCode && item.children && item.children[0]) {
          return getNavMenuItems(item.children)
        }
      }

      if (item.title === '基础配置管理') {
        return (
          <SubMenu key={item.path} title={item.title}>
            {
              getManagementMenuItems(item.children, item.path)
            }
          </SubMenu>
        )
      }

      if (item.children && item.children[0]) {
        return (
          <SubMenu key={item.path} title={item.title}>
            {
              getNavMenuItems(item.children)
            }
          </SubMenu>
        )
      } else {
        return (
          <Menu.Item key={item.path}>
            <Link to={item.path}>
              {/* <Icon type={item.icon} /> */}
              <span>{item.title}</span>
            </Link>
          </Menu.Item>
        )
      }
    })
  }





  const onOpenChange = (e:any) => {
    setOpenKeys(e)
  }

  const handleSelect = (e:SelectParam) => {
    setActive(e.keyPath)
  }

  const handleOpenKeys = (url:string) => {
    const a = url.split('/');
    const arr = [];
    for(let i = 2; i < a.length; i++) {
      arr.push(a.slice(0, i).join('/'))
    }
    setOpenKeys(arr)
  }
  useEffect(() => {
    const activeKey = props.location.pathname;
    setActive([activeKey])
    handleOpenKeys(props.location.pathname)
  }, [props.location.pathname])
  return (
    <div className={styles.siderMenu}>
      <Menu
        inlineIndent={16}
        selectedKeys={active}
        onSelect={handleSelect}
        // openKeys={openKeys}
        // onOpenChange={onOpenChange}
        theme="dark"
        mode="inline"
      >
        {
          getNavMenuItems(props.menus)
        }
      </Menu>
    </div>
  );
};

export default Index;
