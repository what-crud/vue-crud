<template>
  <v-layout row justify-center>
    <v-dialog v-model="$store.state.profileDialog">
      <v-card>
        <v-card-title>
          <span class="headline">User Profile</span>
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="blue--text darken-1" flat @click.native="$store.state.profileDialog = false">Zamknij</v-btn>
          <v-btn class="blue--text darken-1" flat @click.native="$store.state.profileDialog = false">Zapisz</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
    export default {
        name: 'profile'
    };
</script>