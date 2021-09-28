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
          currentSong.song
            ? currentSong.picUrl
            : currentSong.al
            ? currentSong.al.picUrl
            : currentSong.album.artist.img1v1Url
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
    <div class="compact-disc" v-if="!showLyric" @click="showLyric = true">
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
          :src="
            currentSong.song
              ? currentSong.picUrl
              : currentSong.al
              ? currentSong.al.picUrl
              : currentSong.album.artist.img1v1Url
          "
          alt=""
        />
      </div>
    </div>
    <!-- 歌词模块 -->
    <section class="lyric" v-else @click="showLyric = false" ref="lyric">
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
              redcolor: judge,
              whitecolor: white,
              pinkcolor: pink,
            }"
            >{{ l.text }}</span
          >
        </li>
      </ul>
    </section>
    <!-- 进度条 -->
    <section class="progress-bar">
      <span class="playtime">{{ format(curTime) }}</span>
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
      <span class="currenttime">{{ total }}</span>
    </section>

    <!-- 上下曲及播放模式 -->
    <div class="model">
      <ul class="model-list">
        <li>
          <transition
            enter-active-class="animate__animated animate__bounceIn"
            leave-active-class="animate__animated animate__bounceOut"
          >
            <div class="lyrcolor" v-show="showcolor">
              <span
                @click="
                  (active = true),
                    (pink = false),
                    (white = false),
                    (judge = false)
                "
              ></span>
              <span
                @click="(judge = true), (pink = false), (white = false)"
              ></span>
              <span @click="(pink = true), (white = false)"></span>
              <span @click="white = true"></span>
            </div>
          </transition>
          <div class="color-icon">
            <svg
              @click="showcolor = !showcolor"
              t="1631013760642"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="4043"
              width="40"
              height="40"
            >
              <path
                d="M368 651.424m-224 0a224 224 0 1 0 448 0 224 224 0 1 0-448 0Z"
                fill="#E5B248"
                p-id="4044"
              ></path>
              <path
                d="M533.312 368m-224 0a224 224 0 1 0 448 0 224 224 0 1 0-448 0Z"
                fill="#4EB8A3"
                p-id="4045"
              ></path>
              <path
                d="M692.16 656m-224 0a224 224 0 1 0 448 0 224 224 0 1 0-448 0Z"
                fill="#E3684F"
                p-id="4046"
              ></path>
              <path
                d="M533.152 435.296A271.552 271.552 0 0 1 640 651.424a271.648 271.648 0 0 1-112.96 220.704 271.52 271.52 0 0 1-106.88-216.128 271.616 271.616 0 0 1 111.36-219.52z"
                fill="#E5B248"
                opacity=".502"
                p-id="4047"
              ></path>
              <path
                d="M692.16 384a271.04 271.04 0 0 1 110.368 23.296 272.096 272.096 0 0 1-379.52 209.408A272.064 272.064 0 0 1 692.16 384z"
                fill="#4EB8A3"
                opacity=".5"
                p-id="4048"
              ></path>
              <path
                d="M368 379.424a272.032 272.032 0 0 1 270.08 239.68A272.032 272.032 0 0 1 263.2 400.384 270.368 270.368 0 0 1 368 379.392z"
                fill="#E5B248"
                opacity=".5"
                p-id="4049"
              ></path>
              <path
                d="M533.184 435.296l4.48 3.52a273.376 273.376 0 0 1 17.792 15.52l-2.304-2.176c2.08 1.92 4.128 3.904 6.144 5.888l-3.84-3.712c2.272 2.176 4.544 4.384 6.752 6.656l-2.912-2.944 4.576 4.672-1.664-1.728c1.92 1.92 3.776 3.904 5.632 5.92l-3.968-4.192c2.688 2.752 5.312 5.6 7.84 8.48l-3.872-4.288c1.824 1.952 3.616 3.968 5.376 5.984l-1.504-1.696c1.92 2.176 3.84 4.384 5.664 6.592l-4.16-4.896a272.896 272.896 0 0 1 22.784 30.144l-1.984-3.008c1.728 2.56 3.392 5.184 5.056 7.808l-3.072-4.8c1.536 2.368 3.04 4.8 4.512 7.2l-1.44-2.4c1.376 2.24 2.752 4.48 4.064 6.784l-2.624-4.384a271.168 271.168 0 0 1 19.648 39.04l-2.112-5.088a269.92 269.92 0 0 1 8.96 23.936l-0.672-2.048c0.768 2.304 1.504 4.64 2.208 6.976l-1.536-4.928a269.824 269.824 0 0 1 10.112 43.584l-0.896-5.728c0.544 3.328 1.056 6.688 1.504 10.048l0.352 3.008-9.376 3.776a269.92 269.92 0 0 1-10.88 3.808l7.648-2.624a269.408 269.408 0 0 1-9.856 3.328l2.24-0.704c-4.064 1.28-8.16 2.56-12.256 3.68l10.016-2.976c-3.968 1.28-8 2.432-12.032 3.52l2.016-0.544c-3.424 0.96-6.88 1.792-10.368 2.624l8.352-2.08c-3.712 0.96-7.424 1.888-11.2 2.72l2.88-0.64c-4.192 0.96-8.416 1.856-12.672 2.624l9.792-1.984a270.528 270.528 0 0 1-12.384 2.432l2.592-0.448a271.36 271.36 0 0 1-12.128 1.92l9.536-1.472a273.6 273.6 0 0 1-36.16 3.808l-10.528 0.192-10.944-0.224a274.656 274.656 0 0 1-11.584-0.704l9.76 0.64a274.432 274.432 0 0 1-10.88-0.736l1.12 0.096a272.928 272.928 0 0 1-11.936-1.248l10.784 1.152a272.736 272.736 0 0 1-12.544-1.376l1.76 0.224a271.744 271.744 0 0 1-9.152-1.28l7.36 1.056a271.424 271.424 0 0 1-12.224-1.92l4.864 0.832c-3.84-0.64-7.68-1.312-11.456-2.08l6.592 1.28a270.624 270.624 0 0 1-9.152-1.824l2.56 0.544a270.24 270.24 0 0 1-12.032-2.784l9.472 2.24a270.144 270.144 0 0 1-12.576-3.04l3.104 0.8a269.92 269.92 0 0 1-9.696-2.656l6.592 1.856a269.824 269.824 0 0 1-31.008-10.304l1.92 0.768a270.24 270.24 0 0 1-9.408-3.904l-1.6-0.704 0.672-4.48-0.672 4.48a271.136 271.136 0 0 1 5.76-28.864l-0.96 3.936c0.704-2.944 1.472-5.92 2.304-8.832l-1.344 4.896c0.768-2.88 1.536-5.76 2.4-8.608l-1.056 3.712c0.736-2.72 1.536-5.44 2.368-8.096l-1.312 4.384c0.768-2.688 1.6-5.344 2.464-8l-1.152 3.616c0.928-2.944 1.92-5.888 2.912-8.8l-1.76 5.184a270.4 270.4 0 0 1 27.2-58.336l-1.92 3.104c1.408-2.336 2.88-4.704 4.384-7.008l-2.464 3.904c1.472-2.4 3.008-4.8 4.576-7.136l-2.112 3.232c1.664-2.56 3.36-5.12 5.12-7.68l-3.008 4.48c1.472-2.24 2.944-4.448 4.48-6.592l-1.472 2.112c1.728-2.528 3.52-5.024 5.376-7.488l-3.904 5.376c1.696-2.4 3.424-4.768 5.184-7.072l-1.28 1.696c1.6-2.144 3.2-4.288 4.896-6.4l-3.616 4.704a273.632 273.632 0 0 1 25.728-29.376l-4.16 4.16c1.952-2.016 3.936-4 5.952-5.952l-1.792 1.76c1.824-1.824 3.712-3.648 5.632-5.44l-3.84 3.68c2.048-1.984 4.128-3.936 6.24-5.888l-2.4 2.24c2.048-1.92 4.16-3.84 6.272-5.696l-3.872 3.456a273.6 273.6 0 0 1 6.016-5.344l-2.144 1.888c1.92-1.728 3.936-3.424 5.92-5.088l-3.776 3.2c2.304-1.952 4.64-3.904 6.976-5.792l-3.2 2.592a273.28 273.28 0 0 1 6.592-5.28l-3.392 2.688a272.32 272.32 0 0 1 11.328-8.64z"
                fill="#FFFFFF"
                p-id="4050"
              ></path>
            </svg>
          </div>
        </li>
        <!-- 上一曲 -->
        <li @click="$emit('prevSong')">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            fill="#f5f5f5"
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
            fill="#f5f5f5"
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
            fill="#f5f5f5"
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
          fill="#f5f5f5"
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
              :currentId="currentSong.id"
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
    total: String,
    curTime: [String, Number],
  },
  components: {
    NewestList,
    SingleComment,
  },
  data() {
    return {
      lyricArr: [],
      progress: 0.3,
      showPlayList: false,
      lisHeight: [],
      showLyric: true,
      scrollHeight: 0,
      value: this.currentTime,
      inputing: false,
      judge: false,
      pink: false,
      white: false,
      showcolor: false,
      showdisc: false,
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
    // 格式化当前播放时间
    format(interval) {
      // 向下取整，想等于Math.floor()
      interval |= 0;
      // 获取分的部分
      const minute = (interval / 60) | 0;
      // 获取秒的部分
      const second = this._pad(interval % 60);
      return `${minute}:${second}`;
    },
    _pad(num, n = 2) {
      // 这个函数的功能就是补到几位，用0去补位
      let len = num.toString().length;
      while (len < n) {
        num = `0${num}`;
        len++;
      }
      return num;
    },
  },
  computed: {
    parsedLyric: function () {
      if (this.lyricArr.length != 0) {
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
      // this.lyricArr = [];
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
      // high = high > 1928 ? 1928 : high;
      this.scrollHeight = high;
    },
    parsedLyric: function () {
      // console.log("parsedLyric改变", this.$refs.lyricContent);
      this.$nextTick(() => {
        // console.log("nextTick", this.$refs.lyricContent);
        var lis = this.$refs.lyricContent.querySelectorAll("li");
        // console.log(lis);
        this.lisHeight = [...lis].map((item) => item.offsetHeight);
      });
    },
  },
};
</script>
<style lang="less" scoped>
@keyframes roll {
  from {
    background-position-x: 0;
  }
  to {
    background-position-x: -100%;
  }
}
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
  padding: 3vw;
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
    height: 450px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 587;
    position: relative;
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
      height: 145px;
      position: absolute;
      left: 50%;
      top: -2px;
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
    color: rgb(233, 228, 227);
    text-align: center;
    padding: 20px 0;
    overflow: hidden;
    position: relative;
    ul {
      transition: all 0.3s;
      li {
        line-height: 1.8;
        // font-size: 24px;
        span {
          &.active {
            font-size: 22px;
            animation-name: roll;
            animation-timing-function: linear;
            animation-duration: 3s;
            background-image: linear-gradient(
              to right,
              rgb(41, 129, 245) 50%,
              rgb(228, 29, 201) 50%
            );
            background-size: 200%;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            animation-play-state: paused;
            &.playing {
              animation-play-state: running;
            }
            &.redcolor {
              background-image: linear-gradient(
                to right,
                rgb(132, 212, 243) 50%,
                rgb(255, 33, 4) 50%
              );
            }
            &.pinkcolor {
              background-image: linear-gradient(
                to right,
                rgb(247, 6, 175) 50%,
                lightpink
              );
            }
            &.whitecolor {
              background-image: linear-gradient(
                to right,
                rgb(121, 120, 120) 50%,
                white
              );
            }
          }
        }
      }
    }
  }
  // 进度条
  .progress-bar {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 25px;
    .playtime {
      margin-right: 10px;
      color: #fff;
    }
    .currenttime {
      margin-left: 10px;
      color: #fff;
    }
    .progress {
      width: 80vw;
      height: 7px;
      background: rgb(199, 197, 197);
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
        background: rgb(236, 69, 69);
        border-radius: inherit;
        &::before {
          content: "";
          width: 12px;
          height: 12px;
          display: block;
          margin-right: -5px;
          background: rgb(236, 32, 127);
          position: absolute;
          top: -3px;
          right: 0;
          border-radius: 50%;
        }
      }
    }
  }
  .model {
    margin-top: 40px;
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
        position: relative;
        // 切换歌词颜色
        .lyrcolor {
          width: 136px;
          height: 34px;
          position: absolute;
          top: -32px;
          left: -14px;
          border-radius: 20px;
          padding-top: 5px;
          box-sizing: border-box;
          background-color: rgb(97, 184, 241);
          .color-icon {
            text-align: center;
          }
          span {
            padding: 5px 15px;
            margin-left: 5px;
            border-radius: 50%;
            &:first-child {
              margin-left: 0;
              background-color: rgb(228, 29, 201);
            }
            &:nth-child(2) {
              background-color: rgb(255, 33, 4);
            }
            &:nth-child(3) {
              background-color: lightpink;
            }
            &:nth-child(4) {
              background-color: white;
            }
          }
        }
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