<template>
  <v-container fluid fill-height style="min-height:80vh;background-color: white;">
    <v-layout justify-center align-center>
      <img :src="require(`@/assets/images/vue-crud-lg.png`)" width="400">
    </v-layout>
  </v-container>
</template>
<script>
import {
  mapMutations,
} from 'vuex'

export default {
  data () {
    return {}
  },
  created () {
    this.setModule('home.name')
    this.setPage(null)
  },
  methods: {
    ...mapMutations('app', [
      'setModule',
      'setPage',
    ]),
  },
}

</script>
