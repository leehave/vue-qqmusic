<template>
  <div>
    <div class="recommend" ref="recommend">
    <div class="slider-container">
      <div v-if="recommends.length" class="slider-wrapper" ref="sliderWrapper">
        <slider>
          <div v-for="item in recommends">
            <a :href="item.linkUrl">
              <img class="needsclick" @load="loadImage" :src="item.picUrl">
            </a>
          </div>
        </slider>
      </div>
    </div>
    <div class="recommend-list mod_twocol_list mod_twocol_list_normal">
      <h2 class="list_title">电台</h2>
      <ul class="list_container">
        <li v-for="item in recomradio" class="item">
          <a href="" class="list_main">
            <div class="list_media">
              <img :src="item.picUrl">
              <span class="icon icon_play"></span>
            </div>
            <div class="list_info">
              <h2 class="list_tit tit_two_row" v-html="item.Ftitle"></h2>
            </div>
          </a>
        </li>
      </ul>
    </div>
  </div>
  <div class="mod_footer">
    <div class="footer_logo">QQ音乐</div>
    <p class="copyright">Copyright © 1998 - <span id="js_cpright_year">2017</span> Tencent. All Rights Reserved.</p>
    <p id="js_iosinfo" class="copyright" style="">联系电话：0755-86013388 QQ群：55209235</p>
  </div>
  </div>
</template>

<script type="text/ecmascript-6">
import Slider from '../../base/slider/slider'
import Loading from '../../base/loading/loading'
import { getRecommend } from '../../api/recommend'
import { ERR_OK } from '../../api/config'
import { mapMutations } from 'vuex'

export default {
  data() {
    return {
      recommends: [],
      recomradio: []
    }
  },
  created() {
    this._getRecommend()
  },
  methods: {
    loadImage() {
      if (!this.checkloaded) {
        this.checkloaded = true
      }
    },
    _getRecommend() {
      getRecommend().then((res) => {
        if (res.code === ERR_OK) {
          this.recommends = res.data.slider,
            this.recomradio = res.data.radioList
        }
      })
    }
  },
  components: {
    Slider,
    Loading
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/minxin.styl";
  .slider-container
    position: relative
    margin-bottom: 14px
  .recommend
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        overflow: hidden
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
  .mod_twocol_list_normal
    margin-bottom: 7px
  .mod_twocol_list
    margin-left: 10px;
    margin-right: 10px
    .list_title
      font-size: 16px;
      color: $color-normal;
      margin-bottom: 11px;
      font-weight: normal
    .list_container
      overflow: hidden;
      margin-right: -8px
    li
      float: left;
      width: 50%;
      -webkit-box-sizing: border-box;
      padding-right: 8px;
      margin-bottom: 10px;
      overflow: hidden
      .list_main
        display: block;
        background: #fff
      .list_info
        padding: 0 7px 5px;
        color: $color-normal
      .list_media
        position: relative;
        margin-bottom: 5px
        &::before
          content: "";
          display: block;
          padding-top: 100%
        .icon_play
          height: 24px
          bottom: 5px
          right: 5px
          width: 24px
          background-position: 0 0
          position: absolute
          display: block
          z-index: 10
          background-image: url(../../common/image/list_sprite.png);
          background-repeat: no-repeat;
          background-size: 24px 60px
      .list_tit,.list_text
        white-space: nowrap
        overflow: hidden
        text-overflow: ellipsis
        font-weight: normal
        font-size: $font-size-small
        height: 36px;
        line-height: 18px
        white-space: normal
        word-wrap: break-word
        font-size :$font-size-medium
      img
        position: absolute
        top: 0
        left: 0
        display: block
        width: 100%
        z-index: 1
  .mod_footer
    padding: 15px 0
    .footer_logo
      display: block
      width: 82px
      height: 24px
      margin: 0 auto 10px
      background-image: url(../../common/image/logo_footer.png)
      background-repeat: no-repeat
      background-size: cover
      text-indent: -9999px
    .copyright
      font-size: 10px
      text-align: center
      color: $color-normal
      font-style:normal
      line-height: 1.5

</style>
