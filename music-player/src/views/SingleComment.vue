<template>
  <div class="root">
    <div class="com-mask" v-if="moveup" @click="moveup = false"></div>
    <div
      class="single-comment"
      @click="moveup = true"
      :class="{ shift: moveup }"
    >
      <p class="wonderful">精彩评论</p>
      <div class="details">
        <div class="comment" v-for="item in comments" :key="item.id">
          <div class="user">
            <img class="userpic" :src="item.user.avatarUrl" alt="" />
            <div class="customer">
              <span class="nickname">{{ item.user.nickname }}</span>
              <div class="date">{{ item.time | formatDate }}</div>
            </div>
          </div>
          <div class="content">
            <div class="info">
              <span class="revert" v-show="item.beReplied.length"
                >回复:
                <span
                  class="owner"
                  v-for="(nick, index) in item.beReplied"
                  :key="index"
                  >@{{ nick.user.nickname }}</span
                >
              </span>
              {{ item.content }}
            </div>
            <div
              class="reply"
              v-for="(nick, index) in item.beReplied"
              :key="index"
              v-show="item.beReplied.length"
            >
              <span>@{{ nick.user.nickname }}:</span>
              {{ nick.content }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    currentSong: Object,
  },
  data() {
    return {
      comments: [],
      moveup: false,
    };
  },
  filters: {
    formatDate: function (value) {
      let date = new Date(value);
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? "0" + MM : MM;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      let h = date.getHours();
      h = h < 10 ? "0" + h : h;
      let m = date.getMinutes();
      m = m < 10 ? "0" + m : m;
      let s = date.getSeconds();
      s = s < 10 ? "0" + s : s;
      return y + "-" + MM + "-" + d + " " + h + ":" + m + ":" + s;
    },
  },
  created() {
    this.getComment(this.currentSong.id);
  },
  methods: {
    getComment(id) {
      this.axios
        .get("http://apis.netstart.cn/music/comment/music", {
          params: {
            id,
          },
        })
        .then((res) => {
          this.comments = res.data.comments;
          // console.log(res);
        });
    },
  },
};
</script>

<style lang='less'>
@media (max-height: 667px) {
  .single-comment {
    width: 94vw;
    height: 80vh;
    position: absolute;
    bottom: -500px !important;
    border-radius: 10px;
    background-color: #fff;
    z-index: 700;
    transition: all 1s ease;
    box-shadow: 5px 5px 15px #ccc, -5px -5px 15px #ccc;
  }
}
.root {
  z-index: 999;
  .com-mask {
    height: 100vh;
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(20, 20, 50, 0.7);
  }

  .single-comment {
    width: 94vw;
    height: 80vh;
    position: absolute;
    bottom: -545px;
    border-radius: 10px;
    background-color: #fff;
    z-index: 700;
    transition: all 1s ease;
    box-shadow: 5px 5px 15px #ccc, -5px -5px 15px #ccc;
    &.shift {
      bottom: 10px;
    }
    .wonderful {
      height: 40px;
      line-height: 40px;
      text-align: center;
      font-size: 20px;
      color: #555;
    }
    .details {
      height: calc(80vh - 40px);
      overflow: auto;
      .comment {
        padding: 10px;
        .user {
          height: 45px;
          display: flex;
          flex-wrap: nowrap;
          align-content: center;
          .userpic {
            width: 30px;
            height: 30px;
            border-radius: 50%;
          }
          .customer {
            margin-left: 10px;
            .nickname {
              font-size: 14px;
              color: #666;
              height: 20px;
              line-height: 20px;
            }
            .date {
              font-size: 12px;
              // transform: scale(.8);
              color: #ccc;
            }
          }
        }
        .content {
          margin-left: 45px;
          .info {
            font-size: 14px;
            line-height: 25px;
            color: #333333;
            .revert {
              color: #33336e;
              font-size: 14px;
              .owner {
                color: #507dc1;
              }
            }
          }
          .reply {
            font-size: 14px;
            color: #888888;
            border: solid #f0eeee 1px;
            padding: 10px 7px;
          }
        }
      }
    }
  }
}
</style>