<template>
    <div>
        <v-footer class="primary pa-3 white--text" app>
            <v-spacer></v-spacer>
            <div>© {{ new Date().getFullYear() }}</div>
        </v-footer>
    </div>
</template>
<script>
    export default {
        name: 'footnote'
    };
</script>