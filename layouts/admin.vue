<template>
  <div class="admin-wrap">
    <el-container :style="{height: '100%'}">
      <el-aside width="250px">
        <app-aside />
      </el-aside>
      <el-main>
        <nuxt/>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'admin',
  components: {
    AppAside: () => import('@/components/admin/Aside')
  },
  computed: {
    error() {
      return this.$store.getters.error
    }
  },
  watch: {
    error(value) {
      this.$message.error(value.response.data.message)
    }
  }
}
</script>

<style lang="scss" scoped>
.admin-wrap {
  width: 100%;
  height: 100vh;
}
</style>
