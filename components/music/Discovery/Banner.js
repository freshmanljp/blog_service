import React, { useState, useEffect } from 'react'
import { Carousel, message, Spin } from 'antd'
import { getDiscoveryBanner } from '../../../service'
import '../../../public/style/components/Discovery/Banner.css'

export default function Banner() {
  const [banners, setBanners] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  let isMounted = true
  useEffect(() => {
    setIsLoading(true)
    getDiscoveryBanner().then((res) => {
      if(res.data.code === 200) {
        if(isMounted) {
          setBanners(res.data.banners)
          setIsLoading(false)
        }  
      } else {
        message.error('获取音乐数据失败')
      }
    }).catch(err => {
      console.log(err)
    })
    return () => {
      isMounted = false
    }
  }, [])
  return (
    <div className="discovery">
      <Spin spinning={isLoading}>
        <Carousel effect="fade" className="banners">
          {
            banners.map(item => {
              return (
                <div key={item.imageUrl}>
                  <img className="banners-img" src={item.imageUrl}/>
                </div>
              )
            })
          }
        </Carousel>
      </Spin>
    </div>
  )
}
