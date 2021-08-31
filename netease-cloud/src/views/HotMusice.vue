<template>
  <!-- 热歌榜 -->
  <div class="wrapper animate__animated animate__fadeInUp">
    <div class="hotMusic-hd">
      <div class="headline">
        <div class="hot-text"></div>
        <p class="date">更新日期: <span>8月26日</span></p>
      </div>
    </div>
    <ul>
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
      hsAraay:[]
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
    // let _this = this;
    //async  和 await
    //头部
    // async function hsList() {
    //   await _this
    //     .getData("playlist/detail", "get", { id: 3778678 })
    //     .then((res) => {
    //       if (res.code == 200) {
    //         // console.log(res.playlist.coverImgUrl);
    //         let arr = [];
    //         // 循环需要的数据

    //         arr.push({
    //           url: res.playlist.coverImgUrl,
    //           name: res.playlist.name,
    //           id: res.playlist.id,
    //           uTime: res.playlist.updateTime,
    //         });
    //         // 处理更新时间
    //         let date = new Date(arr[0].uTime);
    //         let getMonth = date.getMonth();
    //         let getDate = date.getDate();
    //         if (getMonth < 10) {
    //           getMonth = "0" + (getMonth + 1) + "月";
    //         } else {
    //           getMonth = getMonth + 1 + "月";
    //         }
    //         if (getDate < 10) {
    //           getDate = "0" + getDate + "日";
    //         } else {
    //           getDate = getDate + "日";
    //         }
    //         arr[0].uTime = getMonth + getDate;
    //         // console.log(arr[0].uTime);
    //         // 把处理之后的数据赋值hsAraay
    //         _this.hsAraay = arr[0];
    //         console.log(_this.hsAraay);
    //       }
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    //  }
    // hsList();
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
  background: url("../../dist/img/hot_music_bg_3x.jpg") no-repeat;
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
      background: url("../../dist/img/index_icon_2x.png") no-repeat -23px -29px;
      background-size: 166px 97px;
    }
  }
}
</style>