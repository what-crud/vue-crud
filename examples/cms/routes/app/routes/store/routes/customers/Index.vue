<template>
  <crud
    :prefix="prefix"
    :path="path"
    :page-title="pageTitle"
    :fields-info="fieldsInfo"
    :details-title="$t('detailsTitle')"
    deleteMode="hard"
  >
  </crud>
</template>

<script>
import Crud from '@/utils/crud/components/Crud.vue'

export default {
  data () {
    return {
      prefix: 'crud/store',
      path: 'customers',
      pageTitle: 'store.customers',
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
          column: 'firstname',
          text: this.$t('fields.firstname'),
          name: 'firstname',
          multiedit: false,
        },
        {
          type: 'input',
          column: 'lastname',
          text: this.$t('fields.lastname'),
          name: 'lastname',
          multiedit: false,
        },
        {
          type: 'checkbox',
          column: 'company',
          text: this.$t('fields.company'),
          name: 'company',
          apiObject: {
            name: 'company',
            functions: ['boolean'],
          },
          textMode: 'html',
          required: false,
        },
        {
          type: 'input',
          column: 'registration_number',
          text: this.$t('fields.registration_number'),
          name: 'registration_number',
          multiedit: false,
          required: false,
        },
        {
          type: 'input',
          column: 'phone',
          text: this.$t('fields.phone'),
          name: 'phone',
          multiedit: false,
          required: false,
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
          column: 'street',
          text: this.$t('fields.street'),
          name: 'street',
          multiedit: false,
        },
        {
          type: 'input',
          column: 'zip_code',
          text: this.$t('fields.zip_code'),
          name: 'zip_code',
          multiedit: false,
        },
        {
          type: 'input',
          column: 'city',
          text: this.$t('fields.city'),
          name: 'city',
        },
        {
          type: 'input',
          column: 'comments',
          text: this.$t('fields.comments'),
          name: 'comments',
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
        detailsTitle: 'Post',
        fields: {
          id: 'Id',
          firstname: 'Imię',
          lastname: 'Nazwisko',
          company: 'Firma',
          registration_number: 'Nr ident.',
          phone: 'Tel.',
          email: 'E-mail',
          street: 'Ulica',
          zip_code: 'Kod pocztowy',
          city: 'Miejscowość',
          comments: 'Komentarze',
        },
      },
      en: {
        detailsTitle: 'Post',
        fields: {
          id: 'Id',
          firstname: 'Firstname',
          lastname: 'Lastname',
          company: 'Company',
          registration_number: 'Registr. no',
          phone: 'Phone',
          email: 'E-mail',
          street: 'Street',
          zip_code: 'Zip code',
          city: 'City',
          comments: 'Comments',
        },
      },
    },
  },
}

</script>
