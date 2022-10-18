<template>
  <!-- 热门歌单 -->
  <div class="recommend-list">
    <ToBack title="热门歌单推荐"/>
    <ul> 
      <li
        v-for="item in albums"
        class="item"
        :key="item.id"
        @click="selectItem(item)"
      >
        <div class="icon">
          <!-- v-lazy:指令 -->
          <img width="60" height="60" v-lazy="item.pic">
        </div>
        <div class="text">
          <h2 class="name">
            {{ item.username }}
          </h2>
          <p class="title">
            {{item.title}}
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import { getRecommend } from '@/service/recommend'

  import storage from 'good-storage'
  import { ALBUM_KEY } from '@/assets/js/constant'
  import ToBack from "@/components/toBack"


  export default {
    name: 'recommend',
    data() {
      return {
        albums: [],
        selectedAlbum: null
      }
    },
    components: {
      ToBack,
    },
    async created() {
      const result = await getRecommend()
      this.albums = result.albums
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
      }
    }
  }
</script>

<style  lang="scss" scoped>

  .recommend-list {
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
</style>