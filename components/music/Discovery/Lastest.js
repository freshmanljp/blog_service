import React, { useState, useEffect, memo } from 'react'
import { message, Spin } from 'antd'
import { PlayCircleOutlined } from '@ant-design/icons'
import '../../../public/style/components/Discovery/Lastest.css'
import { getLastestSongsList } from '../../../service'

function Lastest(props) {
  const [songList, setSongList] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  let isMounted = true
  useEffect(() => {
    setIsLoading(true)
    getLastestSongsList().then(res => {
      if (res.data.code === 200) {
        if (isMounted) {
          setSongList(res.data.result)
          setIsLoading(false)
        }
      } else {
        message.error('获取音乐数据错误')
      }
    }).catch(err => {
      console.log(err)
    })
    return () => {
      isMounted = false
    }
  }, [])
  return (
    <>
      <Spin spinning={isLoading}>
        <h2 className="Dc_title">最新音乐</h2><hr/>
        <div className="song_lastest">
          {
            songList.map(item => {
              return (
                <div className="song-box" key={item.id}>
                  <div className="cover-wrap">
                    <img src={item.picUrl}/>
                    <PlayCircleOutlined className="icon" onClick={props.handleClick.bind(this, item.id)}/>
                  </div>
                  <div className="song-wrap">
                    <div className="title">{item.name}</div>
                    {item.song.artists.map(singer => {
                      return <span className="singer" key={singer.name}>{singer.name}</span>
                    })}
                  </div>
                </div>
              )
            })
          }
        </div>
      </Spin>  
    </>
  )
}

export default memo(Lastest)