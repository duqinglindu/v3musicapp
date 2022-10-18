<template>
<!-- 首页-歌单推荐 -->
  <div class="songList-container">
    <div class="header" @click="goSongList">
      <h3>歌单推荐</h3>
      <div>更多 &gt;</div>
    </div>
    
    <ul>
      <li v-for="item in albums" :key="item.id"
        @click="selectItem(item)"
      >
        <div class="img">
          <img v-lazy="item.pic" >
          <div class="mask " >
            <span class="iconfont icon-24gf-playCircle"></span>
            <span class="text">{{
              item.random
              }}万</span>
          </div>
        </div>
        <div class="text">
          {{item.title}}
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import { getRecommend } from '@/service/recommend'

import storage from 'good-storage'
import { ALBUM_KEY } from '@/assets/js/constant'

export default {
  name: 'recommend',
  data() {
    return {
      albums: [],
      selectedAlbum: null
    }
  },
  async created() {
    const result = await getRecommend()
    let resultObj= result.albums.slice(0,6)
    resultObj = resultObj.map(item=> {
      var random = Math.random()*100;
      random = random.toFixed(2)
      return {
        random,
        ...item,
      }
    })
    console.log(resultObj)
    this.albums = resultObj;
  },
  methods: {
    selectItem(album) {
      this.selectedAlbum = album
      this.cacheAlbum(album)
      this.$router.push({
        path: `/recommend/${album.id}`
      })
    },
    cacheAlbum(album) {
      storage.session.set(ALBUM_KEY, album)
    },
    goSongList() {
      this.$router.push({
        path: "/songList"
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "//at.alicdn.com/t/c/font_3704498_2h2abepkgp3.css";
  .songList-container{
    padding: 10px;
    padding-top: 20px;
  }
  .header{
    display: flex;
    justify-content: space-between;
    color: #ccc;
    padding: 5px 0;
  }
  h3{
    font-weight: bold;
    color: $color-text-l;
  }
  ul{
    padding-top: 10px;
    padding-bottom: 10px;;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
  li{
    width: 30%;
    margin-bottom: 10px;
    .img{
      position: relative;
      .mask{
        padding-left: 5px;
        display: flex;
        align-items: center;
        position: absolute;
        width: 100%;
        height: 30%;
        bottom: 0;
        left: 0;
        background-image: linear-gradient(to top, rgba(0,0,0,.5), transparent);
        .text{
          margin-left: 5px;
          color: #fff;
          font-size: 12px;
        }
      }
    }
    img{
      width: 100%;
    }
    .text{
      font-size: 14px;
      padding-top: 5px;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      color: rgb(206, 204, 204);
    }
  }
</style>