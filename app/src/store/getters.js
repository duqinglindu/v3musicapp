export const currentSong = (state) => {  //当前播放的歌曲
  return state.playlist[state.currentIndex] || {}
}
