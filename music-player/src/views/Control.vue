<template>
  <!-- 利用v-show进行显示隐藏，由于切换过于频繁这里不能用v-if  -->
  <div class="controls" @click="$emit('showPlay')">
    <div class="head-portrait">
      <img
        :class="{ sport: playing }"
        :src="`${
          currentSong.song
            ? currentSong.picUrl
            : currentSong.al
            ? currentSong.al.picUrl
            : currentSong.album.artist.img1v1Url
        }`"
        alt=""
      />
    </div>
    <div class="concert">
      <div class="music-name">
        <div class="present" :class="{ active: playing }">
          {{ currentSong.name }}
          <span class="singer">
            --
            {{
              currentSong.song
                ? currentSong.song.artists[0].name
                : currentSong.al
                ? currentSong.ar[0].name
                : currentSong.artists[0].name
            }}
          </span>
        </div>
      </div>
      <div class="play-btn">
        <!-- <button>播放</button> -->
        <div
          class="progress"
          @click.stop="$emit('play-state', currentSong.name)"
        >
          <canvas ref="canvas" width="50" height="50"></canvas>
          <div class="play-icon" :class="[playing ? 'pause' : 'play']"></div>
        </div>
        <!-- <button >列表</button> -->
        <div class="note-list">
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
        </div>
      </div>
    </div>
    <div class="present-list" v-if="showPlayList">
      <div class="mask" @click.stop="showPlayList = false"></div>
      <div class="card animate__animated animate__slideInUp">
        <ul class="list">
          <NewestList
            v-for="(item, index) in playList"
            :key="item.id"
            :item="item"
            :currentId="currentSongId"
            :playing="playing"
            @changeCurrent="$emit('changeCurrentSong', item)"
            >{{ (index + 1).toString().padStart(2, "0") }}</NewestList
          >
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import "animate.css";
// 导入复用的列表组件
import NewestList from "../views/NewestList.vue";
export default {
  components: {
    NewestList,
  },
  props: {
    currentSong: {
      type: Object,
    },
    playing: Boolean,
    duration: Number,
    currentTime: Number,
    playList: Array,
    currentSongId: Number,
  },
  data() {
    return {
      showPlayList: false,
    };
  },
  computed: {
    progress() {
      return this.currentTime / this.duration;
    },
  },
  watch: {
    progress(n) {
      var cxt = this.$refs.canvas.getContext("2d");
      var width = this.$refs.canvas.offsetWidth;
      var height = this.$refs.canvas.offsetHeight;
      this.$refs.canvas.width = width;
      this.$refs.canvas.height = height;
      cxt.clearRect(0, 0, 40, 40);
      // 开始新路径
      cxt.beginPath();
      cxt.lineWidth = 2;
      cxt.strokeStyle = "#f01";
      cxt.arc(
        25,
        25,
        20,
        (Math.PI / 180) * (0 - 90),
        (Math.PI / 180) * (360 * n - 90)
      );
      cxt.stroke();
      cxt.beginPath();
      cxt.lineWidth = 2;
      cxt.strokeStyle = "#fff";
      cxt.arc(
        25,
        25,
        20,
        (Math.PI / 180) * (360 * n - 90),
        (Math.PI / 180) * (360 - 90)
      );
      cxt.stroke();
      // 封闭新路径
    },
  },
  methods: {},
};
</script>
<style lang="less" scoped>
.controls {
  width: 100%;
  height: 55px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  position: fixed;
  bottom: 0;
  left: 0;
  background: rgb(37, 30, 30) url("../assets/controls-bg.jpg") no-repeat;
  background-size: 100% 55px;
  z-index: 90;
  padding: 0 10px;
  box-sizing: border-box;
  box-shadow: 2px 0px 3px #ccc;
  .head-portrait {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    padding: 2px;
    border: #ccc;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      animation: rotate 2s linear infinite;
      animation-play-state: paused;
    }
    .sport {
      animation-play-state: running;
    }
  }
  .concert {
    padding-left: 20px;
    display: flex;
    .music-name {
      width: 160px;
      height: 50px;
      line-height: 50px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      text-align: center;
      color: #fff;
      .active {
        animation: roll 6s infinite linear both;
        backface-visibility: hidden;
      }
      .present {
        .singer {
          font-size: 14px;
          color: #999;
        }
      }
    }
    @keyframes roll {
      from {
        transform: translateX(0px);
      }
      to {
        transform: translateX(-110px);
      }
    }
    .play-btn {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100px;
      .progress {
        width: 50px;
        height: 50px;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;  
        canvas {
          position: absolute;
          top: 0;
          left: 0;
        }
        .play-icon {
          position: relative;
          &.play {
            position: absolute;
            left: 17px;
            border-top: 10px solid transparent;
            border-right: 0px solid transparent;
            border-bottom: 10px solid transparent;
            border-left: 19px solid rgb(248, 246, 246);
          }
          &.pause {
            position: absolute;
            color: #fff;
            &::before {
              content: "|";
              width: 4px;
              background-color: rgb(255, 255, 255);
              height: 30px;
              margin-right: 7px;
            }
            &::after {
              content: "|";
              width: 4px;
              background-color: rgb(255, 253, 253);
              height: 30px;
            }
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
      z-index: 999;
      overflow: hidden;
      .list {
        height: 100%;
        background-color: #fff;
        border-radius: 10px;
        overflow: auto;
      }
    }
  }
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>