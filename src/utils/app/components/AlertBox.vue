<template>
  <v-layout justify-center align-center>
    <v-alert
      v-model="alert.show"
      class="alert"
      :type="alert.type"
      value="true"
      transition="scale-transition"
      dismissible
    >
      <span v-html="alert.text"></span>
    </v-alert>
  </v-layout>
</template>
<script>
import {
  mapState,
} from 'vuex'

export default {
  name: 'alert',
  computed: {
    ...mapState(['alert']),
  },
}

</script>
<style scoped>
  .alert {
    position: fixed;
    top: 3px;
    margin: auto;
    z-index: 100000;
  }

</style>
