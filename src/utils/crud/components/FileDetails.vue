<template>
    <span style="display: flex;align-items: center">
        <crud-button
          small
          color="secondary"
          @clicked="download(field)"
          icon="save"
          :tooltip="$t('global.details.files.download')"
        />
        <span :style="{ visibility: isImage(field.mime) ? 'visible' : 'hidden' }">
          <crud-button
            small
            color="primary"
            @clicked="showImage(field)"
            icon="search"
            :tooltip="$t('global.details.files.show')"
          />
        </span>
        <div style="padding-left:30px;">
            <h4>{{ field.filename }}</h4>
            <p>{{ field.mime }}</p>
            <p>{{ field.size | fileSize }}</p>
        </div>
    </span>
</template>

<script>
import CrudButton from './Button.vue'
import {
  mapGetters,
  mapMutations,
} from 'vuex'
import {
  humanFileSize,
  download,
} from '../helpers/functions'

export default {
  components: {
    CrudButton,
  },
  props: ['fieldInfo'],
  filters: {
    fileSize (size) {
      return size != null ? humanFileSize(size) : ''
    },
  },
  computed: {
    ...mapGetters('crud', ['filesPath']),
    field () {
      return Object.assign({
        filename: '',
        mime: '',
        size: null,
      }, this.fieldInfo)
    },
  },
  methods: {
    ...mapMutations('crud', ['openImageContainer']),
    download (item) {
      download(`${this.filesPath}/${item.path}`, item.filename)
    },
    isImage (mime) {
      const supportedMimeTypes = [
        'image/jpeg',
        'image/png',
        'image/gif',
      ]
      return supportedMimeTypes.includes(mime)
    },
    showImage (image) {
      this.openImageContainer(image)
    },
  },
}
</script>
