<template>
  <div class="playpage">
    <div class="v-mask">
      <video :src="vUrl" controls autoplay></video>
    </div>
  </div>
</template>

<script>
export default {
    props:{
      vUrl:String  
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
.playpage {
    position: relative;
    .v-mask {
      width: 100vw;
      height: 100vh;
      position: absolute;
      background-color: tan;
      top: 0;
      left: 0;
    }
}
 
</style>