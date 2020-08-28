import axios from 'axios'

const isDev = process.env.NODE_ENV === 'development'

// ******************************************文章相关请求接口************************
const service = axios.create({
  baseURL: isDev ? 'http://localhost:7001' : ''
})

export const getAricleList = () => {
  return service.get('/default/getArticleList')
}

export const getArticleById = (id) => {
  return service.get('/default/getArticleById/' + id)
}

export const getNavList = () => {
  return service.get('/default/getNavList')
}

export const getListById = (id) => {
  return service.get('/default/getListById/' + id)
}


// **********************************音乐相关请求接口*************************
const musicService = axios.create({
  baseURL: 'https://autumnfish.cn'
})
// discovery页相关请求接口
export const getDiscoveryBanner = () => {
  return musicService.get('/banner')
}
export const getRecommandList = (num) => {
  return musicService.get('personalized/?limit=' + num)
}
export const getLastestSongsList = () => {
  return musicService.get('/personalized/newsong')
}
export const getLastestMvList = () => {
  return musicService.get('personalized/mv')
}

// 获取歌曲url接口
export const getSongsURl = (id) => {
  return musicService.get('/song/url/?id=' + id)
}

// 推荐歌单页面相关接口
// 精品歌单列表接口,limit为限制数据条数，type为歌单类型
export const getQualitySongsList = (limit, type) => {
  return musicService.get('/top/playlist/highquality', {
    params: {
      limit,
      cat: type
    }
  })
}
// 分类歌单列表接口
// limit为获取数据条数，offset为分页偏移数量，用于分页，如：（页数-1）*20，其中20为limit的值，cat为歌单的标签
export const getCatSongsList = (limit=10, offset=0, cat='全部') => {
  return musicService.get('/top/playlist', {
    params: {
      limit,
      offset,
      cat
    }
  })
}
