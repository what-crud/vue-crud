<template>

  <field-wrapper :label="field.text">
    <tiptap-vuetify
      v-model="content"
      :extensions="extensions"
      :card-props="{ flat: true }"
      :editor-properties="editorProperties"
    />
  </field-wrapper>
</template>

<script>
import FieldWrapper from './components/FieldWrapper.vue'
import {
  TiptapVuetify,
  Heading,
  Bold,
  Italic,
  Strike,
  Underline,
  Code,
  Paragraph,
  BulletList,
  OrderedList,
  ListItem,
  Link,
  Blockquote,
  HardBreak,
  HorizontalRule,
  History,
  Image,
} from 'tiptap-vuetify'

export default {
  name: 'RichTextBoxField',
  components: {
    FieldWrapper,
    TiptapVuetify,
  },
  props: {
    value: {
      type: String,
      default: '',
    },
    field: {
      type: Object,
    },
  },
  data: () => ({
    content: '',
    extensionsMap: {
      Heading,
      Bold,
      Italic,
      Strike,
      Underline,
      Code,
      Paragraph,
      BulletList,
      OrderedList,
      ListItem,
      Link,
      Blockquote,
      HardBreak,
      HorizontalRule,
      History,
      Image,
    },
    availableExtensions: [
      'History',
      'Bold',
      'Italic',
      'Underline',
      'Strike',
      'Paragraph',
      'ListItem',
      'BulletList',
      'OrderedList',
      {
        name: 'Heading',
        options: {
          levels: [
            1,
            2,
            3,
            4,
            5,
            6,
          ],
        },
      },
      'HardBreak',
      'HorizontalRule',
      'Blockquote',
      'Code',
      'Link',
      'Image',
    ],
  }),
  computed: {
    extensions () {
      const extensions = []
      const selectedExtensions = this.field.richTextBoxOperations || this.availableExtensions
      for (const extension of selectedExtensions) {
        if (extension) {
          if (typeof extension === 'string' && this.extensionsExists(extension)) {
            extensions.push(this.extensionsMap[extension])
          } else if (extension.name && typeof extension.name === 'string' && this.extensionsExists(extension.name)) {
            extensions.push([
              this.extensionsMap[extension.name],
              {
                options: extension.options || {},
              },
            ])
          }
        }
      }
      return extensions
    },
    editorProperties () {
      return {
        onBlur: this.onBlur,
        editable: !this.disabled,
      }
    },
  },
  methods: {
    extensionsExists (extensionName) {
      return this.extensionsMap[extensionName] !== undefined
    },
    onBlur () {
      this.$emit('input', this.content)
    },
  },
  watch: {
    value: {
      immediate: true,
      handler (val) {
        this.content = val
      },
    },
  },
}
</script>
