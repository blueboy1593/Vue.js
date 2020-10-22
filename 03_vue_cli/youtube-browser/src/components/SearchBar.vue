<template>
  <div>
    <input type="text" v-on:input="onInput" />
  </div>
</template>

<script>

export default {
  name: 'SearchBar',  
  methods: {
    onInput: function(event) {
      this.$emit('inputChange',) // inputchange 이베ㅐㄴ트 발성해 알림
      console.log(event.target.value)
    }
  }
}
</script>

<style scoped>
  input {
    width: 75%;
  }
  
  div {
    text-align: center;
    margin: 20px;
  }
</style>
