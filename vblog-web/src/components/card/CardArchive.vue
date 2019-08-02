<template>

  <el-card :body-style="{ padding: '8px 18px' }">
    <div slot="header" class="me-category-header">
      <span>{{cardHeader}}</span>
    </div>

    <ul class="me-category-list">
      <li v-for="a in archives" :key="a.date"  class="me-category-item" @click="view(a.date)"><a>{{a.date}}</a>
      </li>
    </ul>
  </el-card>

</template>

<script>
  export default {
    name: "CardArchive",
    props: {
      cardHeader: {
        type: String,
        required: true
      },
      archives: {
        type: Array,
        required: true
      }
    },
    methods: {
      view(date) {
        console.log(date);
        this.$router.push({path: `/archives/${date}`})
      }
    }
  }
</script>

<style scoped>

  .me-category-header {
    font-weight: 600;
  }

  .me-category-list {
    list-style-type: none;
  }

  .me-category-item {
    display: inline-block;
    width: 40%;
    padding: 4px;
    font-size: 14px;
    color: #5FB878;
  }

  .me-category-item a:hover {
    text-decoration: underline;
  }

</style>
