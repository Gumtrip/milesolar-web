<template>
  <div class="wrapper">
    <Bread :breads="breadList"></Bread>
    <section id="articleBox">
      <ul v-if="articles" v-loading="loading">
        <li v-for="(article,key) in articles" :key="key" class="article">
          <router-link :to="{name:'article.show',params:{id:article.id}}">
            <div class="img flexPic">
              <img :src="article.sm_img" alt="">
            </div>
            <div class="info">
              <h3 class="title" v-text="article.title"></h3>
              <p class="time" v-text="article.create_date"></p>
              <p class="desc" v-text="article.intro"></p>
            </div>
          </router-link>
        </li>
      </ul>
      <div v-show="more_data" class="text_center">
        <el-button :loading="loading" type="primary" @click="getArticles">MORE PRODUCTS</el-button>
      </div>
    </section>

  </div>
</template>

<script>
import Bread from '@/components/utils/BreadCrumb'
export default {
  name: 'Index',
  components: { Bread },
  data() {
    return {
      articles: [],
      loading: true,
      more_data: true,
      page: 1,
      postData: {},
      breadList: [
        { title: 'News', url: '/articles' }
      ]
    }
  },
  computed: {},
  created() {
    this.getArticles()
  },
  methods: {
    async getArticles() {
      if (this.more_data) {
        this.loading = true
        const res = await this.$api.articles({
          filter: this.postData,
          page: this.page
        })
        this.articles = this.articles.concat(res.data.data)
        if (res.data.meta.current_page >= res.data.meta.last_page) {
          this.more_data = false
        }
        this.page++
        this.loading = false
      }
    }
  }
}
</script>

<style scoped lang="scss">
  #articleBox{padding-bottom: 30px}
  .article{
    border-bottom: 1px solid #e5e5e5;
    margin-bottom: 15px;
    padding-bottom: 15px;
    a{display: flex;}
    .img{flex: 0 0 22%}
    .info{flex: 0 0 78%;padding-left:25px;box-sizing: border-box}
    .title{font-size: 24px;color: #555;margin-bottom: 10px}
    .time{font-size: 14px;color: #999;line-height: 20px;margin-bottom: 10px}
    .desc{font-size: 14px;
      color: #999;
      line-height: 150%;
      max-height: 63px;
      overflow: hidden;
      margin-bottom: 10px;
      margin-top: 5px;
      display: block;
    }
  }
</style>
