<template>
  <tiptap-vuetify
    v-model="content"
    :extensions="extensions"
    :card-props="{ flat: true }"
    :editor-properties="editorProperties"
  />
</template>

<script>
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
  components: { TiptapVuetify },
  props: {
    value: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    extensions: [
      History,
      Blockquote,
      Link,
      Underline,
      Strike,
      Italic,
      ListItem,
      BulletList,
      OrderedList,
      [
        Heading,
        {
          options: {
            levels: [1, 2, 3],
          },
        },
      ],
      Bold,
      Code,
      HorizontalRule,
      Paragraph,
      HardBreak,
      Image,
    ],
    content: ``,
  }),
  computed: {
    editorProperties () {
      return {
        onBlur: this.onBlur,
        editable: !this.disabled,
      }
    },
  },
  methods: {
    onBlur () {
      this.$emit('input', this.content)
      this.$emit('change')
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
