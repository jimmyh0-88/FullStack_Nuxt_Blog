<template>
  <el-card
    shadow="hover"
    :body-style="{padding: 0}"
    class="post"
  >
    <header slot="header" class="post-header">
      <h2>{{post.title}}</h2>

      <small>
        <i class="el-icon-date"></i>
        {{post.date | date('date')}}
      </small>
    </header>

    <div class="post-body">
      <img
        class="post-image"
        :src="post.imageUrl"
        alt="">
    </div>

    <footer class="post-footer">
      <el-button @click="openPost">Open</el-button>
      <span>
        <i class="el-icon-message"></i>
        {{post.comments.length}}
      </span>
    </footer>
  </el-card>
</template>

<script>
export default {
  name: 'Post',
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  methods: {
    openPost() {
      const id = this.post._id
      this.$router.push(`/post/${id}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.post {
  margin-bottom: 1.5rem;
}

.post-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.post-image {
  width: 100%;
  height: auto;
}

.post-footer {
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
