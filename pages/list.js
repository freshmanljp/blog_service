import Head from 'next/head'
import { useState, useEffect } from 'react'
import {
  Row,
  Col,
  Breadcrumb
} from 'antd'
import { HomeOutlined } from '@ant-design/icons'
import {
  Header,
  Intro,
  Advert,
  Footer,
  ArticleList
} from '../components'
import { getListById } from '../service'

function myList(props) {
  const list = props.data.data
  const [listData, setListData] = useState(list)
  // 不切换页面实现list数据的转换，监视props数据，页面不会全部重新渲染
  useEffect(() => {
    setListData(list)
  })
  return (
    <div className="container">
      <Head>
        <title>React Blog</title>
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
            </Breadcrumb>
          </div>
          <ArticleList header={<h3>{listData[0].type_name}</h3>} listData={listData}></ArticleList>
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

myList.getInitialProps = async (ctx) => {
  const id = ctx.query.key
  const res = await getListById(id)
  return {data: res.data}
}

export default myList
