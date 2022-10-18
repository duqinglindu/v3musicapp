<template>
  <m-header></m-header>
  <!-- 导航组件 -->
  <tab v-if="show"></tab>
  <router-view :style="viewStyle" v-slot="{ Component }">
    <keep-alive exclude="login">
      <component :is="Component"/>
    </keep-alive>
  </router-view>

  <router-view
    :style="viewStyle"
    name="user"
    v-slot="{ Component }"
  >
    <transition appear name="slide">
      <keep-alive>
        <component :is="Component"/>
      </keep-alive>
    </transition>
  </router-view>
  
  <!-- 播放器 -->
  <player></player>
</template>

<script>
  import Header from '@/components/header/header'
  import Tab from '@/components/tab/tab'
  import Player from '@/components/player/player'
  import { mapState } from 'vuex'

  export default {
    data() {
      return {
        show: true
      }
    },
    components: {
      Player,
      MHeader: Header,
      Tab
    },
    computed: {
      viewStyle() {
        const bottom = this.playlist.length ? '60px' : '0'
        return {
          bottom
        }
      },
      ...mapState([
        'playlist'
      ])
    },
    watch: {
      $route() {
        var list = ["/songList", "/set","/login","/userEdit",
      "/clear", "/register"];
        this.show = !list.includes(this.$route.path)
      }
    }

  }
</script>
