<template>
  <div class="wrapper animate__animated animate__fadeInLeft">
    <div class="compile">编辑推荐</div>
    <div class="compile-content">
      <ul class="edit-list">
        <li
          v-for="item in dataArr"
          :key="item.id"
          @click="$router.push('/playlist?id=' + item.id)"
        >
          <div class="pic">
            <img :src="item.picUrl" alt="animate__animated animate__fadeIn" />
            <div class="heat">{{ item.playCount | playCount }}</div>
          </div>
          <p class="caption">{{ item.name }}</p>
        </li>
      </ul>
    </div>
    <div class="newest">最新音乐</div>
    <ul class="newest-content">
      <NewestList
        v-for="item in newRes"
        :key="item.id"
        :item="item"
        :newRes="newRes"
        :currentId="currentSongId"
        :playing="playing"
        @changeCurrent="
          $emit('changeCurrentSong', $event);
          $emit('change-play-list', newRes);
        "
      ></NewestList>
    </ul>
  </div>
</template>

<script>
import NewestList from "../views/NewestList";
export default {
  components: {
    NewestList,
  },
  props: {
    currentSongId: {
      type: Number,
    },
    playing: Boolean,
  },

  data() {
    return {
      dataArr: [],
      newRes: [],
    };
  },
  filters: {
    playCount(value) {
      if (value > 100000000) {
        return (value / 100000000).toFixed(1) + "亿";
      } else if (value > 10000) {
        return (value / 10000).toFixed(1) + "万";
      }
    },
  },
  created() {
    // 发起ajax 是因为 这里最早可以 访问this
    this.axios
      .get("http://apis.netstart.cn/music/personalized?limit=6")
      .then((res) => {
        this.dataArr = res.data.result;
      });
    // 获取最新音乐的数据
    this.axios
      .get("http://apis.netstart.cn/music/personalized/newsong")
      .then((res) => {
        this.newRes = res.data.result;
        // console.log(res.data.result);
      });
  },
  methods: {},
  watch: {},
};
</script>
<style scoped>
.compile,
.newest {
  height: 17px;
  line-height: 17px;
  padding-left: 9px;
  border-left: solid red 2px;
  margin: 14px 0 9px;
  color: #f80994;
}

ul.edit-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

ul.edit-list li {
  width: calc(100% / 3 - 3px);
  box-sizing: border-box;
  position: relative;
  margin-bottom: 15px;
}

ul.edit-list li .heat {
  height: 25px;
  line-height: 25px;
  position: absolute;
  top: 0;
  right: 0;
  text-align: right;
  z-index: 12;
  color: #fff;
  /* background: url(../../dist/img/music-logo.svg) no-repeat left center; */
  background-size: 15px 15px;
  padding-left: 20px;
  font-size: 14px;
  padding-right: 5px;
}

@media (min-width: 768px) {
  ul.edit-list li .pic {
    height: 385px !important;
  }
}
ul.edit-list li .pic {
  height: 135px;
}

ul.edit-list li .pic::after {
  content: " ";
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 20px;
  z-index: 2;
  background-image: -webkit-linear-gradient(
    top,
    rgba(0, 0, 0, 0.2),
    rgba(0, 0, 0, 0)
  );
  background-image: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.2),
    rgba(0, 0, 0, 0)
  );
}

ul.edit-list li .pic img {
  width: 100%;
  height: 100%;
}

ul.edit-list li .caption {
  font-size: 13px;
  color: #333;
  height: 36px;
  line-height: 18px;
  margin: 5px;
  word-break: break-all;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}

.ftwrap {
  height: 200px;
  /* background: #fff url(../../dist/img/home_bg_2x.png) no-repeat; */
  padding-top: 40px;
}

.ftwrap svg {
  display: block;
  width: 250px;
  height: 40px;
  margin: 10px auto 15px;
}

.ftwrap .open-app {
  width: 82%;
  height: 40px;
  line-height: 40px;
  font-size: 18px;
  text-align: center;
  border: solid red 1px;
  margin: 10px auto 5px;
  border-radius: 30px;
  color: #d33a31;
}

.ftwrap .copy {
  font-size: 12px;
  transform: scale(0.8);
  text-align: center;
  font-family: Arial, Helvetica, sans-serif;
  display: block;
}
</style>
