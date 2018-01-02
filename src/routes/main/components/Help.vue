<template>
  <v-layout row justify-center>
    <v-dialog
      v-model="$store.state.helpDialog"
      fullscreen
      transition="v-dialog-bottom-transition"
      :overlay="false"
      @keyup.enter="$store.state.helpDialog = false"
    >
      <v-card>
        <v-list three-line subheader>
          <v-subheader>User Controls</v-subheader>
        </v-list>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
    export default {
        name: 'help'
    };
</script>

