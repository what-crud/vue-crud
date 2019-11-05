<template>
  <div class="rich-text-box__editor">
    <editor-menu-bar
      :editor="editor"
      class="rich-text-box__menubar"
    >
      <div slot-scope="{ commands, isActive }">
        <nav-button
          icon="format_bold"
          x-small
          :dark="isActive.bold()"
          @clicked="commands.bold"
        />
        <nav-button
          icon="format_italic"
          x-small
          :dark="isActive.italic()"
          @clicked="commands.italic"
        />
        <nav-button
          icon="format_strikethrough"
          x-small
          :dark="isActive.strike()"
          @clicked="commands.strike"
        />
        <nav-button
          icon="format_underlined"
          x-small
          :dark="isActive.underline()"
          @clicked="commands.underline"
        />
        <nav-button
          icon="code"
          x-small
          :dark="isActive.code()"
          @clicked="commands.code"
        />
        <nav-button
          text="P"
          x-small
          :dark="isActive.paragraph()"
          @clicked="commands.paragraph"
        />
        <nav-button
          text="H1"
          x-small
          :dark="isActive.heading({ level: 1 })"
          @clicked="commands.heading({ level: 1 })"
        />
        <nav-button
          text="H2"
          x-small
          :dark="isActive.heading({ level: 2 })"
          @clicked="commands.heading({ level: 2 })"
        />
        <nav-button
          text="H3"
          x-small
          :dark="isActive.heading({ level: 3 })"
          @clicked="commands.heading({ level: 3 })"
        />
        <nav-button
          icon="format_list_bulleted"
          x-small
          :dark="isActive.bullet_list()"
          @clicked="commands.bullet_list"
        />
        <nav-button
          icon="format_list_numbered"
          x-small
          :dark="isActive.ordered_list()"
          @clicked="commands.ordered_list"
        />
        <nav-button
          icon="format_quote"
          x-small
          :dark="isActive.blockquote()"
          @clicked="commands.blockquote"
        />
        <nav-button
          icon="code"
          x-small
          :dark="isActive.code_block()"
          @clicked="commands.code_block"
        />
        <nav-button
          icon="minimize"
          x-small
          @clicked="commands.horizontal_rule"
        />
        <nav-button
          icon="undo"
          x-small
          @clicked="commands.undo"
        />
        <nav-button
          icon="redo"
          x-small
          @clicked="commands.redo"
        />
      </div>
    </editor-menu-bar>
    <editor-content
      class="editor__content"
      :editor="editor"
    />
  </div>
</template>
<script>
import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
import {
  Blockquote,
  CodeBlock,
  HardBreak,
  Heading,
  HorizontalRule,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Italic,
  Link,
  Strike,
  Underline,
  History,
} from 'tiptap-extensions'
import NavButton from '../Button.vue'

export default {
  components: {
    EditorMenuBar,
    EditorContent,
    NavButton,
  },
  props: ['value'],
  data() {
    return {
      editor: null,
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        this.setEditorContent(val)
      },
    },
  },
  mounted() {
    this.editor = new Editor({
      extensions: [
        new Blockquote(),
        new BulletList(),
        new CodeBlock(),
        new HardBreak(),
        new Heading({
          levels: [1, 2, 3],
        }),
        new HorizontalRule(),
        new ListItem(),
        new OrderedList(),
        new TodoItem(),
        new TodoList(),
        new Bold(),
        new Code(),
        new Italic(),
        new Link(),
        new Strike(),
        new Underline(),
        new History(),
      ],
      content: ``,
      onBlur: () => {
        this.$emit('input', this.editor.getHTML())
        this.$emit('change')
      },
    })
    this.setEditorContent(this.value)
  },
  beforeDestroy() {
    this.editor.destroy()
  },
  methods: {
    setEditorContent(content) {
      if (this.editor) {
        this.editor.setContent(content || '')
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.rich-text-box {
  &__editor {
    border: 1px solid #aaa;
  }
  &__menubar {
    border-bottom: 1px solid #aaa;
    padding: 2px !important;
  }
}
</style>
