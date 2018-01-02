<template>
    <v-footer class="pa-3 blue white--text" app>
      <v-spacer></v-spacer>
      <div>© {{ new Date().getFullYear() }}</div>
    </v-footer>
</template>
<script>
    export default {
        name: 'footnote'
    };
</script>