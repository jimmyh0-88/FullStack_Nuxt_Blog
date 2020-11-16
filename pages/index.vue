<template>
  <el-row type="flex" justify="center">
    <el-col :xs="24" :sm="18" :md="18" :lg="10">
      <app-post
        v-for="post in posts"
        :key="post._id"
        :post="post"
      />
    </el-col>
  </el-row>
</template>

<script>

export default {
  head: {
    title: `Home | ${process.env.appName}`
  },
  async asyncData({store}) {
    const posts = await store.dispatch('post/fetch')
    return {posts}
  },
  components: {
    AppPost: () => import('@/components/main/Post')
  }
}
</script>

<style>

</style>
