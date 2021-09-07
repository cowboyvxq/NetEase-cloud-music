<template>
  <!-- 热歌榜 -->
  <div class="wrapper">
    <div class="hotMusic-hd">
      <div class="headline">
        <div class="hot-text"></div>
        <p class="date">更新日期: <span>8月26日</span></p>
      </div>
    </div>
    <ul>
      <transition-group
        enter-active-class="animate__animated animate__fadeIn"
        leave-active-class="animate__animated animate__fadeDown"
      >
        <NewestList
          v-for="(item, index) in hotDada"
          :key="item.id"
          :item="item"
          @changeCurrent="
            $emit('changeCurrentSong', $event);
            $emit('change-play-list', hotDada);
          "
          :currentId="currentSongId"
          :playing="playing"
        >
          {{ (index + 1).toString().padStart(2, "0") }}
        </NewestList>
      </transition-group>
    </ul>
  </div>
</template>

<script>
import NewestList from "../views/NewestList.vue";
export default {
  components: {
    NewestList,
  },
  props: {
    currentSongId: Number,
    playing: Boolean,
  },
  data() {
    return {
      hotDada: [],
      hsAraay: [],
    };
  },
  computed: {},
  created() {
    this.axios
      .get("http://apis.netstart.cn/music/playlist/detail?id=3778678")
      .then((res) => {
        this.hotDada = res.data.playlist.tracks;
        // console.log(res.data);
      });
    // 定义_this 记录当前函数作用域的this
  },

  methods: {
    // 编写方法获取数据
    getData(url, type, data) {
      if (type == "get") {
        return this.axios.get(url, { params: data });
      } else if (type == "post") {
        return this.axios.post(url, data);
      } else {
        return this.axios({
          url: url,
          method: type,
        });
      }
    },
  },
  watch: {},
};
</script>
<style lang="less" scoped>
.hotMusic-hd {
  background: url("../assets/hot_music_bg_2x.jpg") no-repeat;
  background-size: 100%;
  .headline {
    padding: 25px;
    height: 150px;
    box-sizing: border-box;
    .date {
      font-size: 12px;
      color: rgb(66, 65, 65);
      span {
        color: rgb(199, 197, 197);
      }
    }
    .hot-text {
      height: 74px;
      width: 142px;
      background: url("../assets/index_icon_2x.png") no-repeat -23px -29px;
      background-size: 166px 97px;
    }
  }
}
</style>