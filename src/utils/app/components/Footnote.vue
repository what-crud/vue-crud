<template>
    <div>
        <v-footer class="primary pa-3 white--text" app>
            <slot name="left"></slot>
            <v-spacer></v-spacer>
            <slot name="center"></slot>
            <v-spacer></v-spacer>
            <slot name="right"></slot>
        </v-footer>
    </div>
</template>
<script>
    export default {
        name: 'footnote',
    };
</script>