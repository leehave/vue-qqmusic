<template>
  <div class="search">
    <div class="search_box current_page loaded">
      <search-content ref="search-content"></search-content>
  </div>
  <!-- hot search -->
  <div ref="shortcutWrapper" class="shortcut-wrapper" >   <!--v-show="!query"-->
    <scroll :refreshDelay="refreshDelay" ref="shortcut" class="shortcut" :data="shortcut">
        <div>
          <div class="hot-key mod_search_result">
            <h1 class="result_tit">热门搜索</h1>
            <ul class="result_tags">
              <li class="tag_s tag_hot"><span>{{special_key}}</span></li>
              <li @click="addQuery(item.k)" class="item js_keyword tag_s" v-for="item in hotKey">
                <span>{{item.k}}</span>
              </li>
            </ul>
          </div>
          <!-- <div class="search-history" v-show="searchHistory.length">
            <h1 class="title">
              <span class="text">搜索历史</span>
              <span @click="showConfirm" class="clear">
                <i class="icon-clear"></i>
              </span>
            </h1>
            <search-result @delete="deleteSearchHistory" @select="addQuery" :searches="searchHistory"></search-result>
          </div> -->
        </div>
    </scroll>
    </div>
    <!-- <div class="search-result" v-show="query" ref="searchResult">
      <searchList @listScroll="blurInput" @select="saveSearch" ref="search-list" :query="query"></searchList>
    </div> -->
  </div>
</template>

<script type="text/ecmascript-6">
  import SearchContent from '../../base/search-content/search-content'
  import { getHotKey } from '../../api/search'
  // import SearchList from '../search-list/search-list'
  // import SearchResults from '../../base/search-result/search-result'
  import {ERR_OK} from '../../api/config'
  // import {searchMixin} from '../../common/js/mixin'
  import Scroll from '../../base/scroll/scroll'
  import {mapActions} from 'vuex'
  export default {
    // mixins: [searchMixin],
    data() {
      return{
        hotKey: [],
        special_key:[]
      }
    },
    computed: {
      shortcut() {
        return this.hotKey.concat(this.searchHistory)
      }
    },
    created() {
      this._getHotKey()
    },
    methods: {
      // handlePlaylist(playlist) {
      //   const bottom = playlist.length > 0 ? '60px' : ''

      //   this.$refs.searchResult.style.bottom = bottom
      //   this.$refs.search-list.refresh()

      //   this.$refs.shortcutWrapper.style.bottom = bottom
      //   this.$refs.shortcut.refresh()
      // },
       _getHotKey() {
        getHotKey().then((res) => {
          if (res.code === ERR_OK) {
            this.hotKey = res.data.hotkey.slice(0, 10),
            this.special_key = res.data.special_key
          }
        })
      },
      ...mapActions([
        'clearSearchHistory'
      ])
    },
    watch: {
      query(newQuery) {
        if (!newQuery) {
          setTimeout(() => {
            this.$refs.shortcut.refresh()
          }, 20)
        }
      }
    },
    components: {
      SearchContent,
      // SearchList,
      // SearchResults,
      Scroll
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .mod_search_bar
    background: #f4f4f4
    padding: 10px
    display: -webkit-box
    -webkit-box-orient: horizontal
    -webkit-box-align: center
    input[type="text"]
      -webkit-appearance: searchfield
      box-sizing: border-box
  .mod_search_result
    background: #fff
    padding: 15px 15px 10px 15px
    .result_tit
      color: rgba(0,0,0,.6)
      margin-bottom: 8px
    .result_tags
      font-size: 0
    .tag_s
      display: inline-block
      font-size: 14px
      padding: 0 10px
      height: 30px
      line-height: 30px
      color: #000
      border: 1px solid rgba(0,0,0,.6)
      border-radius: 99px
      word-break: keep-all
      margin-bottom: 10px
      margin-right: 14px
    .tag_hot
      color: #fc4524
      border-color: #fc4524
</style>
