<template>
  <div class="popular">
    <div class="header" @click="goSongList">
      <h3>榜单：时下正流行</h3>
      <div>更多 &gt;</div>
    </div>
    <ul>
        <li
          class="item"
          v-for="item in topList"
          :key="item.id"
          @click="selectItem(item)"
        >
          <div class="icon">
            <img
              width="100"
              height="100"
              v-lazy="item.pic"
            />
          </div>
          <ul class="song-list">
            <li
              class="song"
              v-for="(song, index) in item.songList"
              :key="song.id">
              <span>{{index + 1}}. </span>
              <span>{{song.songName}}-{{song.singerName}}</span>
            </li>
          </ul>
        </li>
      </ul>
  </div>
</template>
<script>
  import { getTopList } from '@/service/top-list'
  import { TOP_KEY } from '@/assets/js/constant'
  import storage from 'good-storage'

export default{
    data() {
      return {
        topList: [],
        selectedTop: null
      }
    },
    async created() {
      const result = await getTopList()
      this.topList = result.topList.slice(0,2)
    },
    methods: {
      selectItem(top) {
        this.selectedTop = top
        this.cacheTop(top)
        this.$router.push({
          path: `/top-list/${top.id}`
        })
      },
      cacheTop(top) {
        storage.session.set(TOP_KEY, top)
      },
      goSongList() {
        this.$router.push({
          path: "/top-list"
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
.popular{
  padding: 0 10px;
}
  .header{
    display: flex;
    justify-content: space-between;
    color: #ccc;
    padding: 5px 0;
  }
  .item {
        display: flex;
        /* margin: 0 20px; */
        padding-top: 20px;
        height: 100px;
        &:last-child {
          padding-bottom: 20px;
        }
        .icon {
          flex: 0 0 100px;
          width: 100px;
          height: 100px;
        }
        .song-list {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 0 20px;
          height: 100px;
          overflow: hidden;
          background: $color-highlight-background;
          color: $color-text-d;
          font-size: $font-size-small;
          .song {
            @include no-wrap();
            line-height: 26px;
          }
        }
      }
</style>