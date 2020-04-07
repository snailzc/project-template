import React, { useState, useEffect } from 'react';
import ReactParticleLine from 'react-particle-line';
import { Row, Col } from 'antd';
import Equipment from '@/components/Map/Equipment'
import Header from '@/components/Map/Header'
import Plat from '@/components/Map/Plat'
import Loan from '@/components/Map/Loan'


import styles from './index.scss'

const Map: React.FC = () => {
  const [isFullScreen, setFullScreen] = useState<Boolean>(false);
  const [scale, setScale] = useState<string>('1')
  const fullScreen = () =>{
    requestFullScreen();
  };
  const requestFullScreen = () => {
    var dom = document.getElementById('monitorDataFlowContainer');//绑定想要全屏的组件
    if (dom && dom.requestFullscreen) {
        dom.requestFullscreen();
    } else if (dom && dom.mozRequestFullScreen) {
        dom.mozRequestFullScreen();
    } else if (dom && dom.webkitRequestFullScreen) {
        dom.webkitRequestFullScreen();
    }
  };
  const exitFullscreen = () => {
      var dom = document;
      if (dom.exitFullscreen) {
          dom.exitFullscreen();
      } else if (dom.mozCancelFullScreen) {
          dom.mozCancelFullScreen();
      } else if (dom.webkitCancelFullScreen) {
          dom.webkitCancelFullScreen();
      }
  }
  useEffect(() => {
    document.addEventListener("fullscreenchange", () => {
        setFullScreen(document.webkitIsFullScreen)
      },
      false
    );
    return () =>  {
      document.removeEventListener('fullscreenchange', () => {
          setFullScreen(document.webkitIsFullScreen)
      })
    }
  }, [])
  // 等比放大缩小
  useEffect(() => {
    setTimeout(() => {
      if (document.querySelector('.ant-layout-content')) {
        const boundClient = document.querySelector('.ant-layout-content').getBoundingClientRect()
        setScale(((boundClient.width - 10) / 1800).toFixed(2))
      }
    }, 0)
    window.addEventListener('resize', () => {
      requestAnimationFrame(() => {
        if (document.querySelector('.ant-layout-content')) {
          const boundClient = document.querySelector('.ant-layout-content').getBoundingClientRect()
          setScale(((boundClient.width - 10) / 1800).toFixed(2))
        }
      })
    })
    return () => {
      window.removeEventListener('resize', () => {
        requestAnimationFrame(() => {
          if (document.querySelector('.ant-layout-content')) {
            const boundClient = document.querySelector('.ant-layout-content').getBoundingClientRect()
            setScale((boundClient.width / 1800).toFixed(2))
          }
        })
      })
    }
  }, [])
  return (
      <div onClick={fullScreen} style={{ transform: `scale(${scale})`}} className={styles.map} id="monitorDataFlowContainer">
        <ReactParticleLine >
          <div className={styles.content}>
            <Row gutter={[0, 5]}>
              <Col span={24}>
                <Header />
              </Col>
            </Row>
            <Row gutter={[5, 5]}>
              <Col span={6}>
                <Equipment />
              </Col>
              <Col span={11}>
                <Plat />
              </Col>
              <Col span={7}>
                <Loan />
              </Col>
            </Row>
          </div>
        </ReactParticleLine>
      </div>

  )
}

export default Map
