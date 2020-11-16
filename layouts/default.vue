<template>
  <el-container>
    <el-header>
      <app-navigation/>
    </el-header>
    <el-main>
      <nuxt/>
    </el-main>
    <el-footer/>
  </el-container>
</template>

<script>

export default {
  components: {
    AppNavigation: () => import('@/components/main/Navigation')
  }
}
</script>

<style>

</style>
