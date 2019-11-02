<template>
  <span v-if="field.show">
    <!-- text field: input / number / decimal / date / time / datetime -->
    <v-text-field
      hide-details
      :rules="fieldRules(field)"
      v-if="['input', 'number', 'decimal', 'time', 'datetime'].includes(fieldType)"
      :label="field.text"
      v-model="value"
      :disabled="field.disabled"
      :type="['number', 'decimal'].includes(fieldType) ? 'number' : 'text'"
      :step="fieldType == 'decimal' ? 0.01 : 1"
      min="0"
      :mask="['date', 'time', 'datetime'].includes(fieldType) ? masks[fieldType] : undefined"
      :return-masked-value="['date', 'time', 'datetime'].includes(fieldType) ? true : false"
      @blur="valueChanged()"
    ></v-text-field>
    <!-- date -->
    <v-menu
      v-else-if="fieldType == 'date'"
      v-model="datepicker"
      :close-on-content-click="false"
      :nudge-right="40"
      lazy
      transition="scale-transition"
      offset-y
      full-width
      min-width="290px"
    >
      <template v-slot:activator="{ on }">
        <v-text-field
          v-model="value"
          :label="field.text"
          prepend-icon="event"
          readonly
          v-on="on"
          @blur="valueChanged()"
        ></v-text-field>
      </template>
      <v-date-picker
        v-model="value"
        @input="datepicker = false"
        :first-day-of-week="firstDayOfWeek"
        :locale="locale"
        scrollable
        @change="valueChanged()"
      ></v-date-picker>
    </v-menu>
    <!-- text area -->
    <v-textarea
      hide-details
      :rules="fieldRules(field)"
      v-else-if="fieldType == 'textarea'"
      :label="field.text"
      v-model="value"
      :disabled="field.disabled"
      @blur="valueChanged()"
    ></v-textarea>
    <!-- file upload -->
    <div v-else-if="fieldType == 'file'" class="field-container">
      <v-row dense>
        <v-col cols="12" sm="5">
          <v-btn
            :loading="uploadLoader"
            :class="fileUploadBtn(uploadStatus)"
            class="jbtn-file"
            dark
          >
            {{ $t('global.details.files.upload') }}
            <v-icon dark right>
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
            >
          </v-btn>
        </v-col>
        <v-col cols="12" sm="7">
          <v-text-field
            hide-details
            :rules="fieldRules(field)"
            :label="field.text"
            :value="filename"
            disabled
          >
          </v-text-field>
        </v-col>
      </v-row>
    </div>
    <!-- select -->
    <template v-else-if="fieldType == 'select'">
      <v-autocomplete
        hide-details
        :rules="fieldRules(field)"
        :items="listData"
        :loading="listLoader"
        v-model="value"
        :item-text="field.list.text"
        :item-value="field.list.value"
        item-disabled="itemDisabled"
        :label="field.text"
        menu-props="bottom"
        :disabled="field.disabled"
        @change="valueChanged()"
        :search-input.sync="listSearch"
      >
        <template v-if="listRefreshable" v-slot:append-outer>
          <v-icon color="blue" @click="refreshList(field.url)">refresh</v-icon>
        </template>
      </v-autocomplete>
    </template>
    <!-- rich text editor -->
    <template v-else-if="fieldType == 'richTextBox'">
      <div class="field-container">
        <label class="field-label">{{field.text}}</label>
        <div class="editor" style="border: 1px solid #aaa;">
          <editor-menu-bar :editor="editor" style="border-bottom: 1px solid #aaa;">
            <div class="menubar" slot-scope="{ commands, isActive }">
              <v-btn fab small icon
                class="menubar__button"
                :class="{ 'is-active': isActive.bold() }"
                @click="commands.bold"
              >
                <v-icon name="bold">format_bold</v-icon>
              </v-btn>
              <v-btn fab small icon
                class="menubar__button"
                :class="{ 'is-active': isActive.italic() }"
                @click="commands.italic"
              >
                <v-icon name="italic">format_italic</v-icon>
              </v-btn>
              <v-btn fab small icon
                class="menubar__button"
                :class="{ 'is-active': isActive.strike() }"
                @click="commands.strike"
              >
                <v-icon name="strike">format_strikethrough</v-icon>
              </v-btn>
              <v-btn fab small icon
                class="menubar__button"
                :class="{ 'is-active': isActive.underline() }"
                @click="commands.underline"
              >
                <v-icon name="underline">format_underlined</v-icon>
              </v-btn>
              <v-btn fab small icon
                class="menubar__button"
                :class="{ 'is-active': isActive.code() }"
                @click="commands.code"
              >
                <v-icon name="code">code</v-icon>
              </v-btn>
              <v-btn fab small icon
                class="menubar__button"
                :class="{ 'is-active': isActive.paragraph() }"
                @click="commands.paragraph"
              >
                P
              </v-btn>
              <v-btn fab small icon
                class="menubar__button"
                :class="{ 'is-active': isActive.heading({ level: 1 }) }"
                @click="commands.heading({ level: 1 })"
              >
                H1
              </v-btn>
              <v-btn fab small icon
                class="menubar__button"
                :class="{ 'is-active': isActive.heading({ level: 2 }) }"
                @click="commands.heading({ level: 2 })"
              >
                H2
              </v-btn>
              <v-btn fab small icon
                class="menubar__button"
                :class="{ 'is-active': isActive.heading({ level: 3 }) }"
                @click="commands.heading({ level: 3 })"
              >
                H3
              </v-btn>
              <v-btn fab small icon
                class="menubar__button"
                :class="{ 'is-active': isActive.bullet_list() }"
                @click="commands.bullet_list"
              >
                <v-icon name="ul">format_list_bulleted</v-icon>
              </v-btn>
              <v-btn fab small icon
                class="menubar__button"
                :class="{ 'is-active': isActive.ordered_list() }"
                @click="commands.ordered_list"
              >
                <v-icon name="ol">format_list_numbered</v-icon>
              </v-btn>
              <v-btn fab small icon
                class="menubar__button"
                :class="{ 'is-active': isActive.blockquote() }"
                @click="commands.blockquote"
              >
                <v-icon name="quote">format_quote</v-icon>
              </v-btn>
              <v-btn fab small icon
                class="menubar__button"
                :class="{ 'is-active': isActive.code_block() }"
                @click="commands.code_block"
              >
                <v-icon name="code">code</v-icon>
              </v-btn>
              <v-btn fab small icon
                class="menubar__button"
                @click="commands.horizontal_rule"
              >
                <v-icon name="hr">minimize</v-icon>
              </v-btn>
              <v-btn fab small icon
                class="menubar__button"
                @click="commands.undo"
              >
                <v-icon name="undo">undo</v-icon>
              </v-btn>
              <v-btn fab small icon
                class="menubar__button"
                @click="commands.redo"
              >
                <v-icon name="redo">redo</v-icon>
              </v-btn>
            </div>
          </editor-menu-bar>
          <editor-content class="editor__content" :editor="editor" />
        </div>
      </div>
    </template>
    <!-- checkbox -->
    <v-checkbox v-else-if="fieldType == 'checkbox'"
      hide-details
      color="primary"
      v-model="value"
      :label="field.text"
      :disabled="field.disabled"
      @change="checkboxUpdated()"
    ></v-checkbox>
  </span>
