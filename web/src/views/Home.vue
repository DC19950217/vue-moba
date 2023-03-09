<template>
  <div class="home">
    <swiper :options="swiperOption">
      <swiper-slide>
        <img
          class="w-100"
          src="../assets/images/4ba492930bbddab84f4ed50d64e54ff5.jpeg"
          alt=""
      /></swiper-slide>
      <swiper-slide
        ><img
          class="w-100"
          src="../assets/images/d8b05318c118db4d988e94a3fd7da3b0.jpeg"
          alt=""
      /></swiper-slide>
      <swiper-slide
        ><img
          class="w-100"
          src="../assets/images/ef3b14fe0609665cfeb55aa1b8cda211.jpeg"
          alt=""
      /></swiper-slide>
      <div
        class="swiper-pagination pagination-home text-right px-3 pb-2"
        slot="pagination"
      ></div>
    </swiper>
    <!-- end of swiper-->
    <div class="nav-icons bg-white mt-3 text-center pt-3 text-grey">
      <div class="d-flex flex-wrap navicons" ref="navicons">
        <router-link
          :to="item.link"
          tag="div"
          class="nav-item mb-2"
          v-for="item in icontext"
          :key="item.id"
        >
          <i class="sprite" :class="`sprite-${item.icon}`"></i>
          <div class="py-1">{{ item.text }}</div>
        </router-link>
      </div>
      <!--  <div :class="item.link" v-for="item in icontexttest" :key="item.id">
        <div>{{ item.icon }}</div>
        <div>{{ item.text }}</div>
      </div> -->
      <div
        class="nav-btn bg-light py-2 fs-sm"
        @click.stop.prevent="collapse(!iscollapse)"
      >
        <i class="btn-icon mr-1" ref="btnicon"></i>
        <span>{{ iscollapse ? "收起" : "展开" }}</span>
      </div>
    </div>
    <!-- end of nav-->
    <m-list-card icon="Menu" title="新闻资讯" :categories="newsCats">
      <template #items="{category}">
        <router-link
          tag="div"
          :to="`/articles/${news._id}`"
          class="py-2 d-flex fs-lg"
          v-for="(news, i) in category.newsList"
          :key="i"
        >
          <span class="text-info">[{{ news.categoryName }}]</span>
          <span class="px-2">|</span>
          <span class="flex-1 text-dark-1 text-ellipsis pr-2">{{
            news.title
          }}</span>
          <span class="text-grey-1 fs-sm">{{ news.createdAt | date }}</span>
        </router-link>
      </template>
    </m-list-card>
    <!-- end of newsList-card-->
    <m-list-card icon="card-hero" title="英雄列表" :categories="heroCats">
      <template #items="{category}">
        <div class="d-flex flex-wrap" style="margin:0 -0.5rem">
          <router-link
            tag="div"
            :to="`/heroes/${hero._id}`"
            class="p-2 text-center"
            style="width:20%;"
            v-for="(hero, i) in category.heroList"
            :key="i"
          >
            <img class="w-100" :src="hero.avatar" alt="" />
            <div>{{ hero.name }}</div>
          </router-link>
        </div>
      </template>
    </m-list-card>
    <!-- end of heroesList-card-->
    <p>aaaaaaa</p>
    <p>aaaaaaa</p>
    <p>aaaaaaa</p>
    <p>aaaaaaa</p>
    <p>aaaaaaa</p>
    <p>aaaaaaa</p>
    <p>aaaaaaa</p>
    <p>aaaaaaa</p>
  </div>
</template>

