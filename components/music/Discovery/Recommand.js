import React, {useState, useEffect} from 'react'
import '../../../public/style/components/Discovery/Recommand.css'
import { Card, message, Spin } from 'antd'
import { getRecommandList } from '../../../service'
export default function Recommand() {
  const Meta = Card.Meta
  let isMounted = true
  const [isLoading, setIsLoading] = useState(false)
  const [recommandList, setRecommandList] = useState([])
  useEffect(() => {
    setIsLoading(true)
    getRecommandList(8).then(res => {
      if (res.data.code === 200) {
        if (isMounted) {
          setRecommandList(res.data.result)
          setIsLoading(false)
        }
      } else {
        message.error('获取音乐数据失败')
      }
    })
    return () => {
      isMounted = false
    }
  }, [])
  return (
      <Spin spinning={isLoading}>
        <h2 className="Dc_title">推荐歌单</h2><hr/>
        <div className="card-list">
        {
          recommandList.map(item => (
            <Card
              hoverable
              className="card"
              cover={<img src={item.picUrl} />}
              key={item.picUrl}
            >
              <Meta title={item.copywriter} description={item.name} />
            </Card>
          ))
        }
        </div>
      </Spin>
  )
}
