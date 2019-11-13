<template>
  <crud
    :prefix="prefix"
    :path="path"
    :paths="paths"
    :page-title="pageTitle"
    :fields-info="fieldsInfo"
    :items-view="itemsView"
    delete-mode="both"
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
      path: 'menu-items',
      paths: {
        i: 'cms/menu-items',
      },
      pageTitle: 'cms.menuItems',
      itemsView: {
        type: 'tree',
        mode: 'client',
        config: {
          parentColumnName: 'parent_menu_item_id',
          unassignedItemParent: null,
        },
      },
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
          column: 'text',
          text: this.$t('fields.text'),
          name: 'text',
          multiedit: false,
        },
        {
          type: 'input',
          column: 'path',
          text: this.$t('fields.path'),
          name: 'path',
          multiedit: false,
        },
        {
          type: 'select',
          url: 'crud/cms/menu-items',
          list: {
            value: 'id',
            text: 'text',
            data: [],
          },
          column: 'parent_menu_item_id',
          text: this.$t('fields.parent'),
          name: 'parent_menu_item_id',
          required: false,
          table: false,
          edit: false,
        },
        {
          type: 'number',
          column: 'order',
          text: this.$t('fields.order'),
          name: 'order',
          multiedit: false,
          required: false,
          table: false,
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
        detailsTitle: 'Element menu',
        fields: {
          id: 'Id',
          text: 'Tekst',
          path: 'Ścieżka',
          parent: 'Rodzic',
          order: 'Kolejność',
        },
      },
      en: {
        detailsTitle: 'Menu item',
        fields: {
          id: 'Id',
          text: 'Text',
          path: 'Path',
          parent: 'Parent',
          order: 'Order',
        },
      },
    },
  },
}

</script>
