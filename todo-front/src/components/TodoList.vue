<template>
  <div class="todo-list">
    <div class="card mb-3" v-for="todo in todos" :key="todo.id">
      <div class="card-body d-flex justify-content-between">
        <span>{{ todo.title }}</span>
        <span @click="deleteTodo(todo)">삭제</span>
        <!-- <button class="btn btn-delete">삭제</button> -->
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'TodoList',
  props: {
    todos: {
      type: Array,
      required: true,
    }
  },
  computed: {
    options() {
      return this.$store.getters.options
    }
  },
  methods: {
    deleteTodo(todo) {
      // store에서 꺼내서 쓰기 때문에 더이상 필요가 없다.
      // 이 모든데 options를 가지고 오기 위해서인데 options를 가지고 왔기 때문에 필요가 없다.

      // this.$session.start()
      // 설치한 라이브러리에서 뷰세션을 시작?
      // const token = this.$session.get('jwt')
      // 헤더에 어떤 정보를 담을지 옵션을 정해주는 것이다.

      // const options = {
      //   headers: {
      //     Authorization: 'JWT ' + token
      //   }
      // }
      const SERVER_IP = process.env.VUE_APP_SERVER_IP

      // todo의 id값을 그대로 가져와서 호출해주면 된다.
      axios.delete(`${SERVER_IP}/api/v1/todos/${todo.id}/`, this.options)
        .then(response => {
          console.log(response)
          // const targetTodo = this.todos.find(item => {
          //   return item === todo
          // })
          const idx = this.todos.indexOf(todo)
          if (idx > -1) {
            this.todos.splice(idx, 1)
          }
          // 여기 index 찾아서 제거 해버린다.
        })
        .catch(error => {
          console.log(error)
        })

    },
  },
}
</script>

<style>

</style>