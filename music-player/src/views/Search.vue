<template>
  <div class="search">
    <div class="search-box">
      <div class="tops">
        <svg
          t="1630917017394"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="3008"
          width="20"
          height="20"
        >
          <path
            d="M443.072 68.821333c206.144 0 373.290667 167.146667 373.290667 373.333334 0 95.637333-35.968 182.890667-95.104 248.96l221.824 221.802666-30.165334 30.165334-221.866666-221.866667a371.882667 371.882667 0 0 1-247.978667 94.293333c-206.208 0-373.376-167.168-373.376-373.354666 0-206.186667 167.168-373.333333 373.376-373.333334z m0 42.666667c-182.656 0-330.709333 148.053333-330.709333 330.666667 0 182.613333 148.053333 330.666667 330.709333 330.666666 182.592 0 330.624-148.053333 330.624-330.666666 0-182.613333-148.053333-330.666667-330.624-330.666667z"
            p-id="3009"
            fill="#bfbfbf"
          ></path>
        </svg>
        <input
          type="search"
          placeholder="搜索歌手、歌曲、专辑"
          v-model.trim="val"
          @keyup.enter="val && (shows = true)"
          @click="getSearch"
          @focus="inputing = true"
          @blur="inputing = false"
        />
      </div>
    </div>
    <div class="keyword" v-if="!shows">
      <div class="suggests" v-show="!val && !flag">
        <p class="hot-search">热门搜索</p>
        <div class="keyitems">
          <span
            v-for="(item, index) in searchData"
            :key="index"
            @click="
              val = item.first;
              shows = true;
            "
            >{{ item.first }}</span
          >
        </div>
      </div>
      <!-- 历史记录 -->
      <div v-show="!val && !flag">
        <p class="history">
          历史记录
          <svg
            @click="removeAll"
            t="1630309775152"
            class="del-icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="2889"
            width="32"
            height="32"
          >
            <path
              d="M829.44 301.55776h-123.97056c-0.75776-0.04096-1.50528-0.11264-2.26816-0.11264h-70.76864v-49.93024c0-22.58432-18.37568-40.96-40.96-40.96h-153.6c-22.58432 0-40.96 18.37568-40.96 40.96v49.93024H324.32128c-0.768 0-1.51552 0.07168-2.26816 0.11264H194.56v40.96h88.80128v429.96736c0 22.58432 18.37568 40.96 40.96 40.96h378.88c22.58432 0 40.96-18.37568 40.96-40.96V342.51776H829.44v-40.96z m-391.56736-50.04288h153.6l-0.05632 49.93024H437.87264v-49.93024z m265.32864 541.45024v-20.48h0.00512l-0.00512 20.48z m-0.06144-20.48H324.32128V342.51776h104.05888a40.86784 40.86784 0 0 0 9.49248 1.15712h153.6c3.27168 0 6.44096-0.42496 9.49248-1.15712h102.24128l-0.06656 429.96736z"
              p-id="2890"
              fill="#bfbfbf"
            ></path>
            <path
              d="M423.936 464.69632a20.48 20.48 0 0 0-20.48 20.48v153.6a20.48 20.48 0 0 0 40.96 0v-153.6a20.48 20.48 0 0 0-20.48-20.48zM600.28928 464.69632a20.48 20.48 0 0 0-20.48 20.48v153.6a20.48 20.48 0 0 0 40.96 0v-153.6a20.48 20.48 0 0 0-20.48-20.48zM514.67264 464.69632a20.48 20.48 0 0 0-20.48 20.48v153.6a20.48 20.48 0 0 0 40.96 0v-153.6a20.48 20.48 0 0 0-20.48-20.48z"
              p-id="2891"
              fill="#bfbfbf"
            ></path>
          </svg>
        </p>
        <ul class="serchhistory">
          <li v-for="(item, index) in searchHistoryArr" :key="index">
            <span class="watch" @click="(val = item), (shows = true)">
              <svg
                t="1630150598073"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="2680"
                width="25"
                height="25"
              >
                <path
                  d="M511.648 76c240.224 0 435.647 195.432 435.647 435.649 0 240.216-195.423 435.647-435.647 435.647C271.423 947.296 76 751.866 76 511.65 76 271.432 271.423 76 511.648 76z m0 81.92c-194.979 0-353.728 158.752-353.728 353.729 0 194.976 158.75 353.727 353.728 353.727s353.727-158.75 353.727-353.727c0-194.977-158.75-353.729-353.727-353.729z m-3.121 103.464c22.335 0 40.495 17.877 40.951 40.103l0.009 0.857v207.688l130.376 138.492c15.28 16.233 14.742 41.644-1.042 57.22l-0.706 0.68c-16.233 15.28-41.645 14.742-57.22-1.042l-0.68-0.706-141.512-150.323a40.96 40.96 0 0 1-11.122-26.998l-0.014-1.078V302.344c0-22.622 18.338-40.96 40.96-40.96z"
                  p-id="2681"
                  fill="#cdcdcd"
                ></path>
              </svg>
              <span class="item-text">{{ item }}</span>
            </span>
            <svg
              @click="delPresent(index)"
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="#f01"
              class="bi bi-x"
              viewBox="0 0 16 16"
            >
              <path
                d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
              />
            </svg>
          </li>
        </ul>
      </div>
    </div>
    <!-- 搜索建议 -->
    <div class="list-page" v-if="val && !shows">
      <p class="antistop" @click="inputSearch(val)">搜索 "{{ val }}"</p>
      <ul class="newlist">
        <li
          v-for="(hot, index) in searchList"
          :key="index"
          @click="
            val = hot.keyword;
            shows = true;
          "
        >
          {{ hot.keyword }}
        </li>
      </ul>
    </div>
    <!-- 搜索结果 -->
    <SearchSongList
      v-show="shows"
      :searchResults="searchResults"
      @changeCurrent="$emit('changeCurrentSong', $event),$emit('change-play-list',searchResults)"
      :playing="playing"
      :currentSongId="currentSongId"
      @loadMore="loadMore"
    >
    </SearchSongList>
  </div>
