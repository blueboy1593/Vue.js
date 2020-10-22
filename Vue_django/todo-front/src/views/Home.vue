<template>
  <div class="home">
    <h1>Todo</h1>
    <TodoInput @createTodo="createTodo" />
    <TodoList :todos="todos"/>
  </div>
</template>

<script>
import axios from 'axios'
// 이것도 store로 접근을 하다보니깐 이제 필요가 없어지는 것이다.
// import jwtDecode from 'jwt-decode'  // JWT 의 payload 값을 해석해서 보여주는 library
import { mapGetters } from 'vuex' // import vuex from 'vuex'; vuex.mapGetters 똑같은 문법 이라고 한다.
import TodoList from '@/components/TodoList' 
import router from '@/router'
import TodoInput from '@/components/TodoInput'


export default {
  name: 'Home',
  data() {
    return {
      todos: [],
    }
  },
  computed: {
    // getters가 가지고 있는 모든 친구들을 computed 에 쫙 뿌려준다고 생각하면 된다.
    ...mapGetters([
      'isLoggedIn',
      'options',
      'userId'
    ])
  },
  components: {
    TodoList,
    TodoInput,
  },
  methods: {
    // 사용자 로그인 유무를 확인하여 로그인되어있지 않을 시 로그인 페이지로 보내겠다.
    checkLoggedIn() {

      // 여기도 이제 필요 없어짐에 따라 지우는 것.
      // 1. 세션을 시작해서
      // this.$session.start()
      // 2. 'jwt' 가 있는지 확인하겠다.
      // if(!this.$session.has('jwt')){

      if(!this.isLoggedIn) {
        // 로그인 페이지로 보내겠다.
        router.push('/login')
      }
    },

    // 우리가 만든 django API 서버로 todos 를 달라는 요청을 보낸 뒤
    // todos data 에 할당하는 함ㅅ
    getTodo() {
      // 마찬가지로 다 삭제
      // this.$session.start()
      // const token = this.$session.get('jwt')
      // const user_id = jwtDecode(token).user_id
      const SERVER_IP = process.env.VUE_APP_SERVER_IP
      // const options = {
      //   headers: {
      //     Authorization: 'JWT ' + token
      //   }
      // }

      axios.get(`${SERVER_IP}/api/v1/users/${this.userId}/`, this.options)
        .then(response => {
          this.todos = response.data.todo_set
        })
        .catch(error => {
          console.error(error)
        })
    },
    createTodo(title) {
      // this.$session.start()
      // const token = this.$session.get('jwt')
      const SERVER_IP = process.env.VUE_APP_SERVER_IP
      // const user_id = jwtDecode(token).user_id
      // const options = {
      //   headers: {
      //     Authorization: 'JWT ' + token
      //   }
      // }
      // 요청을 보낼 data 를 작성
      const data = {
        title,
        user: this.userId
      }

      axios.post(`${SERVER_IP}/api/v1/todos/`, data, this.options)
        .then(response => {
          this.todos.push(response.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
  },

  // Vue 가 화면에 그려지면 실행하는 함수
  mounted() {
    if (this.isLoggedIn){
      this.checkLoggedIn()
      this.getTodo()
    }
  },
  watch: {
    isLoggedIn() {
      this.getTodo()
    }
  },
}
</script>

<style>

</style>