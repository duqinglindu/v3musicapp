<template>
  <div class="recommend" v-loading="loading">
    <!-- 推荐页--首页 -->
    <scroll class="recommend-content">
      <div>
        <!-- 轮播图 -->
        <div class="slider-wrapper">
          <div class="slider-content">
            <slider v-if="sliders.length" :sliders="sliders"></slider>
          </div>
        </div>
        
        <!-- 歌单推荐 -->
        <SongListRecommend/>
        <!-- 榜单：时下正流行 -->
        <Popular/>
      </div>
    </scroll>
    <router-view v-slot="{ Component }">
      <transition appear name="slide">
        <component :is="Component" :data="selectedAlbum"/>
      </transition>
    </router-view>
  </div>
</template>

<script>
  import { getRecommend } from '@/service/recommend'
  // 轮播图
  import Slider from '@/components/base/slider/slider'
  import Scroll from '@/components/wrap-scroll'
  import Recommend from "@/components/recommend-list"

  import SongListRecommend from "@/components/songListRecommend"
  import Popular from "@/components/popular"

  export default {
    name: 'recommend',
    components: {
      Slider,
      Scroll,
      Recommend,
      SongListRecommend,
      Popular
    },
    data() {
      return {
        sliders: [],
        selectedAlbum: null
      }
    },
    computed: {
      loading() {
        return !this.sliders.length 
      }
    },
    async created() {
      const result = await getRecommend()
      this.sliders = result.sliders
    },
  }
</script>

<style lang="scss" scoped>
  .recommend {
    position: fixed;
    width: 100%;
    top: 88px;
    bottom: 0;
    overflow: scroll;
    .recommend-content {
      height: 100%;
      overflow: hidden;
      .slider-wrapper {
        position: relative;
        width: 100%;
        height: 0;
        padding-top: 40%;
        overflow: hidden;
        .slider-content {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
        }
      }
      .recommend-list {
        .list-title {
          height: 65px;
          line-height: 65px;
          text-align: center;
          font-size: $font-size-medium;
          color: $color-theme;
        }
        .item {
          display: flex;
          box-sizing: border-box;
          align-items: center;
          padding: 0 20px 20px 20px;

          .icon {
            flex: 0 0 60px;
            width: 60px;
            padding-right: 20px;
          }
          .text {
            display: flex;
            flex-direction: column;
            justify-content: center;
            flex: 1;
            line-height: 20px;
            overflow: hidden;
            font-size: $font-size-medium;
          }
          .name {
            margin-bottom: 10px;
            color: $color-text;
          }
          .title {
            color: $color-text-d;
          }
        }
      }
    }
  }
</style>
