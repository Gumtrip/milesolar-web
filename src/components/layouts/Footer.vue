<template>
  <footer id="footer">
    <ul class="wrapper">
      <li class="logo navList">
        <router-link to="/">
          <img src="../../assets/logo.png" alt="">
        </router-link>
      </li>
      <li class="navList product">
        <h3>PRODUCTS</h3>
        <ul v-if="product_categories">
          <li>
            <h4><router-link to="/products">ALL PRODUCTS</router-link> </h4>
          </li>
          <li v-for="(category,key) in product_categories" :key="key">
            <h4><router-link :to="{name:'products',query:{category_id:category.id}}" v-text="category.title"></router-link> </h4>
          </li>
        </ul>
      </li>
      <li class="navList">
        <h3>ABOUT US</h3>
        <ul>
          <li v-for="(article,key) in aboutsUs" :key="key">
            <h4><router-link :to="{name:'article.show',params:{id:article.id}}" v-text="article.title"></router-link> </h4>
          </li>

        </ul>
      </li>
      <li class="navList">
        <h3>CONTACT US</h3>
        <ul>
          <li>
            <h4><router-link to="/contact_us">CONTACT US</router-link> </h4>
          </li>
        </ul>
      </li>
    </ul>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  components: {},
  data() {
    return {
      product_categories: [],
      aboutsUs: []
    }
  },
  computed: {},
  created() {
    this.getCategories()
    this.getAboutUs()
  },
  methods: {
    getCategories() {
      this.$api.productCategories({
        depth: 1,
        take: 4,
        sort: 'default'
      }).then((response) => {
        this.product_categories = response.data
      })
    },
    getAboutUs() {
      this.$api.articles({
        category_id: 2,
        take: 3,
        sort: 'id'
      }).then((response) => {
        this.aboutsUs = response.data
      })
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../../styles/variables";
  #footer{background: #343434;padding-top: 10px;overflow: hidden;
    .wrapper{display: flex;padding-top: 20px}
    .logo img{max-width: 150px}
    .navList{flex:0 0  20%;;padding-bottom:10px;margin-bottom: 10px;box-sizing: border-box;}
    .product{flex: 0 0 35%}

    h3{position: relative;padding-bottom: 10px;color: #fff;font-size: 18px;text-transform: uppercase;margin-bottom: 15px;}
    h3:after{border-bottom: 1px solid $main_green;width: 60px;
      height: 3px;
      background: $main_green;
      position: absolute;
      left: 0;
      top: 100%;
      content: '';}
    h4{
      a{display: block;
        font-size: 16px;
        line-height: 30px;
        height: 30px;
        overflow: hidden;
        color: #a9a9a9;
      }
    }
  }
</style>
