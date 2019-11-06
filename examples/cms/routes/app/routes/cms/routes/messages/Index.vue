<template>
  <crud
    :prefix="prefix"
    :path="path"
    :paths="paths"
    :page-title="pageTitle"
    :fields-info="fieldsInfo"
    :details-title="$t('detailsTitle')"
  >
  </crud>
</template>

<script>
import Crud from '@/utils/crud/components/Crud.vue'

export default {
  data () {
    return {
      prefix: 'crud/cms',
      path: 'messages',
      paths: {
        i: 'cms/messages',
      },
      pageTitle: 'cms.messages',
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
          type: 'input',
          column: 'email',
          text: this.$t('fields.email'),
          name: 'email',
          multiedit: false,
        },
        {
          type: 'input',
          column: 'sender',
          text: this.$t('fields.sender'),
          name: 'sender',
          multiedit: false,
        },
        {
          type: 'textarea',
          column: 'content',
          text: this.$t('fields.content'),
          name: 'content',
          multiedit: false,
        },
        {
          type: 'input',
          column: 'created_at',
          text: this.$t('fields.createdAt'),
          name: 'created_at',
          multiedit: false,
          disabled: true,
          required: false,
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
        detailsTitle: 'Wiadomość',
        fields: {
          id: 'Id',
          email: 'E-mail',
          sender: 'Nadawca',
          content: 'Treść',
          createdAt: 'Wysłano',
        },
      },
      en: {
        detailsTitle: 'Message',
        fields: {
          id: 'Id',
          email: 'E-mail',
          sender: 'Sender',
          content: 'Content',
          createdAt: 'Sent at',
        },
      },
    },
  },
}

</script>
