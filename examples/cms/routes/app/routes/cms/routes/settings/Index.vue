<template>
  <crud
    :prefix="prefix"
    :path="path"
    :page-title="pageTitle"
    :fields-info="fieldsInfo"
    :details-title="$t('detailsTitle')"
    delete-mode="hard"
  >
  </crud>
</template>

<script>
import Crud from '@/utils/crud/components/Crud.vue'

export default {
  data () {
    return {
      prefix: 'crud/cms',
      path: 'settings',
      pageTitle: 'cms.settings',
    }
  },
  computed: {
    fieldsInfo () {
      return [
        {
          text: this.$t('fields.id'),
          name: 'id',
          details: false,
        },
        {
          type: 'select',
          list: {
            value: 'name',
            text: 'label',
            data: [
              {
                name: 'input',
                label: this.$t('fieldTypes.input'),
              },
              {
                name: 'textarea',
                label: this.$t('fieldTypes.textarea'),
              },
              {
                name: 'file',
                label: this.$t('fieldTypes.file'),
              },
            ],
          },
          stringId: true,
          column: 'type',
          text: this.$t('fields.type'),
          name: 'type',
        },
        {
          type: 'input',
          column: 'name',
          text: this.$t('fields.name'),
          name: 'name',
        },
        {
          type: 'dynamic',
          typeField: 'type',
          textModes: {
            file: 'file',
          },
          column: 'value',
          text: this.$t('fields.value'),
          name: 'value',
        },
      ]
    },
  },
  components: {
    Crud,
  },
  i18n: {
    messages: {
      pl: {
        detailsTitle: 'Parametr',
        fields: {
          id: 'Id',
          type: 'Typ pola',
          name: 'Nazwa parametru',
          value: 'Wartość',
        },
        fieldTypes: {
          input: 'Tekst',
          textarea: 'Długi tekst',
          file: 'Plik',
        },
      },
      en: {
        detailsTitle: 'Parameter',
        fields: {
          id: 'Id',
          type: 'Field type',
          name: 'Name',
          value: 'Value',
        },
        fieldTypes: {
          input: 'Input',
          textarea: 'Textarea',
          file: 'File',
        },
      },
    },
  },
}

</script>
