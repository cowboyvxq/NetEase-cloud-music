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
        <video :src="item.mvurl"></video>
      </div>
      <div class="mv-name">{{ item.name }}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mvlists: [],
      offset: 0, //页码
      flag: true,
      playNum: null, //对应播放视频下标
      id: "",
    };
  },
  created() {
    this.axios
      .get("http://apis.netstart.cn/music/mv/exclusive/rcmd")
      .then((res) => {
        this.mvlists = res.data.data;
        console.log(this.mvlists);
      });
  },
  methods: {},
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
      .cover {
        width: 100%;
        height: 100%;
      }
    }
    .mv-name {
      padding: 5px 10px;
      color: rgb(122, 118, 118);
    }
  }
}
</style>