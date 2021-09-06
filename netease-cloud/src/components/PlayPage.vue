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
        <img src="../assets/playbar.png" alt="" :class="{ play: playing }" />
      </div>
      <div class="disc" :class="[playing ? 'whirl' : 'stop']">
        <!-- 光盘图片 -->
        <img class="circle" src="../assets/guangpan.png" alt="" />
        <!-- 歌曲封面 -->
        <img
          class="cover"
          :src="currentSong.song ? currentSong.picUrl : currentSong.al.picUrl"
          alt=""
        />
      </div>
    </div>
    <!-- 歌词模块 -->
    <section class="lyric" @click="showLyric = false" ref="lyric">
      <ul
        class="content"
        ref="lyricContent"
        v-if="parsedLyric.length"
        :style="{ marginTop: -scrollHeight + 'px' }"
      >
        <li v-for="(l, i) in parsedLyric" :key="i">
          <span
            :style="{
              animationDuration: parsedLyric[i + 1]
                ? parsedLyric[i + 1].time - l.time - 0.5 + 's'
                : '3s',
            }"
            :class="{
              active: currentLyricIndex === i,
              playing: playing && currentLyricIndex === i,
            }"
            >{{ l.text }}</span
          >
        </li>
      </ul>
    </section>
    <!-- 进度条组件 -->
    <section class="progress">
      <input
        type="range"
        :max="duration"
        step="0.5"
        v-model="value"
        @change="progressChange"
        @input="progressInput"
      />
      <span
        class="bar"
        :style="{ width: (value / duration) * 100 + '%' }"
      ></span>
      <!-- <input type="range" :max="duration" step="0.5" v-model="value" /> -->
    </section>

    <!-- 上下曲及播放模式 -->
    <div class="model">
      <ul class="model-list">
        <li @click="$emit('playMode')">模式</li>
        <!-- 上一曲 -->
        <li @click="$emit('prevSong')">
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
        <!-- 下一曲 -->
        <li @click="$emit('nextSong')">
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
    <!-- 歌曲评论 -->
    <SingleComment :currentSong="currentSong"></SingleComment>
    <!-- 当前的播放列表 -->
    <div class="present-list" v-if="showPlayList">
      <transition
        enter-active-class="animate__animated animate__fadeIn"
        leave-active-class="animate__animated animate__fadeDown"
      >
        <div class="mask" @click.stop="showPlayList = false"></div>
      </transition>
      <transition
        enter-active-class="animate__animated animate__slideInUp"
        leave-active-class="animate__animated animate__fadeOutDown"
      >
        <div class="card">
          <!-- <div class="song-list"> -->
          <p class="pst-title">当前播放歌单</p>
          <ul class="list">
            <NewestList
              v-for="(item, index) in playList"
              :key="item.id"
              :item="item"
              :currentSongId="currentSong.id"
              :playing="playing"
              @changeCurrent="$emit('changeCurrentSong', item)"
            >
              {{ (index + 1).toString().padStart(2, "0") }}
            </NewestList>
          </ul>
          <!-- </div> -->
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import NewestList from "../views/NewestList.vue";
import SingleComment from "../views/SingleComment.vue";
export default {
  props: {
    showPlayPage: Boolean,
    currentSong: Object,
    playing: Boolean,
    playList: Array,
    currentTime: Number,
    duration: Number,
  },
  components: {
    NewestList,
    SingleComment,
  },
  data() {
    return {
      lyricArr: null,
      progress: 0.3,
      showPlayList: false,
      lisHeight: [],
      showLyric: false,
      scrollHeight: 0,
      value: this.currentTime,
      inputing: false,
    };
  },
  created() {
    this.getLyric(this.currentSong.id);
  },
  methods: {
    // 进度条
    progressChange: function (event) {
      this.inputing = false;
      this.$emit("current-time-change", event.target.value);
    },
    progressInput: function () {
      this.inputing = true;
    },
    // 获取歌词
    getLyric: function (id) {
      this.axios
        .get("http://apis.netstart.cn/music/lyric", {
          params: { id },
        })
        .then((res) => (this.lyricArr = res.data.lrc.lyric));
    },
  },
  computed: {
    parsedLyric: function () {
      if (this.lyricArr) {
        return this.lyricArr
          .split("\n")
          .filter((s) => s)
          .map((s) => {
            var text = s.replace(/^\[\d{2}:\d{2}\.\d{2,3}\]/i, "");
            var timeStr = s.replace(text, "").replace(/(^\[|\]$)/g, "");
            var timeArr = timeStr.split(":").map((item) => Number(item));
            var time = timeArr[0] * 60 + timeArr[1];
            return { text, time };
          });
      } else {
        return [];
      }
    },
    currentLyricIndex: function () {
      var i = this.parsedLyric.findIndex(
        (item) => item.time > this.currentTime
      );
      var currentLyricIndex = i !== -1 ? i - 1 : this.parsedLyric.length - 1;
      return currentLyricIndex;
    },
  },
  watch: {
    "currentSong.id": function (id) {
      this.getLyric(id);
    },

    currentTime: function (n) {
      if (!this.inputing) {
        this.value = n;
      }
    },

    currentLyricIndex: function (index) {
      // 当前歌词前面所有的歌词的高度
      var high = this.lisHeight.slice(0, index).reduce(function (total, item) {
        return total + item;
      }, 0);
      // console.log(h);
      high = high > 200 ? high - 200 : 0;
      high = high > 1928 ? 1928 : high;
      this.scrollHeight = high;
    },
    parsedLyric: function () {
      // console.log("parsedLyric改变", this.$refs.lyricContent);
      this.$nextTick(() => {
        // console.log("nextTick", this.$refs.lyricContent);
        var lis = this.$refs.lyricContent.querySelectorAll("li");
        console.log(lis);
        this.lisHeight = [...lis].map((item) => item.offsetHeight);
      });
    },
  },
};
</script>
<style lang="less" scoped>
.pos-ab() {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
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
    z-index: 587;
    position: relative;
    display: none;
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
        box-shadow: 8px 8px 30px lightcyan, -8px -8px 30px lightcyan;
      }
      &.stop {
        animation-play-state: paused;
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
      top: -15px;
      margin-left: -18px;
      margin-top: 7px;
      z-index: 999;
      img {
        width: 100%;
        height: 100%;
        transform: rotate(-30deg);
        transform-origin: 15px 15px;
        transition: all 1s;
        &.play {
          transform: rotate(-10deg);
        }
      }
    }
  }
  // 歌词
  .lyric {
    height: 60vh;
    color: white;
    text-align: center;
    // background: lightblue;

    overflow: hidden;
    position: relative;
    ul {
      transition: all 0.3s;
      li {
        line-height: 1.8;
        // font-size: 24px;
        span {
          &.active {
            animation-name: xxx;
            animation-timing-function: linear;
            animation-duration: 3s;
            background-image: linear-gradient(
              to right,
              rgb(238, 20, 111) 50%,
              rgb(28, 96, 255) 50%
            );
            background-size: 200%;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            // text-shadow: 0 0 1px rgb(246, 203, 12);

            animation-play-state: paused;
            &.playing {
              animation-play-state: running;
            }
          }
        }
      }
    }
  }
  // 进度条
  .progress {
    width: 80vw;
    height: 4px;
    margin: 20px auto;
    background: white;
    position: relative;
    border-radius: 10px;

    input {
      width: 100%;
      height: 100%;
      opacity: 0;
      position: absolute;
      z-index: 1;
      top: 0;
    }
    .bar {
      .pos-ab();
      background: lightcoral;
      border-radius: inherit;
      &::before {
        content: "";
        width: 10px;
        height: 10px;
        display: block;
        margin-right: -5px;
        background: red;
        position: absolute;
        top: -3px;
        right: 0;
        border-radius: 50%;
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
      position: fixed;
      top: 0;
      left: 0;
      box-sizing: border-box;
    }
    .card {
      width: 100vw;
      height: 70vh;
      position: absolute;
      bottom: 15px;
      left: 0;
      padding: 20px;
      box-sizing: border-box;
      border-radius: 20px;
      overflow: hidden;
      .pst-title {
        text-align: center;
        font-size: 23px;
        height: 40px;
        line-height: 40px;
        color: rgb(85, 76, 76);
        background-color: #fff;
        border-radius: 10px 10px 0 0;
      }
      .list {
        height: 450px;
        background-color: #fff;
        border-radius: 0 0 10px 10px;
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