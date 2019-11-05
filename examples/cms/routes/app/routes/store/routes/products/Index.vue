<template>
  <crud
    :prefix="prefix"
    :path="path"
    :paths="paths"
    :page-title="pageTitle"
    :fields-info="fieldsInfo"
    :details-title="$t('detailsTitle')"
    deleteMode="both"
  >
  </crud>
</template>

<script>
import Crud from '@/utils/crud/components/Crud.vue'

export default {
  data () {
    return {
      prefix: 'crud/store',
      path: 'products',
      paths: {
        i: 'store/products',
        st: 'store/products',
        u: 'store/products',
      },
      pageTitle: 'store.products',
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
          text: this.$t('fields.slugWithDescription'),
          name: 'slug',
          multiedit: false,
          required: false,
          table: false,
        },
        {
          text: this.$t('fields.slug'),
          name: 'slug',
          details: false,
        },
        {
          type: 'select',
          url: 'crud/store/sections',
          list: {
            value: 'id',
            text: 'name',
            data: [],
          },
          column: 'section_id',
          text: this.$t('fields.section'),
          name: 'section_id',
          apiObject: {
            name: 'section.name',
          },
        },
        {
          type: 'textarea',
          column: 'description',
          text: this.$t('fields.description'),
          name: 'description',
          multiedit: false,
        },
        {
          type: 'file',
          column: 'image',
          text: this.$t('fields.image'),
          name: 'image',
          multiedit: false,
          required: false,
          textMode: 'file',
        },
        {
          type: 'file',
          column: 'thumbnail',
          text: this.$t('fields.thumbnail'),
          name: 'thumbnail',
          multiedit: false,
          textMode: 'file',
        },
        {
          type: 'decimal',
          column: 'price',
          text: this.$t('fields.price'),
          name: 'price',
        },
        {
          type: 'number',
          column: 'quantity',
          text: this.$t('fields.quantity'),
          name: 'quantity',
          multiedit: false,
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
        detailsTitle: 'Produkt',
        fields: {
          id: 'Id',
          name: 'Nazwa',
          slug: 'Slug',
          slugWithDescription: 'Slug (zostaw puste, jeżeli ma się utworzyć na podstawie nazwy)',
          description: 'Opis',
          section: 'Kategoria',
          image: 'Obraz',
          thumbnail: 'Miniatura',
          price: 'Cena',
          quantity: 'Ilość',
        },
      },
      en: {
        detailsTitle: 'Product',
        fields: {
          id: 'Id',
          name: 'Name',
          slug: 'Slug',
          slugWithDescription: 'Slug (leave if it must be created from name)',
          description: 'Description',
          section: 'section',
          image: 'Image',
          thumbnail: 'Thumbnail',
          price: 'Price',
          quantity: 'Quantity',
        },
      },
    },
  },
}

</script>
