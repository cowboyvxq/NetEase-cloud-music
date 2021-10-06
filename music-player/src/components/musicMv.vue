<template>
  <div class="mv-box">
    <p class="title">
      最新MV
      <svg
        @click="$router.go(-1)"
        xmlns="http://www.w3.org/2000/svg"
        width="25"
        height="25"
        fill="#ccc"
        class="bi bi-chevron-left"
        viewBox="0 0 16 16"
      >
        <path
          fill-rule="evenodd"
          d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
        />
      </svg>
    </p>
    <div class="mv-items" v-for="item in mvlists" :key="item.id">
      <div class="mv-content">
        <img class="cover" :src="item.cover" alt="" />
        <img
          class="playmv"
          @click="getMvUrl(item.id)"
          src="../assets/play.png"
          alt=""
        />
      </div>
      <div class="mv-name">{{ item.name }}</div>
    </div>
    <transition
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut"
    >
      <div class="mv-mask" @click="flag = false" v-if="flag">
        <svg
          @click="$router.go(-1)"
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          fill="#ccc"
          class="bi bi-chevron-left"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
          />
        </svg>
        <video :src="mvUrl" autoplay controls></video>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mvlists: [],
      offset: 0, //页码
      flag: false,
      playNum: null, //对应播放视频下标
      id: "",
      mvUrl: "",
    };
  },
  created() {
    this.axios
      .get("http://apis.netstart.cn/music/mv/exclusive/rcmd")
      .then((res) => {
        this.mvlists = res.data.data;
        // console.log(this.mvlists);
      });
  },
  methods: {
    // 点击mv获取播放地址
    getMvUrl(id) {
      this.axios
        .get("http://apis.netstart.cn/music/mv/url", {
          params: {
            id,
          },
        })
        .then((res) => {
          this.mvUrl = res.data.data.url;
          // console.log(this.mvUrl);
          this.flag = true;
        });
    },
  },
};
</script>

<style lang="less">
.mv-box {
  padding-top: 40px;
  @media (min-width: 600px) {
    .mv-items {
      width: calc(100% / 3 - 20px);
      float: left;
      margin-right: 20px;
      margin-top: 20px;
      &:nth-child(3n + 1) {
        margin-right: 0;
      }
      &:nth-child(3n + 2) {
        margin-left: 10px;
      }
    }
  }
  .title {
    width: 100%;
    height: 40px;
    line-height: 40px;
    background-color: #f33a31;
    text-align: center;
    font-size: 20px;
    color: #fff;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Courier New", Courier, monospace;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 8;
    svg {
      position: absolute;
      left: 6px;
      top: 6px;
      &::before {
        content: "";
        position: absolute;
        top: -10px;
        left: -10px;
        right: -10px;
        bottom: -10px;
      }
    }
  }
  .mv-items {
    margin-bottom: 20px;
    height: 250px;
    .mv-content {
      height: 200px;
      position: relative;
      video {
        position: absolute;
        width: 200px;
        height: 200px;
        top: 0;
        left: 0;
        border: solid red 2px;
      }
      .cover {
        width: 100%;
        height: 100%;
      }
      .playmv {
        width: 60px;
        height: 60px;
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        margin: auto;
        z-index: 4;
      }
    }
    .mv-name {
      padding: 5px 10px;
      color: rgb(122, 118, 118);
    }
  }
  .mv-mask {
    position: fixed;
    width: 100vw;            
    height: 100vh;
    top: 0;
    left: 0;
    background-color: black;
    z-index: 500;
    video {
      width: 100%;
      height: 300px;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
    }
    svg {
      margin: 10px 7px;
    }
  }
}
</style>