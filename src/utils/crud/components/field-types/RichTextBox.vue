<template>
  <div class="rich-text-box__editor">
    <editor-menu-bar
      :editor="editor"
      class="rich-text-box__menubar"
    >
      <div slot-scope="{ commands, isActive }">
        <menu-button
          icon="format_bold"
          :active="isActive.bold()"
          :tooltip="$t('global.richTextBox.bold')"
          @clicked="commands.bold"
        />
        <menu-button
          icon="format_italic"
          :active="isActive.italic()"
          :tooltip="$t('global.richTextBox.italic')"
          @clicked="commands.italic"
        />
        <menu-button
          icon="format_strikethrough"
          :active="isActive.strike()"
          :tooltip="$t('global.richTextBox.strike')"
          @clicked="commands.strike"
        />
        <menu-button
          icon="format_underlined"
          :active="isActive.underline()"
          :tooltip="$t('global.richTextBox.underline')"
          @clicked="commands.underline"
        />
        <menu-button
          icon="code"
          :active="isActive.code()"
          :tooltip="$t('global.richTextBox.code')"
          @clicked="commands.code"
        />
        <menu-button
          text="P"
          :active="isActive.paragraph()"
          :tooltip="$t('global.richTextBox.paragraph')"
          @clicked="commands.paragraph"
        />
        <menu-button
          text="H1"
          :active="isActive.heading({ level: 1 })"
          :tooltip="$t('global.richTextBox.heading1')"
          @clicked="commands.heading({ level: 1 })"
        />
        <menu-button
          text="H2"
          :active="isActive.heading({ level: 2 })"
          :tooltip="$t('global.richTextBox.heading2')"
          @clicked="commands.heading({ level: 2 })"
        />
        <menu-button
          text="H3"
          :active="isActive.heading({ level: 3 })"
          :tooltip="$t('global.richTextBox.heading3')"
          @clicked="commands.heading({ level: 3 })"
        />
        <menu-button
          icon="format_list_bulleted"
          :active="isActive.bullet_list()"
          :tooltip="$t('global.richTextBox.bulletedList')"
          @clicked="commands.bullet_list"
        />
        <menu-button
          icon="format_list_numbered"
          :active="isActive.ordered_list()"
          :tooltip="$t('global.richTextBox.numberedList')"
          @clicked="commands.ordered_list"
        />
        <menu-button
          icon="format_quote"
          :active="isActive.blockquote()"
          :tooltip="$t('global.richTextBox.blockquote')"
          @clicked="commands.blockquote"
        />
        <menu-button
          icon="code"
          :active="isActive.code_block()"
          :tooltip="$t('global.richTextBox.codeBlock')"
          @clicked="commands.code_block"
        />
        <menu-button
          icon="minimize"
          :tooltip="$t('global.richTextBox.horizontalRule')"
          @clicked="commands.horizontal_rule"
        />
        <menu-button
          icon="undo"
          :tooltip="$t('global.richTextBox.undo')"
          @clicked="commands.undo"
        />
        <menu-button
          icon="redo"
          :tooltip="$t('global.richTextBox.redo')"
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

import {
  Editor,
  EditorContent,
  EditorMenuBar,
} from 'tiptap'

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

import MenuButton from './RichTextBox/MenuButton.vue'

export default {
  components: {
    EditorMenuBar,
    EditorContent,
    MenuButton,
  },
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
  data () {
    return {
      editor: null,
    }
  },
  watch: {
    value: {
      immediate: true,
      handler (val) {
        this.setEditorContent(val)
      },
    },
  },
  mounted () {
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
      editable: !this.disabled,
      onBlur: () => {
        this.$emit('input', this.editor.getHTML())
        this.$emit('change')
      },
    })
    this.setEditorContent(this.value)
  },
  beforeDestroy () {
    this.editor.destroy()
  },
  methods: {
    setEditorContent (content) {
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
