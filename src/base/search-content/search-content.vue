<template>
    <div class="mod_search_bar" :class="{ 'search-focus': isFocus, 'search-showcase': type === 'query' }">
      <div class="search-box search_bar_cont">
        <form action="">
          <i class="iconfont icon-search"></i>
          <input ref="query"  v-refocus="focusStatus" type="text"
        @focus="handleFocus" class="box search_input" v-model="value" :placeholder="placeholder" :class="{'searchfield':isFocus}" />
          <span class="icon icon_delete" @click="handleClean" v-show="isFocus">删除</span>
        </form>
      </div>
      <span class="search_bar_tip_text" v-show="type !== 'query' && isFocus" @click="handleBack">取消</span>
  </div>
</template>

<script type="text/ecmascript-6">
  import {debounce} from '../../common/js/util'

  export default {
    name: 'search-content',
    props: {
      placeholder: {
        type: String,
        default: '搜索歌曲、歌单、专辑'
      },
      type: {
      type: String,
      default: 'normal'
    }
    },
    watch: {
    value(val) {
      this.$emit('change', val);
    }
  },
    data() {
      return {
        value: '',
        focusStatus: false,
        isFocus: false
      }
    },
    methods: {
      // clear() {
      //   this.query = ''
      // },
      setQuery(query) {
        this.query = query
      },
      // blur() {
      //   this.$refs.query.blur()
      // },
      /**
     * 进入input焦点，出现close和取消
     */
    handleFocus() {
      this.isFocus = true,
      this.query = '',
      this.$refs.query.blur()
    },
    /**
     * 点击close后清空vlaue后，再聚焦input框
     */
    handleClean() {
      this.value = '';
      this.focusStatus = true;
    },

    /**
     * 点击取消后，清空所有回复最初状态
     */
    handleBack() {
      this.value = '';
      this.isFocus = false;
      this.focusStatus = false;
      this.$emit('cancel');
    },

    /**
     * input输入回车后，发送回调
     */
    handleSearch() {
      this.$emit('search', this.value);
    }
    // created() {
    //   this.$watch('query', debounce((newQuery) => {
    //     this.$emit('query', newQuery)
    //   }, 200))
    // }
    },
    directives: {
    refocus: {
      update: function(el, state) {
        if (state.value) {
          el.focus();
        }
      }
    }
  },
  created() {
      this.$watch('query', debounce((newQuery) => {
        this.$emit('query', newQuery)
      }, 200))
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .search_bar_tip_text
      background: #f4f4f4
      padding: 10px
      display: -webkit-box
      -webkit-box-orient: horizontal
      -webkit-box-align: center
      color: $color-normal
  .search-box.search_bar_cont
    position: relative
    border-radius: 3px
    background: #fff
    height: 20px
    padding: 8px 12px 8px 35px
    -webkit-box-flex: 1
    .icon-search
      font-size: 18px
      color: #b1b1b1
      position: absolute
      top: 9px
      left: 10px
    .search_input
      height: 20px
      line-height: 20px
      width: 100%
      color: rgba(0,0,0,.7)
      border: none
      -webkit-appearance: none
      font-size: 14px
      &::placeholder
        color: #cecece
    .icon_delete
      position: absolute
      top: 9px
      right: 12px
      width: 18px
      height: 18px
      background: #b1b1b1
      text-indent: -9999px
      border-radius: 99px
      &::before,&::after
        content: ""
        display: block
        position: absolute
        left: 50%
        top: 50%
        border-radius: 8px
        background: #fff
        -webkit-transform: rotate(45deg)
        width: 10px
        height: 2px
        margin-left: -5px
        margin-top: -1px
      &::after
        width: 2px;
        height: 10px;
        margin-left: -1px;
        margin-top: -5px
    .icon-dismiss
      font-size: 16px
      color: $color-background
  .searchfield
    -webkit-appearance: searchfield
</style>
