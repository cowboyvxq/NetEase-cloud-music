<template>
  <div class="wrapper">
    <div class="title">最新评论({{ comments.length }})</div>
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
</template>

<script>
export default {
  props: {
    currentSongId: {
      type: Number,
    },
  },
  components: {},
  data() {
    return {
      comments: [],
    };
  },
  // 过滤日期格式
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
    this.getAxios(this.$route.query.id);
  },
  methods: {
    getAxios(id) {
      this.axios
        .get("http://apis.netstart.cn/music/comment/playlist?", {
          params: {
            id,
          },
        })
        .then((res) => {
          this.comments = res.data.comments;
          // console.log(this.comments);
        });
    },
  },
  watch: {},
};
</script>
<style lang="less" scoped>
.wrapper {
  .title {
    font-size: 12px;
    color: #7d667d;
    line-height: 20px;
    background-color: #f2f2f2;
    padding-left: 10px;
  }
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
        color: #888;
        border: solid #f0eeee 1px;
        padding: 10px 7px;
      }
    }
  }
}
</style>