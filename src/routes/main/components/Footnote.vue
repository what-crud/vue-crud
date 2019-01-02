<template>
    <div v-if="$store.state.footer">
        <v-footer class="primary pa-3 white--text" app>
            <v-spacer></v-spacer>
            <div>{{ $store.state.footerText }}</div>
        </v-footer>
    </div>
</template>
<script>
    export default {
        name: 'footnote'
    };
</script>