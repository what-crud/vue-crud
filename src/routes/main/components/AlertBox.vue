<template>
  <v-alert v-model="alert.show" class="alert" :color="alert.color" :icon="alert.icon" value="true">
    {{ alert.text }}
  </v-alert>
</template>
<script>
  import {
    mapState
  } from 'vuex'

  export default {
    name: 'alert',
    computed: {
      ...mapState([
        'alert'
      ]),
    }
  };

</script>
<style scoped>
  .alert {
    position: fixed;
    bottom: 20px;
    z-index: 100000
  }

</style>
