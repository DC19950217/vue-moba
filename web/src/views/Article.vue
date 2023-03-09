<template>
  <div class="page-article" v-if="model">
    <div class="d-flex py-3 px-2 border-bottom">
      <i @click="$router.go(-1)" class="iconfont icon-back text-info-1"></i>
      <div
        class="flex-1 text-info-1 text-ellipsis pr-3"
        style="font-weight: bold;"
      >
        {{ model.title }}
      </div>
      <div class="text-grey fs-xs">
        2019-06-21
      </div>
    </div>
    <div class="px-3 body fs-lg" v-html="model.body"></div>
    <div class="px-3 border-top py-2">
      <div class="d-flex ao-center">
        <i class="iconfont icon-Menu"></i>
        <span class="text-info-1 fs-lg ml-1" style="font-weight: bold;"
          >相关资讯</span
        >
      </div>
      <div class="pt-2 fs-lg">
        <router-link
        class="py-1"
          tag="div"
          :to="`/articles/${item._id}`"
          v-for="item in model.related"
          :key="item._id"
        >
          {{ item.title }}
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    id: { required: true }
  },
  data() {
    return {
      model: null
    };
  },
  watch:{
    id:'fetch',
    /* id(){
      this.fetch()
    } */
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`articles/${this.id}`);
      this.model = res.data;
    }
  },
  created() {
    this.fetch();
  }
};
</script>
<style lang="scss">
.page-article {
  .icon-back {
    font-size: 1.6923rem;
  }
  .body {
    img {
      width: 100%;
      height: auto;
    }
    iframe {
      width: 100%;
      height: auto;
    }
  }
}
</style>