</template>
<script>
import Vue from 'vue'
import crud from '@/config/crud'
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
  History
} from 'tiptap-extensions'
import {
  mapState
} from 'vuex'

export default {
  components: {
    EditorMenuBar,
    EditorContent
  },
  props: [
    'field',
    'fieldValue',
    'reload',
    'dynamicFieldType'
  ],
  data () {
    return {
      listData: [],
      listSearch: '',
      listOldSearch: '',
      listLoader: false,
      value: null,
      uploadStatus: 'ready',
      uploadLoader: false,
      masks: {
        date: '####-##-##',
        time: '##:##',
        datetime: '####-##-## ##:##:##'
      },
      editor: null,
      searchActive: true,
      datepicker: false
    }
  },
  watch: {
    fieldValue: {
      immediate: true,
      handler (val) {
        this.value = val
        if (this.fieldType === 'richTextBox') {
          let content = val !== null && val !== undefined ? val : ''
          this.editor.setContent(content)
        }
      }
    },
    reload: function (val) {
      if (val) {
        if (this.fieldType === 'file') {
          this.uploadLoader = false
          this.uploadStatus = 'ready'
        } else if (this.fieldType === 'select' && this.field.async) {
          this.listOldSearch = ''
          let val = this.value || ''
          const url = `${this.field.url}/id/${val}`
          this.refreshList(url)
        }
      }
    },
    uploadStatus: function (val) {
      if (val !== 'ready') {
        setTimeout(() => {
          this.uploadStatus = 'ready'
        }, 1000)
      }
    },
    listSearch: function (val) {
      setTimeout(() => {
        if (this.fieldType === 'select' && this.field.async && this.searchActive) {
          if (this.listSearch === val) {
            const url = `${this.field.url}/phrase/${val}`
            this.refreshList(url)
          }
        }
      }, 500)
    }
  },
  mounted () {
    if (this.fieldType === 'select') {
      if (!this.field.url) {
        this.listData = this.field.list.data
      } else {
        this.listData = []
        if (this.field.async) {
          this.listLoader = false
        } else {
          this.refreshList(this.field.url)
        }
      }
    } else if (this.fieldType === 'richTextBox') {
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
          new History()
        ],
        content: ``,
        onBlur: () => {
          this.getEditorContent(this.editor.getHTML())
          this.valueChanged()
        }
      })
    }
  },
  beforeDestroy () {
    if (this.fieldType === 'richTextBox' && this.editor !== null) {
      this.editor.destroy()
    }
  },
  computed: {
    ...mapState('crud', ['uploadPath']),
    ...mapState('crud', ['details', 'path', 'prefix']),
    fieldType () {
      return this.field.type === 'dynamic' ? this.dynamicFieldType : this.field.type
    },
    rules () {
      const self = this
      return {
        required: v => !!v || self.$t('global.details.rules.required')
      }
    },
    listRefreshable () {
      return !this.field.async && this.field.url !== undefined
    },
    filename () {
      let filename
      if (this.fieldType === 'file' && this.value !== undefined && this.value !== null) {
        try {
          filename = JSON.parse(this.value).filename
        } catch (e) {
          return ''
        }
      }
      return filename
    },
    locale () {
      return crud.locale || 'en-us'
    },
    firstDayOfWeek () {
      return crud.firstDayOfWeek || 0
    }
  },
  methods: {
    getEditorContent (content) {
      this.value = content
    },
    checkboxUpdated () {
      this.value = this.value ? 1 : 0
      this.valueChanged()
    },
    valueChanged () {
      this.$emit('valueChanged', this.value, this.field.column)
    },
    refreshList (url) {
      this.searchActive = false
      let selectItems
      this.listLoader = true
      const required = this.field.required !== undefined ? this.field.required : true
      Vue.http.get(url).then((response) => {
        const items = response.body
        selectItems = items.map((item) => {
          const rItem = item
          if (typeof this.field.list.activeColumn !== 'undefined') {
            rItem.itemDisabled = item[this.field.list.activeColumn] === 0
          }
          if (typeof this.field.list.complexName !== 'undefined') {
            const textArray = this.field.list.complexName.map((textInfo) => {
              const splittedText = textInfo
                .split('.')
                .reduce((object, property) => object[property] || '', item)
              return splittedText
            })
            rItem.complexName = textArray.join(', ')
          }
          return rItem
        })
        if (!required) {
          const nullElement = {}
          nullElement[this.field.list.value] = ''
          nullElement[this.field.list.text] = '-'
          this.listData = [nullElement, ...selectItems]
        } else {
          this.listData = selectItems
        }
        this.listLoader = false
        this.searchActive = true
      })
    },
    fileUploadBtn (status) {
      const btnClasses = {
        ready: 'primary',
        success: 'success',
        error: 'error'
      }
      return btnClasses[status]
    },
    fileUploadIcon (status) {
      const icons = {
        ready: 'save_alt',
        success: 'check',
        error: 'close'
      }
      return icons[status]
    },
    fieldRules (field) {
      const rules = []
      const required = field.required !== undefined ? field.required : true
      if (required) {
        rules.push(this.rules.required)
      }
      return rules
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
        this.$http.post(this.uploadPath, formData, {}).then((response) => {
          if (response.body.status === 0) {
            this.value = JSON.stringify({
              filename: file.name,
              mime: file.type,
              size: file.size,
              path: response.body.path,
              uploaded: 1
            })
            this.valueChanged()
            this.uploadStatus = 'success'
          } else {
            this.uploadStatus = 'error'
            if (response.body.status === -1) {
              this.openAlertBox(['alertError', response.body.msg])
            } else if (response.body.status === -2) {
              this.openAlertBox(['alertValidationError', response.body.msg])
            }
          }
          this.uploadLoader = false
        }, () => {
          this.uploadLoader = false
          this.uploadStatus = 'error'
        })
      }
    }
  }
}
</script>

<style scoped>
.field-label {
  font-size:12px;
  color:#777;
}
.field-container {
  margin-top: 10px;
}
.jbtn-file {
  cursor: pointer;
  position: relative;
  overflow: hidden;
  margin: 0px;
  width: 100%;
}
.jbtn-file input[type="file"] {
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
