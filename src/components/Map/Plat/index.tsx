import React, {useEffect, memo, useState} from 'react';
import ChinaMap from '@/components/Charts/ChinaMap';
import Bar from '@/components/Charts/Bar';
import { Card } from '@/components/Card';
import { genOverviewMap, genOverviewBar } from '@/utils/genMapData';
import getMapData from '@/json/map'

import styles from './index.scss';

const index = memo(() => {
    const { mapData, message } = getMapData();
    // const [mapData, setMapData] = useState<[]>([])
    // const [message, setMessage] = useState<[]>([])
    // console.log(JSON.stringify(mapData), JSON.stringify(message))
    const chinaMapData = genOverviewMap(mapData, message);
    const { sum, ...mapBarData } = genOverviewBar(mapData);
    // useEffect(() => {
    //   var ws = new WebSocket("ws://192.168.10.6:9107/websocket/55555");
    //   ws.onopen = function() {
    //      ws.send("发送数据");
    //     //  alert("数据发送中...");
    //   };
    //   ws.onmessage = function (evt) {
    //     if (evt.data) {
    //       var received_msg =  JSON.parse(evt.data);
    //       setMapData(received_msg.mapData)
    //       setMessage(received_msg.message)
    //     }
    //     // console.log(evt.data)
    //   };
    //   return () => {
    //     ws.close()
    //   }
    // }, [])
    return (
      <div className={styles.content}>
        {mapData.length > 0 && (
          <>
            <ChinaMap
              data={chinaMapData}
              style={{ height: 600, width: '80%', top: '10%', left: '-5%' }}
            />
            <Bar
              data={mapBarData}
              style={{
                position: 'absolute',
                height: 550,
                top: '5%',
                right: '2%',
                width: '30%',
              }}
            />
          </>
        )}
      </div>
  );
})

export default index
