<template>
  <div>
    Uprawnienia
    <data-table :items="permissions" :headers="headers" :add.sync="add"></data-table>
    <create-item :dialog.sync="add">dfgsdg</create-item>
  </div>
</template>

<script>
  import DataTable from '@/components/DataTable.vue'
  import CreateItem from '@/components/CreateItem.vue'
  import {
    mapGetters,
    mapActions
  } from 'vuex'

  export default {
    data() {
      return {
        add: false,
        headers: [{
            text: 'Id',
            align: 'center',
            value: 'id'
          },
          {
            text: 'Nazwa',
            align: 'center',
            value: 'name'
          },
          {
            text: 'Kod',
            align: 'center',
            value: 'code'
          }, {
            text: 'Akcja',
            align: 'center',
            sortable: false,
          },
        ],
      }
    },
    computed: {
      ...mapGetters('administration', [
        'permissions',
      ])
    },
    created: function () {
      this.getPermissions()

    },
    methods: {
      openAddDialog: function () {
        this.add = true
      },
      ...mapActions('administration', [
        'getPermissions',
      ]),
    },
    components: {
      DataTable,
      CreateItem
    }
  }

</script>
