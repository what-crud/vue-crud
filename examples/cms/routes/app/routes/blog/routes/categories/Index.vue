<template>
  <crud
    :prefix="prefix"
    :path="path"
    :paths="paths"
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
      prefix: 'crud/blog',
      path: 'categories',
      paths: {
        st: 'blog/categories',
        u: 'blog/categories',
      },
      pageTitle: 'blog.categories',
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
          column: 'name',
          text: this.$t('fields.name'),
          name: 'name',
          multiedit: false,
        },
        {
          type: 'input',
          column: 'slug',
          text: this.$t('fields.slug'),
          name: 'slug',
          multiedit: false,
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
        detailsTitle: 'Kategoria',
        fields: {
          id: 'Id',
          name: 'Nazwa',
          slug: 'Slug',
        },
      },
      en: {
        detailsTitle: 'Category',
        fields: {
          id: 'Id',
          name: 'Name',
          slug: 'Slug',
        },
      },
    },
  },
}

</script>
