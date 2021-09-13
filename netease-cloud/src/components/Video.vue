<template>
  <div class="video">
    
    <p class="v-title">
      <span>热门视频</span>
    </p>
    <div class="list">
      <div class="v-item" v-for="item in vlist" :key="item.id">
        <div class="v-content">
          <img :src="item.cover" alt="" />
          <img
            class="play-btn"
            @click="playVideo(item.id)"
            src="../assets/play.png"
            alt=""
          />
        </div>
        <p class="v-name">{{ item.name }}</p>
      </div>
    </div>
    <transition
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeDown"
    >
    <div class="v-mask" @click="flsh=false" v-if="flsh">
      <video :src="vUrl" autoplay controls></video>
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
    </div>
    </transition>
  </div>
</template>

<script>
export default {
  props:{
    state:String
  },
  data() {
    return {
      vlist: [],
      vUrl: "",
      flsh:false
    };
  },
  created() {
    this.axios.get("http://apis.netstart.cn/music/mv/first").then((res) => {
      this.vlist = res.data.data;
    });
  },
  methods: {
    // 点击mv获取播放地址
    playVideo(id) {
      this.axios
        .get("http://apis.netstart.cn/music/mv/url", {
          params: {
            id,
          },
        })
        .then((res) => {
          this.vUrl = res.data.data.url;
          this.flsh = true;
          this.state.pause();
        });
    },
  },
};
</script>

<style lang='less'>
.video {
  .goback {
    position: absolute;
    top: 10px;
    left: 10px;
  }
  .v-title {
    height: 50px;
    line-height: 50px;
    font-size: 20px;
    span {
      color: rgb(214, 16, 214);
      border-left: solid red 2px;
      padding-left: 10px;
    }
  }
  .list {
    display: flex;
    justify-content: space-around;
    align-content: center;
    flex-wrap: wrap;
    .v-item {
      width: 45%;
      height: 150px;
      position: relative;
      border-radius: 10px;
      margin-bottom: 15px;
      overflow: hidden;
      .v-content {
        width: 100%;
        height: 100%;
        border-radius: 10px;
        position: relative;
        img {
          width: 100%;
          height: 100%;
          border-radius: 10px;
        }
        .play-btn {
          width: 60px;
          height: 60px;
          position: absolute;
          right: 0;
          bottom: 0;
          left: 0;
          top: 0;
          margin: auto;
        }
      }
      .v-name {
        width: 100%;
        height: 35px;
        line-height: 35px;
        font-size: 14px;
        color: #fff;
        background: rgba(181, 182, 181, 0.4);
        text-align: center;
        position: absolute;
        bottom: 0;
        left: 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
  .v-mask {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.9);
    z-index: 339;
    video {
      width: 100%;
      height: 300px;
      position: absolute;
      right: 0;
      bottom: 0;
      top: 0;
      left: 0;
      margin: auto;
      z-index: 3;
    }
    svg {
      position: absolute;
      top: 10px;
      left: 10px;
    }
  }
}
</style>