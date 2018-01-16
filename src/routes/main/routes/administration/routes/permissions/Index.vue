<template>
  <div>
    <v-select :label="$t('status.title')" v-bind:items="statuses" v-model="select" single-line item-text="text" item-value="value"
      multiple chips></v-select>
    <data-table :items="fiteredPermissions" :headers="headers" :details.sync="details"></data-table>
    <item-details :title="$t('detailsTitle')" :dialog.sync="details" :fields="fields"></item-details>
  </div>
</template>

<script>
  import DataTable from '@/components/DataTable.vue'
  import ItemDetails from '@/components/ItemDetails.vue'
  import {
    mapGetters,
    mapMutations,
    mapActions
  } from 'vuex'

  export default {
    data() {
      return {
        details: {
          show: false,
          id: null,
          action: null,
        },
        select: [1],
      }
    },
    computed: {
      ...mapGetters('administration', [
        'permissions',
        'permission',
      ]),
      statuses: function () {
        return [{
            text: this.$t('status.active'),
            value: 1
          },
          {
            text: this.$t('status.inactive'),
            value: 0
          },
        ]
      },
      fiteredPermissions: function() {
        return this.permissions.filter(permission => this.select.includes(parseInt(permission.active)));
      },
      headers: function () {
        return [{
            text: this.$t('fields.id'),
            align: 'center',
            value: 'id'
          },
          {
            text: this.$t('fields.name'),
            align: 'center',
            value: 'name'
          },
          {
            text: this.$t('fields.code'),
            align: 'center',
            value: 'code'
          }, {
            text: this.$t('fields.action'),
            align: 'center',
            sortable: false,
          },
        ]
      },
      fields: function () {
        return {
          name: {
            type: 'input',
            column: 'name',
            text: this.$t('fields.name'),
            value: this.permission.name
          },
          code: {
            type: 'input',
            column: 'code',
            text: this.$t('fields.code'),
            value: this.permission.code
          },
        }
      },
      permissionData: function () {
        return {
          name: this.fields.name.value,
          code: this.fields.code.value,
        }
      }
    },
    created: function () {
      this.getPermissions()

    },
    methods: {
      ...mapMutations('administration', [
        'resetPermission',
      ]),
      ...mapActions('administration', [
        'getPermissions',
        'getPermission',
        'updatePermission',
        'storePermission',
      ]),
      editDialog: function (id) {
        this.details.show = true
        this.details.action = 'edit'
        this.details.id = id
        this.getPermission(id)
      },
      createDialog: function () {
        this.details.show = true
        this.details.action = 'create'
        this.resetPermission()
      },
      update: function () {
        this.updatePermission([this.details.id, this.permissionData])
      },
      store: function () {
        this.storePermission(this.permissionData)
      },
      suspend: function (id) {
        this.updatePermission([id, {active: 0}])
      },
      restore: function (id) {
        this.updatePermission([id, {active: 1}])
      },
    },
    components: {
      DataTable,
      ItemDetails
    },
    i18n: {
      messages: {
        pl: {
          status: {
            title: "Statusy",
            active: "Aktywne",
            inactive: "Nieaktywne",
          },
          detailsTitle: 'Uprawnienie',
          fields: {
            id: 'Id',
            name: 'Nazwa',
            code: 'Kod',
            action: 'Akcja'
          }
        },
        en: {
          status: {
            title: "Statuses",
            active: "Active",
            inactive: "Inactive",
          },
          detailsTitle: 'Permission',
          fields: {
            id: 'Id',
            name: 'Name',
            code: 'Code',
            action: 'Action'
          }
        }
      }
    },
  }

</script>
