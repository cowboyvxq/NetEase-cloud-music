<template>
  <div class="single-comment">
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
</template>

<script>
export default {
  props: {
    currentSong: Object,
  },
  data() {
    return {
      comments: [],
    };
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
          console.log(res);
        });
      console.log(id);
    },
  },
};
</script>

<style lang='less'>
    .single-comment {
        position: fixed;
        height: 100vh;
        width: 100vw;
        top: 0;
        left: 0;
        background-color: black;
        z-index: 999;
    }
 
</style>