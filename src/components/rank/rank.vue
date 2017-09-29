<template>
  <div class="mod_topic current_page loaded rank" ref="rank">
    <scroll :data="topList" class="toplist" ref="toplist">
      <ul>
        <li @click="selectItem(item)" class="item" v-for="item in topList">
          <div class="topic_media">
            <img width="100" height="100" v-lazy="item.picUrl"/>
            <span class="listen_count">
              <i class="icon icon_listen"></i>{{item.listenCount|playcount}}
            </span>
          </div>
          <div class="songlist">
            <h3 class="topic_tit">{{item.topTitle}}</h3>
            <div class="song" v-for="(song,index) in item.songList">
              <p>{{index + 1}}<span class="text_name">{{song.songname}}</span>-{{song.singername}}</p>
            </div>
            <i class="topic_arrow"></i>
          </div>
        </li>
      </ul>
      <div class="loading-container" v-show="!topList.length">
        <loading></loading>
      </div>
    </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
  import Scroll from '../../base/scroll/scroll'
  import Loading from '../../base/loading/loading'
  import {getTopList} from '../../api/rank'
  import {ERR_OK} from '../../api/config'
  import {playlistMixin} from '../../common/js/mixin'
  import {mapMutations} from 'vuex'
  export default {
    created() {
      this._getTopList()
    },
    data() {
      return {
        topList: []
      }
    },
    methods: {
      handlePlaylist(playlist) {
        const bottom = playlist.length > 0 ? '60px' : ''

        this.$refs.rank.style.bottom = bottom
        this.$refs.toplist.refresh()
      },
      selectItem(item) {
        this.$router.push({
          path: `/rank/${item.id}`
        })
        this.setTopList(item)
      },
      _getTopList() {
        getTopList().then((res) => {
          if (res.code === ERR_OK) {
            this.topList = res.data.topList
          }
        })
      },
      ...mapMutations({
        setTopList: 'SET_TOP_LIST'
      })
    },
    filters: {
			playcount(v) {
				if(!v) return "0";
        return v < 10e3 ? v : ((v / 10e3).toFixed(1) + '万')
        // return v >= 1e8 ? Math.floor(v / 1e7) / 10 + "亿" : v >= 1e5 ? Math.floor(v / 1e3) / 10 + "万" : v
			}
		},
    watch: {
      topList() {
        setTimeout(() => {
          this.$Lazyload.lazyLoadHandler()
        }, 20)
      }
    },
    components: {
      Scroll,
      Loading
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/minxin"

  .rank
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .toplist
      height: 100%
      overflow: hidden
      .item
        display: flex
        margin: 0 10px
        padding-top: 10px
        height: 100px
        &:last-child
          padding-bottom: 20px
        .topic_media
          flex: 0 0 100px
          width: 100px
          height: 100px
          position: relative
          .listen_count
            left: 5px
            bottom: 7px
            line-height: 12px
            color: #fff
            opacity: .6
            font-size: 9px
            z-index: 10
            position: absolute
            display: block
        .icon_listen
          display: block;
          float: left
          width: 10px
          height: 10px
          background-position: 0 -50px
          margin-right: 3px
        .topic_tit
          font-size: 16px
          color: $color-normal
          font-weight: normal
          margin-bottom: 5px
          line-height: 1.5
        .icon
          background-image: url(../../common/image/list_sprite.png)
          background-repeat: no-repeat
          background-size: 24px 60px
          z-index: 10
        .songlist
          flex: 1
          display: flex
          flex-direction: column
          justify-content: center
          padding: 0 10px 0 15px
          height: 100px
          overflow: hidden
          background: $color-white
          color: $color-normal
          font-size: $font-size-small
          position: relative
          -webkit-box-align: center
          -webkit-box-pack: center
          .text_name
             color: #000
             margin-left: 8px
             margin-right: 5px
             font-style: normal
         .topic_arrow
           position: absolute
           right: 10px
           top: 50%
           margin-top: -4px
           width: 6px
           height: 6px
           border-right: 1px solid #b2b2b2
           border-bottom: 1px solid #b2b2b2
           -webkit-transform: rotate(-45deg)
          .song p
            no-wrap()
            line-height: 20px
            font-size: $font-size-medium
            color: rgba(0,0,0,.5)
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>
