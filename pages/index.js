import Head from 'next/head'
import { useState } from 'react'
import {
  Row,
  Col
} from 'antd'
import {
  Header,
  Intro,
  Advert,
  Footer,
  ArticleList
} from '../components'
import { getAricleList } from '../service'

function Home(res) {
  const [listData] = useState(res.data)
  return (
    <div className="container">
      <Head>
        <title>React Blog</title>
      </Head>
      <Header></Header>
      <Row className="comm-main" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
          <ArticleList header={<h3>最新文章</h3>} listData={listData}></ArticleList>
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

// 在getInitialProps中获取列表数据
Home.getInitialProps = async () => {
  const res = await getAricleList()
  // 注意，这里不能直接返回res，否则会报错，应直接返回res.data
  return res.data
}

export default Home
