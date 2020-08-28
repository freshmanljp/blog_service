import React, { useEffect, useState } from 'react'
import { PlayCircleOutlined, PlaySquareOutlined } from '@ant-design/icons'
import { message, Spin, Divider, Pagination } from 'antd'
import '../../../public/style/components/QualityRecommand.css'
import { getQualitySongsList, getCatSongsList } from '../../../service'

export default function index() {
  const [qualitySongList, setQualitySongList] = useState({})
  const [isLoading_card, setIsLoading_card] = useState(false)
  const [catSongList, setCatSongList] = useState([])
  const [isLoading_cat, setIsLoading_cat] = useState(false)
  const [tag, setTag] = useState('全部')
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  // 点击切换标签处理函数
  const changeTag = (tag) => {
    setTag(tag)
    // 换标签时把页码清零
    setPage(1)
  }
  // 切换标签时歌单列表切换函数
  const switchCatSongsList = (offset=0) => {
    getCatSongsList(10, offset, tag).then(res => {
      if (res.data.code === 200) {
        // api有时候返回的条数大于10，要截取一下
        console.log(res.data.playlists)
        setCatSongList(res.data.playlists.slice(0,10))
        setTotal(res.data.total)
        setIsLoading_cat(false)
      } else {
        message.error('获取分类歌单失败')
      }
    })
  }
  // 歌单页码改变
  const pageChange = (pageNum) => {
    setPage(pageNum)
  }
  useEffect(() => {
    setIsLoading_card(true)
    getQualitySongsList(1, '全部').then(res => {
      if (res.data.code === 200) {
        setQualitySongList(res.data.playlists[0])
        setIsLoading_card(false)
      } else {
        message.error('获取精品歌单失败')
      }
    })
    switchCatSongsList()
  }, [])
  useEffect(() => {
    let offset = (page - 1) * 10
    switchCatSongsList(offset)
  }, [tag, page])
  return (
    <>
      <Spin spinning={isLoading_card}>
        {/* 头部精品歌单推荐卡片 */}
        <div className="top-card">
          {/* 歌单封面图片 */}
          <div className="img-wrap">
            <img src={qualitySongList.coverImgUrl}></img>
            {/* 播放按钮 */}
            <PlayCircleOutlined className="icon"/>
          </div>
          {/* 歌单内容介绍 */}
          <div className="content-wrap">
            <div className="tag">精品歌单</div>
            <div className="title">{qualitySongList.copywriter}</div>
            <div className="desc">{qualitySongList.description}</div>
          </div>
          {/* 歌单背景图片 */}
          <img src={qualitySongList.coverImgUrl} className='bgc'></img>
          {/* 背景遮罩 */}
          <div className="mask"></div>
        </div>
      </Spin>
      <Spin spinning={isLoading_cat}>
        {/* 歌单类型选择tab栏 */}
        <div className="tab-container">
          <div className="tab-bar">
            <span onClick={changeTag.bind(this, '全部')} className={`item ${tag === '全部' ? "active" : null}`}>全部</span><Divider type="vertical"/>
            <span onClick={changeTag.bind(this, '欧美')} className={`item ${tag === '欧美' ? "active" : null}`}>欧美</span><Divider type="vertical"/>
            <span onClick={changeTag.bind(this, '华语')} className={`item ${tag === '华语' ? "active" : null}`}>华语</span><Divider type="vertical"/>
            <span onClick={changeTag.bind(this, '流行')} className={`item ${tag === '流行' ? "active" : null}`}>流行</span><Divider type="vertical"/>
            <span onClick={changeTag.bind(this, '说唱')} className={`item ${tag === '说唱' ? "active" : null}`}>说唱</span><Divider type="vertical"/>
            <span onClick={changeTag.bind(this, '摇滚')} className={`item ${tag === '摇滚' ? "active" : null}`}>摇滚</span><Divider type="vertical"/>
            <span onClick={changeTag.bind(this, '民谣')} className={`item ${tag === '民谣' ? "active" : null}`}>民谣</span><Divider type="vertical"/>
            {/* <span onClick={changeTag.bind(this, '电子')} className={`item ${tag === '电子' ? "active" : null}`}>电子</span><Divider type="vertical"/> */}
            <span onClick={changeTag.bind(this, '轻音乐')} className={`item ${tag === '轻音乐' ? "active" : null}`}>轻音乐</span><Divider type="vertical"/>
            <span onClick={changeTag.bind(this, '影视原声')} className={`item ${tag === '影视原声' ? "active" : null}`}>影视原声</span><Divider type="vertical"/>
            <span onClick={changeTag.bind(this, '怀旧')} className={`item ${tag === '怀旧' ? "active" : null}`}>怀旧</span><Divider type="vertical"/>
            <span onClick={changeTag.bind(this, '治愈')} className={`item ${tag === '治愈' ? "active" : null}`}>治愈</span><Divider type="vertical"/>
            <span onClick={changeTag.bind(this, '旅行')} className={`item ${tag === '旅行' ? "active" : null}`}>旅行</span>
          </div>
          {/* 具体类型歌单列表区 */}
          <div className="tab-content">
            {
              catSongList.map(item => {
                return (
                  <div className="item" key={item.id}>
                    {/* 歌单图片封面 */}
                    <div className="img-wrap">
                      <div className="play-count"><PlaySquareOutlined />&nbsp;{item.playCount}</div>
                      <img src={item.coverImgUrl}></img>
                      {/* 播放效果 */}
                      <PlayCircleOutlined className="icon"/>
                    </div>
                    {/* 歌单描述 */}
                    <p className="desc">{item.description}</p>
                  </div>
                )
              })
            }
          </div>
        </div>
        {/* 分页控件 */}
        <div className="pagination">
          <Pagination
            defaultCurrent={1}
            pageSize={10}
            onChange={pageChange}
            total={total}
            showSizeChanger={false}
            current={page}
          />
        </div>
      </Spin> 
    </>
  )
}
