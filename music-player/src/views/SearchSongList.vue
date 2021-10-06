<template>
  <div class="search" @scroll="$emit('loadMore', $event)">
    <ul>
      <li
        v-for="(item, index) in searchResults"
        :key="index"
        @click.stop="$emit('changeCurrent', item)"
      >
        <div class="content">
          <p class="music-name">{{ item.name }}</p>
          <div class="tream">
            <em v-if="item.fee == 8"></em>
            <span
              class="artist"
              v-for="(artist, index) in item.artists"
              :key="index"
            >
              {{ artist.name }}
            </span>
            <p>--{{ item.album.name }}</p>
          </div>
        </div>
        <div class="icon">
          <div
            class="play"
            :class="{ current: currentSongId === item.id, playing: playing }"
          >
            <i></i>
            <i></i>
            <i></i>
            <i></i>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    searchResults: Array,
    currentSongId: {
      type: Number,
    },
    playing: Boolean,
  },
  components: {},
  data() {
    return {};
  },
  methods: {},
  watch: {},
};
</script>
<style lang="less" scoped>
.search {
  width: 100%;
  padding: 10px 15px;
  box-sizing: border-box;
  overflow: auto;
  position: absolute;
  top: 185px;
  left: 0;
  height: 100%;
  ul {
    li {
      height: 45px;
      border-bottom: solid #e6e6e6 1px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: space-around;
      .content {
        color: #666;
        width: 90%;
        padding-right: 20px;
        box-sizing: border-box;
        em {
          display: inline-block;
          width: 20px;
          height: 20px;
          background: url("https://s3.music.126.net/mobile-new/img/index_icon_2x.png?5207a28c3767992ca4bb6d4887c74880=")
            no-repeat 5px 6px;
          background-size: 166px 97px;
        }
        .music-name {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .tream {
          display: flex;
          white-space: nowrap;
          overflow: hidden;
          font-size: 12px;
          align-items: center;
          .artist {
            color: #888888;
            &:after {
              content: "/";
              margin: 0 3px;
            }
            &:last-of-type {
              &::after {
                content: "";
                margin: 0 5px;
              }
            }
          }
        }
      }
    }
    @keyframes changeheight {
      from {
        transform: scaleY(0.2);
      }
      to {
        transform: scaleY(1);
      }
    }
    .icon {
      width: 30px;
      height: 30px;
      .play {
        width: 25px;
        height: 30px;
        background: url("https://s3.music.126.net/mobile-new/img/index_icon_2x.png?5207a28c3767992ca4bb6d4887c74880=")
          no-repeat -22px 5px;
        background-size: 166px 97px;
      }
      .current {
        width: 25px;
        height: 22px;
        background: #fff;
        display: flex;
        justify-content: space-around;
        i {
          display: inline-block;
          width: calc(100% / 8);
          height: 100%;
          background: red;
          animation: changeheight 0.9s linear 0s infinite alternate;
          animation-play-state: paused;
          transform-origin: bottom;
          &:first-child {
            animation-delay: -0.9s;
          }
          &:nth-child(2) {
            animation-delay: -0.6s;
          }
          &:nth-child(3) {
            animation-delay: -0.3s;
          }
        }
        &.playing {
          i {
            animation-play-state: running;
          }
        }
      }
    }
  }
}
</style>