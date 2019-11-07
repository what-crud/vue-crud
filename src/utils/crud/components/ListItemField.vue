<template>
  <span>
    <!-- html -->
    <span v-if="textMode === 'html'" v-html="value"></span>
    <!-- cropped text -->
    <span v-else-if="textMode === 'cropped'" class="cell-nowrap">
      {{ value | cropped }}
    </span>
    <!-- text -->
    <span v-else-if="textMode === 'text'">
      {{ value }}
    </span>
    <!-- file -->
    <span v-else-if="textMode === 'file'">
      <file-details :fieldInfo="fieldInfoToJSON(value)"></file-details>
    </span>
  </span>
</template>

<script>
import FileDetails from './FileDetails.vue'

export default {
  components: {
    FileDetails,
  },
  props: {
    value: {},
    textMode: {
      type: String,
      default: 'text',
    },
  },
  filters: {
    cropped (value) {
      let rvalue
      const maxLength = 40
      if (typeof value === 'string' || value instanceof String) {
        rvalue = value.length <= maxLength ? value : `${value.substring(0, maxLength - 3)}...`
      } else {
        rvalue = value
      }
      return rvalue
    },
  },
  methods: {
    fieldInfoToJSON (value) {
      return JSON.parse(value)
    },
  },
}
</script>
