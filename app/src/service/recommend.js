import { get } from './base'

export function getRecommend() {
  // 包含轮播图数据，以及热门歌单数据
  return get('/api/getRecommend')
}

export function getAlbum(album) {
  return get('/api/getAlbum', {
    id: album.id
  })
}
