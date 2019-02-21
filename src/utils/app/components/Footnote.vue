<template>
    <div>
        <v-footer class="primary pa-3 white--text" app>
            <v-spacer></v-spacer>
            <div>
                <slot></slot>
            </div>
        </v-footer>
    </div>
</template>
<script>
    export default {
        name: 'footnote',
    };
</script>