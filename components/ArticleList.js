import React from 'react'
import { List } from 'antd'
import { CalendarOutlined, FolderOutlined, FireOutlined } from '@ant-design/icons'
import Link from 'next/link'

// 文章简介也支持代码高亮
import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'

import '../public/style/components/ArticleList.css'

export default function ArticleList(props) {
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
  return (
    <List
      header={props.header}
      itemLayout="vertical"
      dataSource={props.listData}
      renderItem={item => (
        <List.Item>
          <div className="list-title">
            <Link href={{
              pathname: '/detail',
              query: {id: item.Id}
            }}>
              <a>{item.title}</a>
            </Link>
          </div>
          <div className="list-subtitle">
            <span><CalendarOutlined />{item.add_time.split('T')[0]}</span>
            <span><FolderOutlined />{item.type_name}</span>
            <span><FireOutlined />{item.view_count}</span>
          </div>
          <div className="list-content" dangerouslySetInnerHTML={{__html: marked(item.introduce)}}></div>
        </List.Item>
      )}
    ></List>
  )
}
