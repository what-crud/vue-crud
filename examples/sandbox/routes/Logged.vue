<template>
  <div>
    You are logged in
    <v-btn @click="logoutAttempt()">Logout</v-btn>

    <ul>
      <li>
        <router-link to="/app">App layout demo/sandbox</router-link>
      </li>
      <li>
        <router-link to="/login">Login demo/sandbox</router-link>
      </li>
      <li>
        <router-link to="/CRUD">CRUD demo/sandbox</router-link>
      </li>
      <li>
        <a
          href="https://github.com/what-crud/vue-crud"
          target="_blank"
        >GitHub</a>
      </li>
      <li>
        <a
          href="https://vue-crud.github.io/"
          target="_blank"
        >Docs</a>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions('auth', ['logout']),
    logoutAttempt () {
      this.logout().then(() => {
        this.$router.push({ path: '/login' })
      })
    },
  },
}

</script>
