<template>
  <div class="container">
    <div
      class="back"
      @click="goBack"
    >
      <i class="icon-back"></i>
    </div>
    <h1 class="title">
      {{title}}
    </h1>
  </div>
</template>

<script>

export default{
  props: {
    title:String
  },
  methods:{
    goBack() {
        this.$router.back()
      },
  },
}

</script>

<style lang="scss" scoped>
  .container{
    display: flex;
    justify-content: center;
    position: relative;
    margin-bottom: 5px;
  }
  .back{
    position: absolute;
    top: 50%;
    left:0;
    padding: 0 10px;
    transform: translateY(-50%);
    .icon-back{
      font-size: $font-size-large-x;
        color: $color-theme;
    }
  }
  .title{
    height: 40px;
    font-weight: bold;
    line-height: 40px;
    text-align: center;
    /* font-size: $font-size-medium; */
    color: $color-theme;
  }
</style>