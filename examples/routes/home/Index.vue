<template>
  <v-container fluid fill-height style="min-height:80vh">
    <v-layout justify-center align-center>
      <img :src="require(`@/assets/images/${$store.state.logoLg}`)" width="400">
    </v-layout>
  </v-container>
</template>
<script>
  import {
    mapMutations,
  } from 'vuex'

  export default {
    data() {
      return {}
    },
    created() {
      this.setModule('home.name')
    },
    methods: {
      ...mapMutations([
        'setModule'
      ]),
    },
  }

</script>
