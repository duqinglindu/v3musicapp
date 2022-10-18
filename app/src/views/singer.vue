<template>
  <div class="singer" v-loading="!singers.length">
    <!-- 歌手列表 -->
    <index-list
      :data="singers"
      @select="selectSinger"
    ></index-list>
    <!-- 歌手详情页 -->
    <router-view v-slot="{ Component }">
      <!-- 路由切换动画 -->
      <transition appear name="slide">
        <component :is="Component" :data="selectedSinger"/>
      </transition>
    </router-view>
  </div>
</template>

<script>
  import { getSingerList } from '@/service/singer'
  import IndexList from '@/components/index-list/index-list'
  import storage from 'good-storage'
  import { SINGER_KEY } from '@/assets/js/constant'

  export default {
    name: 'singer',
    components: {
      IndexList
    },
    data() {
      return {
        singers: [],
        selectedSinger: null
      }
    },
    async created() {
      const result = await getSingerList()
      this.singers = result.singers
    },
    methods: {
      selectSinger(singer) {
        this.selectedSinger = singer
        this.cacheSinger(singer)
        this.$router.push({
          path: `/singer/${singer.mid}`
        })
      },
      cacheSinger(singer) {
        // 缓存歌手详情资源
        storage.session.set(SINGER_KEY, singer)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .singer {
    position: fixed;
    width: 100%;
    top: 88px;
    bottom: 0;
  }
</style>
