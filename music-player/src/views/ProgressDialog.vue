<template>
  <div class="apper">
    <div class="progress-bar">
      <span>00:00</span>
      <div class="linellae" ref="bar">
        <div class="round" ref="icon"></div>
      </div>
      <span>04:00</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: Number,
  },
  components: {},
  data() {
    return {};
  },
  watch: {
    value: {
      handler() {
        this.$nextTick(() => {
          this.$refs.icon.style.transform = `translate(${
            this.maxScroll * this.value
          }px,0)`;
        });
      },
      immediate: true, // 初始化后就执行
    },
  },
  mounted() {
    const bar = this.$refs.bar;
    const icon = this.$refs.icon;
    // 最大拖动距离
    const maxScroll = bar.offsetWidth - icon.offsetWidth;
    // 调整icon初始的位置
    icon.style.transform = `translate(${maxScroll * this.value}px,0)`;
    //   进度条的触摸事件
    // 开始拖动
    icon.addEventListener("touchstart", (e) => {
      let x = maxScroll * this.value; //记录每一次偏移的位置
      //   记录开始的位置
      const startX = e.changedTouches[0].clientX;
      const touchmoveCallback = (e) => {
        // 计算偏移量
       let offsetX = e.changedTouches[0].clientX - startX;
          offsetX = offsetX + x;
        // 设置移动边界
        if (offsetX <= 0) {
          offsetX = 0;
        }
        if (offsetX > maxScroll) {
          offsetX = maxScroll;
          // console.log(offsetX);
          // 手指移动多少，就让icon移动icon标签跟着偏移多少
        }
        icon.style.transform = `translate(${offsetX}px,0)`;
        // 进度条可移动范围的百分比
        const progress = offsetX / maxScroll;
        // console.log(progress);
        // 传值给外部
        this.$emit('input',progress);
      };
      const touchendCallback = (e) => {
        // x = offsetX; //记录当前次的移动值
        // 移除监听事件
        // console.log(e, x);
        document.removeEventListener("touchmove", touchmoveCallback);
        document.removeEventListener("touchend", touchendCallback);
      };
      //   由于事件的频繁触发，所以要添加删除
      //   添加监听事件
      document.addEventListener("touchmove", touchmoveCallback);
      document.addEventListener("touchend", touchendCallback);
    });
  },
  methods: {},
};
</script>
<style lang="less" scoped>
.apper {
  height: 20px;
  .progress-bar {
    width: 80%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    position: relative;
    margin: 0 auto;
    .linellae {
      height: 4px;
      background-color: red;
      color: red;
      width: 80%;
      position: relative;
      .round {
        position: absolute;
        top: -5px;
        left: 0;
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background: #fff;
        &::before {
          content: "";
          position: absolute;
          top: -10px;
          left: -10px;
          right: -10px;
          bottom: -10px;
        }
      }
    }
  }
}
</style>