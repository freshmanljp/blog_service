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

import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'
import Tocify from '../components/tocify.tsx'

import { getArticleById } from '../service'

function Detail(props) {
  // 从props中获取文章数据
  const articleData = props.data[0]
  // 新建文章目录控件对象
  const tocify = new Tocify()
  // 自定义head的渲染格式，这时候需要设置renderer.heading，就是写一个方法们重新定义对#这种标签的解析
  // const renderer = new marked.Renderer()
  // renderer.heading = function(text, level) {
  //   const anchor = tocify.add(text, level)
  //   return `<a id="${anchor}" herf="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`
  //   console.log('in')
  // }
  const renderer = {
    heading(text, level) {
      const anchor = tocify.add(text, level)
      return `<a id="${anchor}" herf="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`
    }
  }
  // markde相关配置
  marked.setOptions({
    // 可以通过自定义的Renderer渲染出自定义的格式
    renderer: new marked.Renderer(),
    // 只解析符合Markdown定义的，不修正Markdown的错误,false为修正Markdown的错误
    pedantic: false,
    // 启动类似Github样式的Markdown
    gfm: true,
    // 支持Github换行符
    breaks: false,
    // 原始输出，忽略HTML标签，这个作为一个开发人员，一定要写flase
    sanitize: false,
    // 优化列表输出，这个填写ture之后，你的样式会好看很多
    smartLists: true,
    // 高亮显示规则
    highlight: function(code) {
      return hljs.highlightAuto(code).value
    }
  })
  marked.use({ renderer })
  // 用marked处理文章内容
  const html = marked(articleData.content)
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
              <Breadcrumb.Item>{articleData.title}</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div className="article-title">
            {articleData.title}
          </div>
          <div className="article-subtitle">
            <span><CalendarOutlined />{articleData.add_time}</span>
            <span><FolderOutlined />{articleData.type_name}</span>
            <span><FireOutlined />{articleData.view_count}</span>
          </div>
          {/* 文章markdown内容部分 */}
          {/* escapeHtml为配置是否不解析html */}
          <div className="article-content" dangerouslySetInnerHTML={{__html: html}}></div>
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
              <div className="toc-list">
                {tocify && tocify.render()}
              </div>
            </div>
          </Affix>
        </Col>
      </Row>
    </div>
  )
}

// 根据路由参数id获取该文章详细信息
Detail.getInitialProps = async (ctx) => {
  const id = ctx.query.id
  const res = await getArticleById(id)
  return res.data
}

export default Detail
