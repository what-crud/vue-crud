<template>
  <v-container fluid fill-height>
    <v-layout justify-center align-center>
      <img src="../../../../assets/images/logo.png" width="200">
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
