<template>
  <el-form
    :model="controls"
    :rules="rules"
    ref="form"
    @submit.native.prevent="onSubmit"
  >
    <h1>Add comment</h1>

    <el-form-item label="Your Name" prop="name">
      <el-input v-model="controls.name"/>
    </el-form-item>

    <el-form-item label="Input Message" prop="text">
      <el-input
        type="textarea"
        v-model="controls.text"
        resize="none"
        :rows="2"
      />
    </el-form-item>

    <el-form-item>
      <el-button
        type="primary"
        native-type="submit"
        icon="el-icon-s-promotion"
        :loading="loading"
      >
        Add a comment
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'CommentForm',
  props: {
    postId: {
      type: String,
      required: true
    }
  },
  data: () => ({
    loading: false,
    controls: {
      name: '',
      text: ''
    },
    rules: {
      name: [
        {required: true, message: 'Please input your name', trigger: 'blur'}
      ],
      text: [
        {required: true, message: 'Please input your message', trigger: 'blur'}
      ]
    }
  }),
  methods: {
    onSubmit() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          this.loading = true

          const formData = {
            name: this.controls.name,
            text: this.controls.text,
            postId: this.postId
          }

          try {
            const newComment = await this.$store.dispatch('comment/create', formData)
            this.$message.success('Comment Is Added')
            this.$emit('created', newComment)
          } catch (err) {
            this.loading = false;
          }
        }
      });
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
