<template>
  <el-card
    shadow="always"
    :style="{width: '500px'}"
  >
    <el-form
      :model="controls"
      :rules="rules"
      ref="form"
      @submit.native.prevent="onSubmit"
    >
      <h2>Login to admin panel</h2>

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
          Sign in
        </el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  name: 'login',
  layout: 'empty',
  head: {
    title: `Login to admin panel | ${process.env.appName}`
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
        { min: 5, max: 30, message: 'Length should be 5 to 30', trigger: 'blur'}
      ]
    }
  }),
  mounted() {
    const {message} = this.$route.query

    switch (message) {
      case 'login':
        this.$message.warning('Sign in first')
        break
      case 'logout':
        this.$message.success('Logged out successfully')
        break
      case 'session':
        this.$message.warning('Session has expired, please login again')
        break
    }
  },
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

            await this.$store.dispatch('auth/login', formData)
            await this.$router.push('/admin')

          } catch (e) {
            this.loading = false
          }
        }
      })
    }
  }
}
</script>
