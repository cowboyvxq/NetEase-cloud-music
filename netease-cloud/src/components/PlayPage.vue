<template>
  <div
    class="play-page animate__animated animate__slideInUp"
    v-show="showPlayPage"
  >
    <!-- 背景遮罩层 -->
    <div
      class="play-mask"
      :style="{
        backgroundImage: `url(${
          currentSong.song ? currentSong.picUrl : currentSong.al.picUrl
        }?imageView=1&type=webp&thumbnail=246x0)`,
      }"
    ></div>
    <svg
      @click="$emit('closer')"
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      fill="#f00"
      class="bi bi-chevron-left"
      viewBox="0 0 16 16"
    >
      <path
        fill-rule="evenodd"
        d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
      />
    </svg>
    <!-- 光盘盒子 -->
    <div class="compact-disc" @click="$emit('playingStatus')">
      <!-- 播放摆动杆 -->
      <div class="play-bar">
        <img
          src="../../dist/img/needle-ab.png"
          alt=""
          :class="{ play: playing }"
        />
      </div>
      <div class="disc" :class="[playing ? 'whirl' : 'stop']">
        <!-- 光盘图片 -->
        <img class="circle" src="../../dist/img/disc-plus.png" alt="" />
        <!-- 歌曲封面 -->
        <img
          class="cover"
          :src="currentSong.song ? currentSong.picUrl : currentSong.al.picUrl"
          alt=""
        />
        <!-- 暂停按钮 -->
        <img
          class="noplay"
          :class="{ 'play-btn': !playing }"
          src="../../dist/img/play_btn_3x.png"
          alt=""
        />
      </div>
    </div>
    <!-- 歌词模块 -->
    <Lyrics :lyricsItems="lyricArr"></Lyrics>
    <!-- 进度条组件 -->
    <ProgressDialog v-model="progress"></ProgressDialog>
    <!-- 上下曲及播放模式 -->
    <div class="model">
      <ul class="model-list">
        <li @click="$emit('playMode')">模式</li>
        <li @click="$emit('nextSong')">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            fill="#ccc"
            class="bi bi-skip-start-fill"
            viewBox="0 0 16 16"
          >
            <path
              d="M4 4a.5.5 0 0 1 1 0v3.248l6.267-3.636c.54-.313 1.232.066 1.232.696v7.384c0 .63-.692 1.01-1.232.697L5 8.753V12a.5.5 0 0 1-1 0V4z"
            />
          </svg>
        </li>

        <li>
          <svg
            v-if="!playing"
            @click="$emit('playPause')"
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            fill="#ccc"
            class="bi bi-play-circle"
            viewBox="0 0 16 16"
          >
            <path
              d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
            />
            <path
              d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445z"
            />
          </svg>
          <span v-else class="pause-icon" @click="$emit('playPause')"></span>
        </li>
        <li @click="$emit('prevSong')">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            fill="#ccc"
            class="bi bi-skip-end-fill"
            viewBox="0 0 16 16"
          >
            <path
              d="M12.5 4a.5.5 0 0 0-1 0v3.248L5.233 3.612C4.693 3.3 4 3.678 4 4.308v7.384c0 .63.692 1.01 1.233.697L11.5 8.753V12a.5.5 0 0 0 1 0V4z"
            />
          </svg>
        </li>
        <!-- <li @click='getLyrics'>列表</li> -->
        <svg
          @click.stop="showPlayList = true"
          xmlns="http://www.w3.org/2000/svg"
          width="35"
          height="35"
          fill="#ccc"
          class="bi bi-music-note-list"
          viewBox="0 0 16 16"
        >
          <path
            d="M12 13c0 1.105-1.12 2-2.5 2S7 14.105 7 13s1.12-2 2.5-2 2.5.895 2.5 2z"
          />
          <path fill-rule="evenodd" d="M12 3v10h-1V3h1z" />
          <path
            d="M11 2.82a1 1 0 0 1 .804-.98l3-.6A1 1 0 0 1 16 2.22V4l-5 1V2.82z"
          />
          <path
            fill-rule="evenodd"
            d="M0 11.5a.5.5 0 0 1 .5-.5H4a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 .5 7H8a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 .5 3H8a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5z"
          />
        </svg>
      </ul>
    </div>
    <!-- 当前的播放列表 -->
    <transition
    enter-active-class="animate__animated animate__slideInUp"
    leave-active-class="animate__animated animate__fadeOutDown"
    >
    <div class="present-list" v-if="showPlayList">
      <div class="mask" @click.stop="showPlayList = false"></div>
      <div class="card">
        <ul class="list">
          <li class="list-title">当前播放歌单</li>
          <NewestList
            v-for="(item,index) in playList"
            :key="item.id"
            :item="item"
            :currentSongId="currentSong.id"
            :playing="playing"
            @changeCurrent="$emit('changeCurrentSong', item)"
          >
            {{ (index + 1).toString().padStart(2, "0") }}
          </NewestList>
        </ul>
      </div>
    </div>
    </transition>
  </div>