</template>

  <!-- 搜索API：http://apis.netstart.cn/music/search/hot --> 

<script>
import SearchSongList from "../views/SearchSongList.vue";
export default {
  props: {
    currentSongId: {
      type: Number,
    },
    playing: Boolean,
  },
  components: {
    SearchSongList,
  },
  data() {
    return {
      searchData: [],
      val: "",
      searchList: [],
      flag: false,
      shows: false,
      searchResults: [],
      hasMore: false,
      inputing: false,
      page: 0,
      searchHistoryArr:
        JSON.parse(window.localStorage.getItem("history")) || [],
    };
  },
  // 在组件创建的生命周期阶段发送axios请求
  created() {
    this.axios.get("http://apis.netstart.cn/music/search/hot").then((res) => {
      this.searchData = res.data.result.hots;
    });
  },
  methods: {
    searchVal(keywords) {
      // 当搜索框的值发生改变时发送axios请求
      // 获取搜索框输入时对应的数据
      this.axios
        .get("http://apis.netstart.cn/music/search/suggest", {
          params: {
            keywords,
            type: "mobile",
          },
        })
        .then((res) => {
          this.searchList = res.data.result.allMatch;
        });
    },

    // 滚动加载更多数据
    loadMore(event) {
      let scrollHeight = Math.floor(
        event.target.offsetHeight + event.target.scrollTop
      );
      let goalHeight = event.target.scrollHeight;
      if (this.hasMore) {
        if (scrollHeight === goalHeight) {
          this.getSearch();
        }
      }
    },

    // 搜索结果
    getSearch: function () {
      this.axios
        .get("http://apis.netstart.cn/music/search", {
          params: {
            keywords: this.val,
            limit: 30,
            offset: this.page * 30,
          },
        })
        .then((res) => {
          this.searchResults.push(...res.data.result.songs);
          this.page++;
          this.hasMore = res.data.result.hasMore;
          // console.log(res.data);
        });

      // 记录一下
      if (this.shows) {
        this.searchHistoryArr = [
          ...new Set([this.val, ...this.searchHistoryArr]),
        ];
        window.localStorage.setItem(
          "history",
          JSON.stringify(this.searchHistoryArr)
        );
      }
      for (let i = 0; i < this.searchHistoryArr.length; i++) {
        if (this.searchHistoryArr[i] == "") this.searchHistoryArr.splice(i, 1);
      }
    },
    inputSearch(val) {
      this.val = val;
      this.getSearch();
      this.shows = true;
    },

    // 删除所有的历史记录
    removeAll() {
      localStorage.clear();
      this.searchHistoryArr = "";
    },

    // 删除当前历史记录
    delPresent(index) {
      const temp = this.searchHistoryArr;
      temp.splice(index, 1);
      localStorage.setItem("history", JSON.stringify(temp));
    },
  },
  watch: {
    // 监听输入框的内容
    val(key) {
      if (this.inputing) {
        this.shows = false;
      }
      this.searchVal(key);
      if (key === "") {
        this.flag = false;
        this.page = 0;
      } else {
        this.flag = true;
        this.searchResults = [];
      }
    },
    shows: function (n) {
      if (n && this.val) {
        this.getSearch();
      }
    },
  },
};
</script>
<style lang="less" scoped>
.search {
  .search-box {
    padding: 15px 10px;
    box-sizing: border-box;
    border-bottom: solid #f2f3f4 1px;
    border-radius: 20px;
    .tops {
      height: 35px;
      position: relative;
      input {
        height: 100%;
        width: 100%;
        line-height: 35px;
        border-radius: 20px;
        border: none;
        padding-left: 30px;
        box-sizing: border-box;
        outline: none;
        color: #333;
        background-size: 15px 15px;
        padding-right: 20px;
        background-color: #ebecec;
      }
      svg {
        position: absolute;
        left: 7px;
        top: 8px;
      }
    }
  }
  .keyword {
    padding: 5px 20px 0 10px;
    position: relative;
    .suggests {
      .hot-search {
        height: 40px;
        line-height: 40px;
        font-size: 14px;
      }
    }
    .keyitems {
      span {
        display: inline-block;
        padding: 5px 14px;
        border: solid #ccc 1px;
        margin: 0 8px 8px 0;
        border-radius: 16px;
        font-size: 14px;
      }
    }
    .history {
      font-size: 14px;
      color: #2c3e50;
      height: 30px;
      margin-top: 10px;
      margin-bottom: 5px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-right: 7px;
    }
    .serchhistory {
      li {
        height: 30px;
        line-height: 30px;
        border-bottom: solid #f1f1f3 1px;
        display: flex;
        justify-content: space-between;
        color: rgb(141, 140, 140);
        font-size: 15px;
        padding-right: 10px;
        .watch {
          svg {
            margin-right: 10px;
          }
        }
        .del {
          font-size: 24px;
          color: #b9b9b9;
          font-weight: 100;
        }
        .item-text {
          display: inline-block;
          width: 220px;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
      }
    }
  }
  .list-page {
    padding: 0 10px;
    p {
      color: rgb(117, 126, 241);
      height: 30px;
      line-height: 30px;
    }
    .newlist {
      li {
        height: 30px;
        line-height: 30px;
      }
    }
  }
}
</style>