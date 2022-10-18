import { PLAY_MODE, SEARCH_KEY } from '@/assets/js/constant'
import { load } from '@/assets/js/array-store'

const state = {
  sequenceList: [], //顺序播放列表
  playlist: [],//正在播放的播放列表
  playing: false, //播放状态
  playMode: PLAY_MODE.sequence, //播放模式
  currentIndex: 0,//当前播放歌曲的索引
  fullScreen: false, //播放器的状态 全屏/收缩
  favoriteList: [],
  searchHistory: load(SEARCH_KEY),
  playHistory: []
}

export default state
