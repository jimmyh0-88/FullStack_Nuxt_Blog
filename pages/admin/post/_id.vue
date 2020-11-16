<template>
  <div class="page-wrap">
    <el-breadcrumb separator="/" class="mb">
      <el-breadcrumb-item to="/admin/list">Posts</el-breadcrumb-item>
      <el-breadcrumb-item>{{post.title}}</el-breadcrumb-item>
    </el-breadcrumb>

    <el-form
      :model="controls"
      :rules="rules"
      ref="form"
      @submit.native.prevent="onSubmit"
    >
      <el-form-item label="Title" prop="title">
        <el-input
          v-model="controls.title"
        />
      </el-form-item>

      <el-form-item label="Text in format .md or .html" prop="text">
        <el-input
          type="textarea"
          v-model="controls.text"
          resize="none"
          :rows="10"
        />
      </el-form-item>

      <div class="mb">
        <small class="mr">
          <i class="el-icon-time"></i>
          <span>
            {{ post.date | date }}
          </span>
        </small>

        <small>
          <i class="el-icon-view"></i>
          <span>{{ post.views }}</span>
        </small>
      </div>

      <el-form-item>
        <el-button
          type="primary"
          native-type="submit"
          icon="el-icon-refresh-left"
          :loading="loading"
        >
          Update
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'id',
  layout: 'admin',
  middleware: ['admin-auth'],
  head() {
    return {
      title: `${this.post.title} | ${process.env.appName}`
    }
  },
  validate({params}) {
    return Boolean(params.id)
  },
  async asyncData({store, params}) {
    const post = await store.dispatch('post/fetchAdminById', params.id)
    return {post}
  },
  data: () => ({
    loading: false,
    controls: {
      text: '',
      title: ''
    },
    rules: {
      text: [
        { required: true, message: 'Please input some text', trigger: 'blur' }
      ],
      title: [
        { required: true, message: 'Please input some title', trigger: 'blur' }
      ]
    }
  }),
  mounted() {
    this.controls.text = this.post.text
    this.controls.title = this.post.title
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          this.loading = true

          const formData = {
            text: this.controls.text,
            title: this.controls.title,
            id: this.post._id
          }

          try {
            await this.$store.dispatch('post/update', formData)
            this.$message.success('Post updated')
            this.loading = false
          } catch (e) {
            this.loading = false
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.page-wrap {
  width: 600px;
}

.mr {
  margin-right: 2rem;
}
</style>
