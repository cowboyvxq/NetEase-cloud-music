<template>
  <div class="recommend" v-if="detail">
    <!-- 点击返回icon -->
    <svg
      @click="$router.go(-1)"
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="25"
      fill="#666"
      class="left-arrow"
      viewBox="0 0 16 16"
    >
      <path
        fill-rule="evenodd"
        d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
      />
    </svg>
    <div class="play-list-hd">
      <img class="hd-bg" :src="detail.coverImgUrl" alt="" />
      <div class="left">
        <img :src="detail.coverImgUrl" alt="" />
        <span class="song-menu">歌单</span>
        <div class="heat">{{ detail.playCount | playCount }}</div>
      </div>
      <div class="right">
        <p class="title">{{ detail.name }}</p>
        <p class="avatar">
          <img :src="detail.creator.avatarUrl" alt="" />
          <span class="avatar-text">{{ detail.creator.nickname }}</span>
        </p>
      </div>
    </div>
    <ul>
      <NewestList
        v-for="(item, index) in detail.tracks"
        :key="item.id"
        :item="item"
        :playing="playing"
        @changeCurrent="
          $emit('changeCurrentSong', $event);
          $emit('change-play-list', detail.tracks);
        "
        :class="{ colour: index < 3 }"
        :currentId="currentSongId"
        >{{ (index + 1).toString().padStart(2, "0") }}</NewestList
      >
    </ul>
    <PlayListRemark :currentSongId="currentSongId"></PlayListRemark>
  </div>
</template>

<script>
// 歌单评论组件
import PlayListRemark from "../views/PlayListRemark.vue";
import NewestList from "../views/NewestList.vue";
export default {
  components: {
    NewestList,
    PlayListRemark,
  },
  props: {
    currentSongId: {
      type: Number,
    },
    playing: Boolean,
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
  data() {
    return {
      detail: null,
    };
  },
  methods: {
    getAjax(id) {
      this.axios
        .get("http://apis.netstart.cn/music/playlist/detail", {
          params: {
            id,
          },
        })
        .then((res) => {
          this.detail = res.data.playlist;
          // console.log(res.data);
        });
    },
  },
  watch: {},
  created() {
    this.getAjax(this.$route.query.id);
  },
};
</script>
<style lang="less" scoped>
.recommend {
  svg {
    position: absolute;
    top: 6px;
    left: 0px;
    z-index: 100;
    &::before {
      content: "";
      position: absolute;
      top: -10px;
      left: -10px;
      right: -10px;
      bottom: -10px;
    }
  }
  .play-list-hd {
    height: 200px;
    padding: 25px 0 0 20px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-around;
    position: relative;
    overflow: hidden;
    .hd-bg {
      position: absolute;
      left: 0;
      top: 0;
      z-index: -1;
      width: 100%;
      height: 300%;
    }
    .left {
      width: 145px;
      height: 145px;
      position: relative;
      img {
        width: 100%;
        height: 100%;
      }
      &::after {
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
      .heat {
        height: 25px;
        line-height: 25px;
        position: absolute;
        top: 5px;
        right: 7px;
        text-align: right;
        z-index: 12;
        color: #fff;
        // background: url(../../dist/img/music-logo.svg) no-repeat left center;
        background-size: 15px 15px;
        padding-left: 20px;
        font-size: 14px;
      }
      padding-right: 5px;
      .song-menu {
        position: absolute;
        top: 5px;
        left: 0;
        color: #fff;
        font-size: 12px;
        background: #b62e2f;
        padding: 3px 8px;
        border-radius: 0 20px 20px 0;
      }
    }
    .right {
      padding-left: 10px;
      flex: 1;
      .avatar {
        height: 30px;
        display: flex;
        align-items: center;
        img {
          width: 30px;
          height: 30px;
          border-radius: 50%;
        }
        .avatar-text {
          font-size: 15px;
          color: #e2e1e1;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          display: inline-block;
          width: 130px;
          margin-left: 10px;
        }
      }
      .title {
        color: #fff;
        margin-bottom: 10px;
      }
    }
  }
}
</style>
 