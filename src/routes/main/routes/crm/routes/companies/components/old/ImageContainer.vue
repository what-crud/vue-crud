<template>
  <v-dialog v-model="imageContainer.show" max-width="1000">
    <v-card class="text-xs-center">
      <v-card-title primary-title>
      </v-card-title>
      <v-card-text>
        <div>
          <h3 class="headline mb-0">{{ imageContainer.item.description }}</h3>
          <div>{{ imageContainer.item.filename }}</div>
          <div>{{ imageContainer.item.size }}</div>
        </div>
        <img :src="image" style="max-height: 50vh;">
      </v-card-text>
      <v-card-media></v-card-media>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn flat color="black" @click="closeImageContainer()">{{ $t('buttons.close') }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import {
    mapState,
    mapMutations
  } from 'vuex'

  export default {
    computed: {
      ...mapState([
        'filesPath'
      ]),
      ...mapState('crm', [
        'imageContainer'
      ]),
      image() {
          return this.imageContainer.item.meta ? this.filesPath + this.imageContainer.item.meta.path + '/' + this.imageContainer.item.filename : ''
      }
    },
    methods: {
      ...mapMutations('crm', [
        'closeImageContainer'
      ])
    },
    i18n: {
      messages: {
        pl: {
          buttons: {
            close: 'Zamknij',
          },
        },
        en: {
          buttons: {
            close: 'Close',
          },
        },
      }
    }
  }

</script>
