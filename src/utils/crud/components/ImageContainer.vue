<template>
  <v-dialog
    v-model="imageContainer.show"
    max-width="1000"
  >
    <v-card class="text-xs-center">
      <v-card-title primary-title>
      </v-card-title>
      <v-card-text>
        <div>
          <h1>{{ imageContainer.item.filename }}</h1>
          <div>{{ imageContainer.item.mime }}</div>
          <div>{{ imageContainer.item.size | fileSize }}</div>
        </div>
        <img
          :src="image"
          style="max-height: 50vh;"
        >
      </v-card-text>
      <v-responsive></v-responsive>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          text
          color="black"
          @click="closeImageContainer()"
        >
          {{ $t('global.details.buttons.close') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {
  mapState,
  mapGetters,
  mapMutations,
} from 'vuex'
import {
  humanFileSize,
} from '../helpers/functions'

export default {
  computed: {
    ...mapState('crud', ['imageContainer']),
    ...mapGetters('crud', ['filesPath']),
    image () {
      return this.imageContainer.show ? `${this.filesPath}/${this.imageContainer.item.path}/${this.imageContainer.item.filename}` : ''
    },
  },
  filters: {
    fileSize (size) {
      return humanFileSize(size)
    },
  },
  methods: {
    ...mapMutations('crud', ['closeImageContainer']),
  },
}
</script>
