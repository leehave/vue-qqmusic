<template>
  <div class="tab">
    <router-link tag="div" class="tab-item" to="/recommend">
      <span class="tab-link">推荐</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/rank">
      <span class="tab-link">排行榜
      </span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/search">
      <span class="tab-link">搜索</span>
    </router-link>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .tab
    display: flex
    height: 44px
    line-height: 44px
    font-size: $font-size-medium
    background-color: $color-white
    .tab-item
      flex: 1
      text-align: center
      font-size: 16px
      height: 42px
      line-height: 42px
      overflow: hidden
      .tab-link
        padding-bottom: 5px
        color: $color-normal
      &.router-link-active
          border-bottom: 2px solid $color-theme
          .tab-link
            color: $color-theme
</style>
