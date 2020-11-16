<template>
  <el-form
    :model="controls"
    :rules="rules"
    ref="form"
    @submit.native.prevent="onSubmit"
    :style="{width: '600px'}"
  >

    <h1 class="mb">Create New Post</h1>

    <el-form-item label="Title" prop="title">
      <el-input v-model="controls.title"/>
    </el-form-item>

    <el-upload
      class="mb2"
      drag
      ref="upload"
      action="https://jsonplaceholder.typicode.com/posts/"
      :on-change="handleImageChange"
      :auto-upload="false"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
      <div class="el-upload__tip" slot="tip">jpg/png files with a size less than 500kb</div>
    </el-upload>

    <el-form-item label="Text in format .md or .html" prop="text">
      <el-input
        type="textarea"
        v-model="controls.text"
        resize="none"
        :rows="10"
      />
    </el-form-item>

    <el-button class="mb" type="text" @click="previewDialog = true">
      Click to preview the post
    </el-button>

    <el-dialog title="Preview" :visible.sync="previewDialog">
      <div :key="controls.text">
        <vue-markdown>{{controls.text}}</vue-markdown>
      </div>
    </el-dialog>

    <el-form-item>
      <el-button
        type="primary"
        native-type="submit"
        :loading="loading"
      >
        Create
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'create',
  layout: 'admin',
  middleware: ['admin-auth'],
  head: {
    title: `Create post | ${process.env.appName}`
  },
  data: () => ({
    image: null,
    previewDialog: false,
    loading: false,
    controls: {
      title: '',
      text: ''
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
  methods: {
    handleImageChange(file) {
      this.image = file.raw
    },
    onSubmit() {
      this.$refs.form.validate(async valid => {
        if (valid && this.image) {
          this.loading = true

          const formData = {
            title: this.controls.title,
            text: this.controls.text,
            image: this.image
          }

          try {
            await this.$store.dispatch('post/create', formData)
            this.controls.text = ''
            this.controls.title = ''
            this.image = null
            this.$refs.upload.clearFiles()
            this.$message.success('Post created successfully')
          } catch (e) {} finally {
            this.loading = false
          }
        } else {
          this.$message.warning('Form is not valid')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
