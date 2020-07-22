import React from 'react'
import { 
  Col,
  Row,
  Menu
} from 'antd'
import { HomeOutlined, HighlightOutlined, SmileOutlined } from '@ant-design/icons'
import '../public/style/components/Header.css'

export default function Header() {
  return (
    <div className="header">
      <Row justify="center">
        <Col xs={24} sm={24} md={10} lg={15} xl={12}>
          <span className="header_logo">惜乐园</span>
          <span className="header_txt">专注前端学习与生活吐槽。</span>
        </Col>
        <Col className="menu" xs={0} sm={0} md={14} lg={8} xl={6}>
          <Menu mode="horizontal">
            <Menu.Item>
              <HomeOutlined />
              首页
            </Menu.Item>
            <Menu.Item>
              <HighlightOutlined />
              文章
            </Menu.Item>
            <Menu.Item>
              <SmileOutlined />
              生活
            </Menu.Item>
          </Menu>
        </Col>
      </Row>
    </div>
  )
}
