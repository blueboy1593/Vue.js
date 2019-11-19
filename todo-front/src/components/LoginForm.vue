<template>
  <div class="login-div">
    <!-- v-if 와 v-else로 로딩일 때와 로딩 아닐때 보여줄 것 구분. -->
    <div v-if="loading" class="spinner-border" role="status">
      <span class="sr-only">Loading...</span>
    </div>

    <div v-else class="login-form">
      <!-- 이걸 이렇게...? 그냥 빈 리스트도 있는 것으로 취급하기 때문에 length가 1 이상이면 되게 하는거네... -->
      <div v-if="errors.length" class="alert alert-danger">
        <h4>다음의 오류를 해결해주세요.</h4>
        <hr>
        <!-- 조금 어려운데 v-bind는 꼭 key 값을 함께 해줘야하고, errordpsms index값이 있다. -->
        <div v-for="(error, idx) in errors" v-bind:key="idx">{{ error }}</div>
      </div>


      <div class="form-group">
        <label for="id">ID</label>
        <input type="text" id="id" class="form-control" placeholder="아이디를 입력해주세요" v-model="credentials.username">
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" class="form-control" placeholder="비밀번호를 입력해주세요" v-model="credentials.password">
      </div>
      <button class="btn btn-success" @click="login">로그인</button>
    </div>
    
  </div>
</template>

<script>
import axios from 'axios'
import router from '@/router'
// 홈 이라는 페이지에 사용자를 보내주겠다.


export default {
  name: 'LoginForm',
  data() {
    return {
      credentials: {
        username: '',
        password: '',
      },
      loading: false,
      errors: [],
    }
  },

  methods: {
    login() {
      if(this.checkForm()) {
        this.loading = true
        // http://127.0.0.1:8000
        const SERVER_IP = process.env.VUE_APP_SERVER_IP
        // 이거 기입하는거는....음. 좀 암기 측면인가 암튼 기억 잘 해둬야겠다.

        axios.post(SERVER_IP + '/api-token-auth/', this.credentials)
          .then(response => {

            // 세션을 초기화. 사용하겠다.
            this.$session.start()

            // 응답결과를 세션에 저장하겠다.
            // this.$session.set(key, value)
            this.$session.set('jwt', response.data.token)

            this.loading = false

            // vue router 를 통해 특정 페이지로 이동
            router.push('/')

          })
          .catch(error => {
            console.error(error)
            this.loading = false
          })
      } else {
        console.log('제대로해라')
      }
    },
    checkForm() {
      // 처음에는 에러 메세지 초기화를 해주고 확인을 하면서 채우는 것.
      this.errors = []
      if(!this.credentials.username) {
        this.errors.push('아이디를 입력해주세요.')
      }
      if(this.credentials.password.length < 8) {
        this.errors.push('비밀번호는 8글자 이상 입력해주세요.')
      }
      if(this.errors.length === 0) {
        return true
      } else {
        return false
      }
    },
  },
}
</script>

<style>

</style>