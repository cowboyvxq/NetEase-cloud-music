<template>
  <div class="lyrics">
      <ul>
          <li v-for='item in lyricsItems' 
          :key="item.id"
          >{{ item.text }}</li>
      </ul>
  </div>
</template>

<script>
export default {
  props:{
    lyricsItems:[Array,String]
  },
  components: {},
  data() {
    return {
    };
  },
  methods: {},
  watch: {},
};
</script>
<style lang="less" scoped>
.lyrics {
    height: 150px;
    overflow: hidden;
    padding: 0 15px;
    ul {
        text-align: center;
        color: #fff;
        font-size: 18px;
    }
}
</style>