<script>
import dayjs from "dayjs";
export default {
  name: "home",
  components: {},
  data() {
    return {
      swiperOption: {
        pagination: {
          el: ".pagination-home"
        },
        observer: true,
        observeParents: true,
        loop: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false
        }
      },
      icontexttest: {
        blz: "爆料站",
        gsz: "故事站",
        zbsc: "周边商城",
        tyf: "体验服",
        xrzq: "新人专区",
        whz: "荣耀传承",
        trz: "同人社区",
        zs: "王者营地",
        gzh: "公众号",
        bbjs: "版本介绍"
      },
      icontext: [
        {
          id: 1,
          icon: "blz",
          text: "爆料站",
          link: "/"
        },
        {
          id: 2,
          icon: "gsz",
          text: "故事站",
          link: "/"
        },
        {
          id: 3,
          icon: "zbsc",
          text: "周边商城",
          link: "/"
        },
        {
          id: 4,
          icon: "tyf",
          text: "体验服",
          link: "/"
        },
        {
          id: 5,
          icon: "xrzq",
          text: "新人专区",
          link: "/"
        },
        {
          id: 6,
          icon: "whz",
          text: "荣耀传承",
          link: "/"
        },
        {
          id: 7,
          icon: "trz",
          text: "同人社区",
          link: "/"
        },
        {
          id: 8,
          icon: "zs",
          text: "王者营地",
          link: "/"
        },
        {
          id: 9,
          icon: "gzh",
          text: "公众号",
          link: "/"
        },
        {
          id: 10,
          icon: "bbjs",
          text: "版本介绍",
          link: "/"
        }
      ],
      iscollapse: true,
      expand: "",
      activeClass: 0,
      cardNavs: ["热门", "新闻", "公告", "活动", "赛事"],
      newsCats: [],
      heroCats: []
    };
    // 测试数据
    /*     newsCats: [
        {
          name: "热门",
          newsList: new Array(5).fill(1).map(v => ({
            categoryName: "公告",
            title: "6月14日全服不停机更新公告",
            date: "06/01"
          }))
        },
        {
          name: "新闻",
          newsList: new Array(5).fill(1).map(v => ({
            categoryName: "新闻",
            title: "6月14日全服不停机更新公告",
            date: "06/01"
          }))
        },
        {
          name: "公告",
          newsList: new Array(5).fill(1).map(v => ({
            categoryName: "公告",
            title: "6月14日全服不停机更新公告",
            date: "06/01"
          }))
        },
        {
          name: "活动",
          newsList: new Array(5).fill(1).map(v => ({
            categoryName: "活动",
            title: "6月14日全服不停机更新公告",
            date: "06/01"
          }))
        },
        {
          name: "赛事",
          newsList: new Array(5).fill(1).map(v => ({
            categoryName: "赛事",
            title: "6月14日全服不停机更新公告",
            date: "06/01"
          }))
        }
      ], */
  },
  filters: {
    date(val) {
      return dayjs(val).format("MM/DD");
    }
  },
  methods: {
    collapse(iscollapse) {
      this.iscollapse = iscollapse;
      var navicons = this.$refs.navicons;
      var btnicon = this.$refs.btnicon;
      if (iscollapse == false) {
        navicons.style.height = 3.8462 + "rem";
        btnicon.style.transform = "rotateX(180deg)";
      } else {
        navicons.style.height = 13.2292 + "rem";
        btnicon.style.transform = "rotateX(0deg)";
      }
    },
    async fetchNewsCate() {
      const res = await this.$http.get("news/list");
      this.newsCats = res.data;
    },
    async fetchHeroCate() {
      const res = await this.$http.get("heroes/list");
      this.heroCats = res.data;
    }
  },
  created() {
    this.fetchNewsCate();
    this.fetchHeroCate();
  }
};
</script>
<style lang="scss">
@import "../assets/scss/variables";
// 1.1538rem
.pagination-home {
  .swiper-pagination-bullet {
    opacity: 1;
    border-radius: 0.1538rem;
    background: map-get($colors, "white");
    &.swiper-pagination-bullet-active {
      background: map-get($colors, "info");
    }
  }
}
.nav-icons {
  border-top: 1px solid $border-color;
  border-bottom: 1px solid $border-color;
  overflow: hidden;
  .navicons {
    overflow: hidden;
    .nav-item {
      width: 25%;
      border-left: 1px solid $border-color;

      &:nth-child(4n + 1) {
        border-left: none;
      }
    }
  }
}
.nav-btn {
  height: 2.6rem;
  line-height: 2.6rem;
  background: map-get($colors, "light");
  text-align: center;
  width: 100%;
  font-size: 0.24rem;
  color: map-get($colors, "dark-2");
  .btn-icon {
    display: inline-block;
    width: 0.7692rem;
    height: 0.7692rem;
    background: url("../assets/images/index.png") no-repeat 38.577% 52.076%;
    background-size: 28.8462rem 35rem;
    // transform: rotateX(180deg);
  }
}
</style>

