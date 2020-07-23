import Head from 'next/head'
import {
  Row,
  Col,
  Breadcrumb,
  Affix
} from 'antd'
import { CalendarOutlined, FolderOutlined, FireOutlined, HomeOutlined } from '@ant-design/icons'
import {
  Header,
  Intro,
  Advert
} from '../components'
import '../public/style/pages/detail.css'
import ReactMarkDown from 'react-markdown'
import MarkDownNavbar from 'markdown-navbar'
import 'markdown-navbar/dist/navbar.css'

export default function Detail() {
  const markdown = '\n# P01:课程介绍和环境搭建\n' +
  '[ **M** ] arkdown + E [ **ditor** ] = **Mditor**  \n' +
  '> Mditor 是一个简洁、易于集成、方便扩展、期望舒服的编写 markdown 的编辑器，仅此而已... \n\n' +
   '**这是加粗的文字**\n\n' +
  '*这是倾斜的文字*`\n\n' +
  '***这是斜体加粗的文字***\n\n' +
  '~~这是加删除线的文字~~ \n\n'+
  '\`console.log(111)\` \n\n'+
  '# p02:来个Hello World 初始Vue3.0\n' +
  '> aaaaaaaaa\n' +
  '>> bbbbbbbbb\n' +
  '>>> cccccccccc\n'+
  '***\n\n\n' +
  '# p03:Vue3.0基础知识讲解\n' +
  '> aaaaaaaaa\n' +
  '>> bbbbbbbbb\n' +
  '>>> cccccccccc\n\n'+
  '# p04:Vue3.0基础知识讲解\n' +
  '> aaaaaaaaa\n' +
  '>> bbbbbbbbb\n' +
  '>>> cccccccccc\n\n'+
  '#5 p05:Vue3.0基础知识讲解\n' +
  '> aaaaaaaaa\n' +
  '>> bbbbbbbbb\n' +
  '>>> cccccccccc\n\n'+
  '# p06:Vue3.0基础知识讲解\n' +
  '> aaaaaaaaa\n' +
  '>> bbbbbbbbb\n' +
  '>>> cccccccccc\n\n'+
  '# p07:Vue3.0基础知识讲解\n' +
  '> aaaaaaaaa\n' +
  '>> bbbbbbbbb\n' +
  '>>> cccccccccc\n\n'+
  '``` var a=11; ```'
  return (
    <div className="container">
      <Head>
        <title>Detail</title>
      </Head>
      <Header></Header>
      <Row className="comm-main" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
          <div className="breadcrumb">
            <Breadcrumb>
              <Breadcrumb.Item href="/">
                <HomeOutlined />
              </Breadcrumb.Item>
              <Breadcrumb.Item>文章列表</Breadcrumb.Item>
              <Breadcrumb.Item>xxxx</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div className="article-title">
            React实战Blog开发
          </div>
          <div className="article-subtitle">
            <span><CalendarOutlined />2020-07-21</span>
            <span><FolderOutlined />经验分享</span>
            <span><FireOutlined />5487阅读量</span>
          </div>
          {/* 文章markdown内容部分 */}
          {/* escapeHtml为配置是否不解析html */}
          <div className="article-content">
            <ReactMarkDown
              source={markdown}
              escapeHtml={false}
            ></ReactMarkDown>
          </div>
        </Col>
        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Intro></Intro>
          <Advert></Advert>
          {/* 文章目录部分 */}
          {/* Offset from the top of the viewport (in pixels) */}
          <Affix offsetTop={5}>
            <div className="comm-box ">
              <div className="nav-title">
                文章目录
              </div>
              {/* order配置 Whether the title contains a numerical prefix, such as: 1. 2. 2.2 */}
              <MarkDownNavbar
                source={markdown}
                ordered={false}
              ></MarkDownNavbar>
            </div>
          </Affix>
        </Col>
      </Row>
    </div>
  )
}
