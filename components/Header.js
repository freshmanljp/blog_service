import React, { useState, useEffect } from 'react'
import { 
  Col,
  Row,
  Menu
} from 'antd'
import { HomeOutlined, HighlightOutlined, SmileOutlined, CameraOutlined } from '@ant-design/icons'
import '../public/style/components/Header.css'
import { getNavList } from '../service'
import Router from 'next/router'

export default function Header() {
  // useState的声明要在useEffect之外
  const [navList, setNavList] = useState([])
  // useEffect第二个参数是依赖数组，该数组内的数据发生变化才会触发更新effect
  useEffect(() => {
    const fetchData = async () => {
      await getNavList().then(res => {
        setNavList(res.data.data)
      })
    } 
    fetchData()
  }, [])
  const showIcon = (icon) => {
    switch(icon) {
      case 'HighlightOutlined':
        return <HighlightOutlined />
      case 'SmileOutlined':
        return <SmileOutlined />
      case 'CameraOutlined':
        return <CameraOutlined />
      default:
        return
    }
  }
  const handleMenuClick = (e) => {
    const key = e.key
    if(key === '0') {
      Router.push('/')
    } else {
      Router.push('/list?key=' + key)
    }
  }
  return (
    <div className="header">
      <Row justify="center">
        <Col xs={24} sm={24} md={10} lg={12} xl={12}>
          <span className="header_logo">惜乐园</span>
          <span className="header_txt">专注前端学习与生活吐槽。</span>
        </Col>
        <Col className="menu" xs={0} sm={0} md={14} lg={12} xl={10}>
          <Menu mode="horizontal" onClick={handleMenuClick}>
            <Menu.Item key="0">
              <HomeOutlined />
              首页
            </Menu.Item>
            {
              navList.map(item => {
                return (
                  <Menu.Item key={item.Id}>
                    {showIcon(item.icon)}
                    {item.type_name}
                  </Menu.Item>
                )
              })
            }
          </Menu>
        </Col>
      </Row>
    </div>
  )
}
