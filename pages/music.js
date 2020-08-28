import { useState } from 'react'
import Head from 'next/head'
import Router from 'next/router'
import {
  Row,
  Col,
  Breadcrumb,
  Menu,
  message,
  PageHeader
} from 'antd'
import { HomeOutlined } from '@ant-design/icons'
import {
  Header,
  Intro,
  Advert,
  Footer,
  MusicDiscovery,
  QualityRecommand
} from '../components'
import '../public/style/pages/music.css'
import { getSongsURl } from '../service'

// ***********************点击music播放其组件会全部刷新问题待解决***************

function Music(props) {
  const [musicUrl, setMusicUrl] = useState('')
  // 根据标签栏渲染不同的music组件
  const MusicComponent = () => {
    const page = props.data
    // return <MusicDiscovery />
    switch (page) {
      case '1': 
        return <MusicDiscovery handleLastestClick={handleSongClick} handleMvClick={handleMvClick}/>
      case '2':
        return <QualityRecommand />
      // case '3':
      //   return <LastestMusic handleClick={handleLastestClick}/>
      // case '4':
      //   return <MvDiscovery handleClick={handleMvClick}/>
      default:
        return <></>
    }
  }
  const goHome = () => {
    Router.push({
      pathname:'/'
    })
  }
  const handleMenuClick = (e) => {
    const key = e.key
    // Router.push('/music/?key=' + key)
    // 上面那种跳转方式会出问题？
    Router.push({
      pathname:'/music',
      query:{
        key: key
      }
    })
  }
  // 歌曲点击获取音频url处理
  const handleSongClick = (id) => {
    getSongsURl(id).then(res => {
      if (res.data.code === 200) {
        setMusicUrl(res.data.data[0].url)
      } else {
        message.error('加载歌曲失败')
      }
    }).catch(err => {
      console.log(err)
    })
  }
  // MV获取处理
  const handleMvClick = () => {}
  return (
    <div className="container">
      <Head>
        <title>React Blog</title>
      </Head>
      <Header></Header>
      <Row className="comm-main" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
          <PageHeader
            className="site-page-header"
            onBack={goHome}
            title="音乐播放器"
            subTitle="逛累了来这里邂逅音乐吧"
          />
          {/* 歌曲播放标签 */}
          <div className="player">
            <audio src={musicUrl} controls autoPlay></audio>
          </div>
          {/* 歌单导航栏 */}
          <Menu
            mode="horizontal"
            defaultSelectedKeys={props.data}
            onClick={handleMenuClick}
            className="music-header"
          >
            <Menu.Item key="1">发现音乐</Menu.Item>
            <Menu.Item key="2">推荐歌单</Menu.Item>
            <Menu.Item key="3">最新音乐</Menu.Item>
            <Menu.Item key="4">最新MV</Menu.Item>
          </Menu>
          <MusicComponent/>
        </Col>
        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Intro></Intro>
          <Advert></Advert>
        </Col>
      </Row>
      <Footer></Footer>
    </div>
  )
}

Music.getInitialProps = async (ctx) => {
  const key = ctx.query.key
  // 这件键名必须是data？
  return {
    data: key
  }
}

export default Music
