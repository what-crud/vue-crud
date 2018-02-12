<template>
  <div>
    <v-layout row>
      <v-text-field prepend-icon="attach_file" :rules="rules" single-line :value="name" :label="label" :required="required"
        @click.native="onFocus" ref="fileTextField"></v-text-field>
      <input type="file" :accept="accept" :multiple="false" :disabled="false" ref="fileInput" @change="onFileChange">
    </v-layout>
  </div>
</template>

<script>
  export default {
    name: 'upload-container',
    props: {
      label: {
        type: String,
        default: ''
      },
      rules: {
        type: Array,
        default: []
      },
      accept: {
        type: String,
        'default': '*'
      },
      required: {
          type: Boolean,
          default: false
      },
      item: Number
    },
    data() {
      return {
        forms: [],
        name: ''
      }
    },
    methods: {
      getFormData(files) {
        const forms = []
        for (const file of files) {
          const form = new FormData()
          form.append('data', file, file.name)
          forms.push(form)
        }
        return forms
      },
      onFocus() {
        if (!this.disabled) {
          this.$refs.fileInput.click()
        }
      },
      onFileChange($event) {
        const files = $event.target.files || $event.dataTransfer.files
        let filename
        if (files) {
          if (files.length > 0) {
            filename = [...files].map(file => file.name).join(', ')
          }
        } else {
          filename = $event.target.value.split('\\').pop()
        }
        this.$refs.fileTextField.inputValue = filename
        this.name = filename
        this.forms = this.getFormData(files)
        this.$emit('update', this.item, this.name, this.forms)
      }
    }
  }

</script>

<style scoped>
  input[type=file] {
    position: absolute;
    left: -99999px;
  }

</style>
