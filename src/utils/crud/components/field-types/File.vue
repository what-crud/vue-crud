<template>
  <field-wrapper>
    <v-row dense>
      <v-col
        cols="12"
        sm="5"
      >
        <v-btn
          :loading="uploadLoader"
          :class="fileUploadBtn(uploadStatus)"
          class="jbtn-file"
          dark
        >
          {{ $t('global.details.files.upload') }}
          <v-icon
            dark
            right
          >
            {{ fileUploadIcon(uploadStatus) }}
          </v-icon>
          <input
            :id="field.name"
            :multiple="false"
            :disabled="field.disabled"
            type="file"
            accept="*"
            ref="fileInput"
            @change="fileSelected($event, field)"
          />
        </v-btn>
      </v-col>
      <v-col
        cols="12"
        sm="7"
      >
        <v-text-field
          :rules="rules"
          :label="field.text"
          :value="filename"
          disabled
          hide-details
        ></v-text-field>
      </v-col>
    </v-row>
  </field-wrapper>
</template>
<script>

import {
  mapState,
  mapGetters,
} from 'vuex'

import FieldWrapper from './components/FieldWrapper.vue'

export default {
  name: 'FileField',
  components: {
    FieldWrapper,
  },
  props: [
    'value',
    'fieldType',
    'field',
    'rules',
  ],
  data () {
    return {
      file: undefined,
      uploadStatus: 'ready',
      uploadLoader: false,
    }
  },
  computed: {
    ...mapState('crud', [
      'details',
      'path',
      'prefix',
    ]),
    ...mapGetters('crud', ['uploadPath']),
    filename () {
      let filename
      if (this.fieldType === 'file' && this.file !== undefined && this.file !== null) {
        try {
          filename = JSON.parse(this.file).filename
        } catch (e) {
          return ''
        }
      }
      return filename
    },
  },
  methods: {
    onBlur () {
      this.$emit('input', this.text)
      this.$emit('change')
    },
    fileUploadBtn (status) {
      const btnClasses = {
        ready: 'primary',
        success: 'success',
        error: 'error',
      }
      return btnClasses[status]
    },
    fileUploadIcon (status) {
      const icons = {
        ready: 'save_alt',
        success: 'check',
        error: 'close',
      }
      return icons[status]
    },
    fileSelected (e, field) {
      const file = e.target.files[0]
      if (file) {
        this.uploadLoader = true
        const formData = new FormData()
        formData.append('file', file)
        formData.append('module', this.prefix)
        formData.append('table', this.path)
        formData.append('field', field.column)
        this.$http.post(this.uploadPath, formData, {}).then(
          (response) => {
            if (response.body.status === 0) {
              this.file = JSON.stringify({
                filename: file.name,
                mime: file.type,
                size: file.size,
                path: response.body.path,
                uploaded: 1,
              })
              this.$emit('input', this.file)
              this.uploadStatus = 'success'
            } else {
              this.uploadStatus = 'error'
              if (response.body.status === -1) {
                this.openAlertBox([
                  'alertError',
                  response.body.msg,
                ])
              } else if (response.body.status === -2) {
                this.openAlertBox([
                  'alertValidationError',
                  response.body.msg,
                ])
              }
            }
            this.uploadLoader = false
          },
          () => {
            this.uploadLoader = false
            this.uploadStatus = 'error'
          },
        )
      }
    },
  },
  watch: {
    value: {
      immediate: true,
      handler (val) {
        this.file = val
      },
    },
    reload: function (val) {
      if (val) {
        this.uploadLoader = false
        this.uploadStatus = 'ready'
      }
    },
    uploadStatus: function (val) {
      if (val !== 'ready') {
        setTimeout(() => {
          this.uploadStatus = 'ready'
        }, 1000)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.jbtn-file {
  cursor: pointer;
  position: relative;
  overflow: hidden;
  margin: 0px;
  width: 100%;
}
.jbtn-file input[type='file'] {
  position: absolute;
  top: 0;
  right: 0;
  min-width: 100%;
  min-height: 100%;
  font-size: 100px;
  text-align: right;
  filter: alpha(opacity=0);
  opacity: 0;
  outline: none;
  cursor: inherit;
  display: block;
}
</style>
