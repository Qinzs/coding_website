<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <h1>{{user}}</h1>
    <h1>{{pass}}</h1>
  </div>
</template>

<script>
// @ is an alias to /src
import { ref } from 'vue'
import $ from 'jquery'
export default {
  name: 'HomeView',
  setup: () => {
    let user = ref('')
    let pass = ref('')
      $.ajax({
        url: 'http://127.0.0.1:3000/pk/user',
        type: 'GET',
        success: function (data) {
          user.value = data.name
          pass.value = data.email
        }
      })
  
  return {
    user,
    pass
  }
}

}
</script>
