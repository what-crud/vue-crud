import ListItemActions from '../components/ListItemActions.vue'
import ListItemField from '../components/ListItemField.vue'

export default {
  components: {
    ListItemActions,
    ListItemField,
  },
  methods: {
    setColumnTextModes (props) {
      const columnTextModes = {}
      for (const field of this.tableFields) {
        let textMode = 'cropped'
        if (field.textMode) {
          textMode = field.textMode
        }
        if (field.type === 'dynamic') {
          if (field.textModes) {
            const refField = props.item[field.typeField]
            if (field.textModes[refField]) {
              textMode = field.textModes[refField]
            }
          }
        }
        columnTextModes[field.name.toLowerCase()] = textMode
      }
      return columnTextModes
    },
    textMode (item, key) {
      const field = this.tableFields.find((field) => field.name === key) || {}
      let textMode = field.textMode || 'cropped'
      if (field.type === 'dynamic' && field.textModes) {
        const refField = item[field.typeField]
        if (field.textModes[refField]) {
          textMode = field.textModes[refField]
        }
      }
      return textMode
    },
  },
}
