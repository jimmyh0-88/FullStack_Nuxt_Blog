<template>
  <div>
    <h1>Posts Analytics</h1>
    <app-analytics-chart
      title="Number of views"
      :labels="views.labels"
      :data="views.data"
    />

    <app-analytics-chart
      title="Number of comments"
      :labels="comments.labels"
      :data="comments.data"
    />
  </div>
</template>

<script>
export default {
  name: 'index',
  layout: 'admin',
  middleware: ['admin-auth'],
  head: {
    title: `Analytics | ${process.env.appName}`
  },
  components: {
    AppAnalyticsChart: () => import('@/components/admin/AnalyticsChart')
  },
  async asyncData({store}) {
    const {views, comments} = await store.dispatch('post/getAnalytics')
    return {views, comments}
  }
}
</script>

