<template>
  <div class="editor" style="border: 1px solid #aaa;">
    <editor-menu-bar :editor="editor" style="border-bottom: 1px solid #aaa;">
      <div class="menubar" slot-scope="{ commands, isActive }">
        <v-btn
          fab
          small
          icon
          class="menubar__button"
          :class="{ 'is-active': isActive.bold() }"
          @click="commands.bold"
        >
          <v-icon name="bold">format_bold</v-icon>
        </v-btn>
        <v-btn
          fab
          small
          icon
          class="menubar__button"
          :class="{ 'is-active': isActive.italic() }"
          @click="commands.italic"
        >
          <v-icon name="italic">format_italic</v-icon>
        </v-btn>
        <v-btn
          fab
          small
          icon
          class="menubar__button"
          :class="{ 'is-active': isActive.strike() }"
          @click="commands.strike"
        >
          <v-icon name="strike">format_strikethrough</v-icon>
        </v-btn>
        <v-btn
          fab
          small
          icon
          class="menubar__button"
          :class="{ 'is-active': isActive.underline() }"
          @click="commands.underline"
        >
          <v-icon name="underline">format_underlined</v-icon>
        </v-btn>
        <v-btn
          fab
          small
          icon
          class="menubar__button"
          :class="{ 'is-active': isActive.code() }"
          @click="commands.code"
        >
          <v-icon name="code">code</v-icon>
        </v-btn>
        <v-btn
          fab
          small
          icon
          class="menubar__button"
          :class="{ 'is-active': isActive.paragraph() }"
          @click="commands.paragraph"
        >P</v-btn>
        <v-btn
          fab
          small
          icon
          class="menubar__button"
          :class="{ 'is-active': isActive.heading({ level: 1 }) }"
          @click="commands.heading({ level: 1 })"
        >H1</v-btn>
        <v-btn
          fab
          small
          icon
          class="menubar__button"
          :class="{ 'is-active': isActive.heading({ level: 2 }) }"
          @click="commands.heading({ level: 2 })"
        >H2</v-btn>
        <v-btn
          fab
          small
          icon
          class="menubar__button"
          :class="{ 'is-active': isActive.heading({ level: 3 }) }"
          @click="commands.heading({ level: 3 })"
        >H3</v-btn>
        <v-btn
          fab
          small
          icon
          class="menubar__button"
          :class="{ 'is-active': isActive.bullet_list() }"
          @click="commands.bullet_list"
        >
          <v-icon name="ul">format_list_bulleted</v-icon>
        </v-btn>
        <v-btn
          fab
          small
          icon
          class="menubar__button"
          :class="{ 'is-active': isActive.ordered_list() }"
          @click="commands.ordered_list"
        >
          <v-icon name="ol">format_list_numbered</v-icon>
        </v-btn>
        <v-btn
          fab
          small
          icon
          class="menubar__button"
          :class="{ 'is-active': isActive.blockquote() }"
          @click="commands.blockquote"
        >
          <v-icon name="quote">format_quote</v-icon>
        </v-btn>
        <v-btn
          fab
          small
          icon
          class="menubar__button"
          :class="{ 'is-active': isActive.code_block() }"
          @click="commands.code_block"
        >
          <v-icon name="code">code</v-icon>
        </v-btn>
        <v-btn fab small icon class="menubar__button" @click="commands.horizontal_rule">
          <v-icon name="hr">minimize</v-icon>
        </v-btn>
        <v-btn fab small icon class="menubar__button" @click="commands.undo">
          <v-icon name="undo">undo</v-icon>
        </v-btn>
        <v-btn fab small icon class="menubar__button" @click="commands.redo">
          <v-icon name="redo">redo</v-icon>
        </v-btn>
      </div>
    </editor-menu-bar>
    <editor-content class="editor__content" :editor="editor" />
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

export default {
  components: {
    EditorMenuBar,
    EditorContent,
  },
  props: ['field', 'fieldValue'],
  data () {
    return {
      editor: null,
    }
  },
  watch: {
    fieldValue: {
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
        new Heading({ levels: [1, 2, 3] }),
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
        this.getEditorContent(this.editor.getHTML())
        this.onBlur()
      },
    })
    this.setEditorContent(this.fieldValue)
  },
  beforeDestroy () {
    this.editor.destroy()
  },
  methods: {
    getEditorContent (content) {
      this.value = content
    },
    setEditorContent (content) {
      if (this.editor) {
        this.editor.setContent(content || '')
      }
    },
  },
}
</script>