</template>

<script>
import NewestList from "../views/NewestList.vue";
import ProgressDialog from "../views/ProgressDialog.vue";
import Lyrics from "../views/Lyrics.vue";
export default {
  props: {
    showPlayPage: Boolean,
    currentSong: Object,
    playing: Boolean,
    playList: Array,
  },
  components: {
    Lyrics,
    ProgressDialog,
    NewestList,
  },
  data() {
    return {
      lyricArr: [],
      progress: 0.3,
      showPlayList: false,
    };
  },
  created() {
    this.axios
      .get("http://apis.netstart.cn/music/lyric?id=33894312")
      .then((res) => {
        this.lyricArr = res.data.klyric.lyric;
        this.getLyrics();
      });
  },
  methods: {
    getLyrics() {
      this.lyricArr = this.lyricArr
        .split("\n")
        .filter((s) => s)
        .map((s) => {
          var text = s.replace(/^\[\d{2}:\d{2}\.\d{3}\]/i, "");
          var timeStr = s.replace(text, "").replace(/(^\[|\]$)/g, "");
          var timeArr = timeStr.split(":").map((item) => Number(item));
          var time = timeArr[0] * 60 + timeArr[1];
          return { text, time };
        });
      console.log(...[this.lyricArr]);
    },
  },
  watch: {},
};
</script>
<style lang="less" scoped>
.play-page {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 777;
  overflow: hidden;
  padding: 10px;
  box-sizing: border-box;
  background: rgba(107, 108, 109, 0.9);
  .play-mask {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100% 100%;
    filter: blur(30px) brightness(0.8);
    transform: scale(1.5);
  }
  .compact-disc {
    height: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 987;
    .disc {
      width: 300px;
      height: 300px;
      position: relative;
      overflow: hidden;
      z-index: 10;
      animation: turn 4s linear infinite;
      border-radius: 50%;
      transition: all 1s;
      img.circle {
        position: absolute;
        width: 100%;
        height: 100%;
      }
      img.cover {
        width: 195px;
        height: 195px;
        border-radius: 50%;
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        margin: auto;
        z-index: 5;
      }
      &.whirl {
        animation-play-state: running;
        box-shadow: 2px 2px 37px rgb(184, 181, 181), -2px -2px 47px lightgray;
      }
      &.stop {
        animation-play-state: paused;
      }
      .noplay {
        z-index: 999;
        width: 70px;
        height: 70px;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        margin: auto;
        opacity: 0;
        transition: opacity 1s;
        &.play-btn {
          opacity: 1;
        }
      }
    }
    @keyframes turn {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
    // 播放摆动杆
    .play-bar {
      width: 84px;
      height: 136px;
      position: absolute;
      left: 50%;
      top: 0;
      margin-left: -20px;
      margin-top: 10px;
      z-index: 999;
      img {
        width: 100%;
        height: 100%;
        transform: rotate(-30deg);
        transform-origin: 15px 15px;
        transition: all 1s;
        &.play {
          transform: rotate(-5deg);
        }
      }
    }
  }
  .model {
    margin-top: 20px;
    .model-list {
      display: flex;
      justify-content: space-around;
      align-items: center;
      li {
        margin-right: 10px;
        color: red;
        font-size: 20px;
        width: 50px;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        .pause-icon {
          display: inline-block;
          width: 45px;
          height: 45px;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          border: solid rgb(236, 234, 234) 3px;
          &::before {
            content: "|";
            width: 4px;
            background-color: rgb(241, 240, 240);
            height: 25px;
            color: rgb(236, 234, 234);
            margin-right: 10px;
          }
          &::after {
            content: "|";
            width: 4px;
            background-color: rgb(255, 253, 253);
            height: 25px;
            color: rgb(236, 234, 234);
          }
        }
      }
    }
  }
  .present-list {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(66, 65, 65, 0.6);
    z-index: 999;
    .mask {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      box-sizing: border-box;
    }
    .card {
      width: 100vw;
      height: 60vh;
      position: absolute;
      bottom: 0;
      left: 0;
      padding: 0 10px 20px;
      box-sizing: border-box;
      overflow: hidden;
      .list {
        height: 100%;
        background-color: #fff;
        border-radius: 10px;
        overflow: auto;
        .list-title {
          text-align: center;
          font-size: 23px;
          height: 40px;
          line-height: 40px;
          color: rgb(85, 76, 76);
        }
      }
    }
  }
}
</style>