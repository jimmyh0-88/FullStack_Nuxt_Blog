<template>
  <el-card class="comment">
    <div class="comment-header">
      <strong>{{comment.name}}</strong>
      <small>
        <i class="el-icon-date"></i>
        {{ comment.date | date }}
      </small>
    </div>
    <div class="comment-text">
      {{comment.text}}
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'Comment',
  props: {
    comment: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.comment {
  margin-bottom: 1rem;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: .5rem;
}

.comment-text {
  white-space: pre-line;
}
</style>
