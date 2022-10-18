<template>
  <div class="header">
    <router-link class="mine iconfon" to="/set">
      <i class="iconfont icon-shezhi"></i>
    </router-link>
    <span class="icon"></span>
    <h1 class="text">Chicken Music</h1>
    <router-link class="mine" to="/user">
      <i class="icon-mine"></i>
    </router-link>
  </div>
</template>

<script>
  export default {
    name: 'm-header'
  }
</script>

<style lang="scss" scoped>
@import url("//at.alicdn.com/t/font_2275724_nmv9bxbmtp.css");

  .header {
    height: 44px;
    text-align: center;
    color: $color-theme;
    font-size: 0;
    .icon {
      display: inline-block;
      vertical-align: top;
      margin-top: 6px;
      width: 30px;
      height: 32px;
      margin-right: 9px;
      @include bg-image('logo');
      background-size: 30px 32px;
    }
    .text {
      display: inline-block;
      vertical-align: top;
      line-height: 44px;
      font-size: $font-size-large;
    }
    .mine {
      position: absolute;
      top: 0;
      right: 0;
      .icon-mine, .iconfont {
        display: block;
        padding: 12px;
        font-size: $font-size-large-x;
        color: $color-theme;
      }
      &.iconfon{
        left: 0;
        right: auto;
        .iconfont{
          font-size: 28px;
        }
      }
    }
  }
</style>
