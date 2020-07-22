import React from 'react'
import {
  Avatar, 
  Tag,
  Divider
} from 'antd'
import { GithubOutlined, WechatOutlined, QqOutlined } from '@ant-design/icons'
import '../public/style/components/Intro.css'

export default function Intro() {
  return (
    <div className="author-div comm-box">
      <Avatar src="head.jpg" size={100} className="avatar"></Avatar>
      <div>最爱旧歌</div>
      <div className="author-introduction">专注前端开发和抬杠</div>
      <div>
        <Tag color="magenta">前端攻城狮</Tag>
        <Tag color="green">Mojido</Tag>
        <Tag color="cyan">资深初学者</Tag>
        <Tag color="blue">懒癌晚期</Tag>
        <Tag color="geekblue">不运动会死</Tag>
      </div>
      <Divider>来找我吧</Divider>
      <div>
        <Avatar icon={<GithubOutlined />} className="account" size={20}></Avatar>
        <Avatar icon={<WechatOutlined />} className="account" size={20}></Avatar>
        <Avatar icon={<QqOutlined />} className="account" size={20}></Avatar>
      </div>
    </div>
  )
}
