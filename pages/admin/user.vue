<template>
  <el-form
    :model="controls"
    :rules="rules"
    ref="form"
    @submit.native.prevent="onSubmit"
    :style="{width: '600px'}"
  >
    <h2>Create New User</h2>

    <el-form-item label="Login" prop="login">
      <el-input v-model.trim="controls.login" />
    </el-form-item>

    <div class="mb2">
      <el-form-item label="Password" prop="password">
        <el-input v-model.trim="controls.password" type="password" />
      </el-form-item>
    </div>

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
  name: 'user',
  layout: 'admin',
  middleware: ['admin-auth'],
  head: {
    title: `Create user | ${process.env.appName}`
  },
  data: () => ({
    loading: false,
    controls: {
      login: '',
      password: ''
    },
    rules: {
      login: [
        { required: true, message: 'Please input login', trigger: 'blur' }
      ],
      password: [
        { required: true, message: 'Please input password', trigger: 'blur' },
        { min: 5, max: 30, message: 'Length should be 5 to 30', trigger: 'blur' }
      ]
    }
  }),
  methods: {
    onSubmit() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          this.loading = true

          try {
            const formData = {
              login: this.controls.login,
              password: this.controls.password
            }

            await this.$store.dispatch('auth/createUser', formData)
            this.$message.success('User created successfully')
            this.controls.login = ''
            this.controls.password = ''
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

</style>

