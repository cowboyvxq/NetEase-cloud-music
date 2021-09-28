<template>
  <!-- 最新音乐 -->
  <li
    v-if="item.song"
    class="songs animate__animated animate__fadeIn"
    @click.stop="$emit('changeCurrent', item)"
  >
    <div class="left">
      <div class="song-name">{{ item.name }}</div>
      <div class="info information">
        <em v-if="item.song.privilege.maxbr == 999000"></em>
        <i v-for="artist in item.song.artists" :key="artist.id" class="artist">
          {{ artist.name }}
        </i>
        <span class="artist">--{{ item.song.album.name }}</span>
      </div>
    </div>
    <div class="icon">
      <div
        class="play"
        :class="{ current: currentId === item.id, playing: playing }"
      >
        <i></i>
        <i></i>
        <i></i>
        <i></i>
      </div>
    </div>
  </li>

  <!-- 编辑推荐的歌单 -->
  <li
    v-else-if="item.al"
    class="songs animate__animated animate__fadeIn"
    @click.stop="$emit('changeCurrent', item)"
  >
    <div class="sequence">
      <slot></slot>
    </div>
    <div class="left">
      <div class="song-name">{{ item.name }}</div>
      <div class="info">
        <em v-if="item.fee == 8"></em>
        <i v-for="artist in item.ar" :key="artist.id" class="artist">
          {{ artist.name }}
        </i>
        <span class="artist">--&nbsp;&nbsp;{{ item.al.name }}</span>
      </div>
    </div>
    <div class="icon">
      <!-- current: currentId === item.id给当前音乐列表按钮添加动画 -->
      <div
        class="play"
        :class="{ current: currentId === item.id, playing: playing }"
      >
        <i></i>
        <i></i>
        <i></i>
        <i></i>
      </div>
    </div>
  </li>
  <!-- 搜索结果列表 -->
  <li
    v-else
    class="songs animate__animated animate__fadeIn"
    @click.stop="$emit('changeCurrent', item)"
  >
    <div class="sequence">
      <slot></slot>
    </div>
    <div class="left">
      <div class="song-name">{{ item.name }}</div>
      <div class="info">
        <!-- <em v-if="item.fee == 8"></em> -->
        <i class="artist">
          {{ item.artists[0].name }}
        </i>
        <span class="artist">--&nbsp;&nbsp;{{ item.album.name }}</span>
      </div>
    </div>
    <div class="icon">
      <!-- current: currentId === item.id给当前音乐列表按钮添加动画 -->
      <div
        class="play"
        :class="{ current: currentId === item.id, playing: playing }"
      >
        <i></i>
        <i></i>
        <i></i>
        <i></i>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  components: {},
  props: {
    item: {
      type: Object,
      required: true,
    },
    currentId: {
      type: Number,
    },
    newRes: Array,
    playing: Boolean,
  },
  data() {
    return {};
  },
  methods: {},
  watch: {},
};
</script>
<style lang="less" scoped>
.songs {
  padding: 6px 15px 6px 10px;
  height: 54px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: #e6e6e6 solid 1px;
  box-sizing: border-box;
  .sequence {
    width: 15px;
  }
  &:nth-child(1) {
    .sequence {
      color: red;
    }
  }
  &:nth-child(2) {
    .sequence {
      color: red;
    }
  }
  &:nth-child(3) {
    .sequence {
      color: red;
    }
  }
  .conceal() {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .left {
    width: calc(100% - 70px);
    .conceal();
    .song-name {
      font-size: 17px;
      color: #666;
      margin-top: 10px;
    }
    .info {
      line-height: 24px;
      margin-top: -6px;
      .conceal();
      em {
        display: inline-block;
        width: 20px;
        height: 20px;
        background: url("https://s3.music.126.net/mobile-new/img/index_icon_2x.png?5207a28c3767992ca4bb6d4887c74880=")
          no-repeat 5px 11px;
        background-size: 166px 97px;
      }
      .artist {
        font-size: 12px;
        color: #88a7d0;
      }
      span.artist {
        margin-left: -4px;
      }
      i.artist {
        font-style: normal;
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
    .information {
      margin-top: -5px;
    }
    .information[data-v-09550544] {
      height: 24px;
      line-height: 24px;
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
    .play {
      width: 25px;
      height: 30px;
      background: url("https://s3.music.126.net/mobile-new/img/index_icon_2x.png?5207a28c3767992ca4bb6d4887c74880=")
        no-repeat -22px 5px;
      background-size: 166px 97px;
      &.current {
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
