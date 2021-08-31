<template>
  <!-- <ul class="newest-list"> -->
  <li @click="$emit('clickEvent', upon)">
    <div class="left">
      <p class="song-name">{{ upon.name }}</p>
      <p class="artist" v-for="item in upon.song.artists" :key="item.id">
        <em v-if="upon.song.exclusive"></em>
        <span>{{ item.name }} - {{ upon.name }}</span>
      </p>
    </div>
    <div class="icon">
      <div class="play-animation" 
      :class="{ current:currentSongId === item.id,playing:playing }"
      >
        <i></i>
        <i></i>
        <i></i>
      </div>
    </div>
  </li>
  <!-- </ul> -->
</template>

<script>
export default {
  // props: ["newRes"],
  props:{
    newRes:{
      type:Object,
      required: true,
    },
     currentSongId: {
      type: Number,
    },
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
.newest-list {
  padding: 7px 15px 10px 10px;
  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: solid #f3f3f4 1px;
    .left {
      .artist {
        font-size: 12px;
        color: #9797b9;
        em {
          display: inline-block;
          width: 20px;
          height: 20px;
          background: url("https://s3.music.126.net/mobile-new/img/index_icon_2x.png?5207a28c3767992ca4bb6d4887c74880=")
            no-repeat 5px 11px;
          background-size: 166px 97px;
        }
      }
    }
    .icon {
      width: 25px;
      height: 30px;
      background: url("https://s3.music.126.net/mobile-new/img/index_icon_2x.png?5207a28c3767992ca4bb6d4887c74880=")
        no-repeat -22px 5px;
      background-size: 166px 97px;
      position: relative;
      .play-animation {
        position: absolute;
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: space-between;
        background: #fff;
        i {
          display: inline-block;
          width: calc(100% / 5);
          height: 100%;
          background: red;
          animation: changeheight 0.9s linear 0s infinite alternate;
          transform-origin: bottom;
          &:first-child {
            animation-delay: -0.9s;
          }
          &:nth-child(2) {
            animation-delay: -0.6s;
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
    }
  }
}
</style>