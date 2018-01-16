<template>
  <div>
    <data-table :items="userPermissions" :headers="headers" :add.sync="add"></data-table>
    <item-details :dialog.sync="add"></item-details>
  </div>
</template>

<script>
  import DataTable from '@/components/DataTable.vue'
  import ItemDetails from '@/components/ItemDetails.vue'
  import {
    mapGetters,
    mapActions
  } from 'vuex'

  export default {
    data() {
      return {
        add: false,
      }
    },
    computed: {
      ...mapGetters('administration', [
        'userPermissions',
      ]),
      headers: function () {
        return [{
            text: 'Id',
            align: 'center',
            value: 'id'
          },
          {
            text: 'Nazwa użytkownika',
            align: 'center',
            value: 'name'
          },
          {
            text: 'Kod uprawnienia',
            align: 'center',
            value: 'code'
          }, {
            text: 'Akcja',
            align: 'center',
            sortable: false,
          },
        ]
      }
    },
    created: function () {
      this.getUserPermissions()

    },
    methods: {
      openAddDialog: function () {
        this.add = true
      },
      ...mapActions('administration', [
        'getUserPermissions',
      ]),
    },
    components: {
      DataTable,
      ItemDetails
    },
    i18n: {
      messages: {
        pl: {},
        en: {}
      }
    }
  }

</script>
