<template>
  <div class="m-header">
    <i class="logo"></i>
    <router-link tag="div" class="mine" to="/user">
      <i class="iconfont icon-user"></i>
    </router-link>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/minxin"
  @import "~common/stylus/icon"
  .m-header
    position: relative
    height: 44px
    text-align: center
    background-color: $color-header
    font-size: 0
    .logo
      float: left;
      display: block;
      width: 90px;
      height: 25px;
      margin: 9px 0 0 10px;
      background-image: url(../../common/image/logo.png);
      background-size: cover;
      background-repeat: no-repeat;
      text-indent: -9999px
    .text
      display: inline-block
      vertical-align: top
      line-height: 44px
      font-size: $font-size-large
    .mine
      position: absolute
      top: 0
      right: 0
      .icon-user
        display: block
        padding: 12px
        font-size: 20px
        color: $color-text
</style>
