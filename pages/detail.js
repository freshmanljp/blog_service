import Head from 'next/head'
import {
  Row,
  Col
} from 'antd'
import {
  Header
} from '../components'

export default function Detail() {
  return (
    <div className="container">
      <Head>
        <title>Detail</title>
      </Head>
      <Header></Header>
      <Row className="comm-main" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>左栏</Col>
        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>右栏</Col>
      </Row>
    </div>
  )
}
