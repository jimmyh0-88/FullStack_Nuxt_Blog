<template>
  <article class="post">
    <header class="post-header">
      <div class="post-title">
        <nuxt-link to="/">
          <i class="el-icon-back"></i>
        </nuxt-link>
        <small>
          <i class="el-icon-date"></i>
          {{ post.date | date }}
        </small>
      </div>
      <div class="post-info">
        <h1>{{post.title}}</h1>
        <small>
          <i class="el-icon-view"></i>
          {{post.views}}
        </small>
      </div>
      <div class="post-body">
        <img
          class="post-image"
          :src="post.imageUrl"
          alt=""
        >
      </div>
    </header>
    <main class="post-content">
      <vue-markdown>{{post.text}}</vue-markdown>
    </main>

    <footer>
      <app-comment-form
        @created="createCommentHandler"
        v-if="canAddComment"
        :postId="post._id"
      />

      <div class="comments" v-if="post.comments.length">
        <app-comment
          v-for="comment in post.comments"
          :key="comment._id"
          :comment="comment"
        />
      </div>
      <div v-else class="text-center footer-text">No Comments</div>
    </footer>
  </article>
</template>

<script>

export default {
  components: {
    AppComment: () => import('@/components/main/Comment'),
    AppCommentForm: () => import('@/components/main/CommentForm')
  },
  validate({params}) {
    return Boolean(params.id)
  },
  head() {
    return {
      title: `${this.post.title} | ${process.env.appName}`
    }
  },
  data: () => ({
    canAddComment: true
  }),
  async asyncData({store, params}) {
    const post = await store.dispatch('post/fetchById', params.id)
    await store.dispatch('post/addView', post)
    return {
      post: {...post, views: ++post.views}
    }
  },
  methods: {
    createCommentHandler(comment) {
      this.post.comments.unshift(comment)
      this.canAddComment = false
    }
  }
}
</script>

<style lang="scss" scoped>

.post {
  max-width: 600px;
  margin: 0 auto;
}

.post-header {
  margin-bottom: 1rem;
}

.post-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.post-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.post-image {
  width: 100%;
  height: auto;
}

.post-content {
  margin-bottom: 2rem;
}

.footer-text {
  font-size: 1.5rem;
}
</style>
