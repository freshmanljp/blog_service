import React, { useState, useEffect } from 'react'
import { PlayCircleOutlined, PlaySquareOutlined } from '@ant-design/icons'
import { message, Spin } from 'antd'
import '../../../public/style/components/Discovery/MvDiscovery.css'
import { getLastestMvList } from '../../../service'

export default function MvDiscovery() {
  const [isLoading, setIsLoading] = useState(false)
  const [mvList, setMvList] = useState([])
  const isMounted = true
  useEffect(() => {
    setIsLoading(true)
    getLastestMvList().then(res => {
      if (res.data.code === 200) {
        if (isMounted) {
          setMvList(res.data.result)
          setIsLoading(false)
        }
      } else {
        message.error('获取音乐数据失败')
      }
    }).catch(err => {
      console.log(err)
    })
  }, [])
  return (
    <Spin spinning={isLoading}>
      <h2 className="Dc_title">推荐MV</h2><hr/>
      <div className="mv-list">
        {mvList.map(item => (
          <div className="mv-item" key={item.id}>
            <div className="cover-wrap">
              <img src={item.picUrl}/>
              <div className="num">
                <PlaySquareOutlined />&nbsp;{item.playCount}
              </div>
              <PlayCircleOutlined className="icon"/>
            </div>
            <div className="song-wrap">
              <div className="song-name">{item.name}</div>
              <div className="singer-name">
                {item.artists.map(singer => singer.name)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Spin>
  )
}
