<template>
  <crud
    :prefix="prefix"
    :path="path"
    :paths="paths"
    :page-title="pageTitle"
    :fields-info="fieldsInfo"
    :details-title="$t('detailsTitle')"
    :custom-buttons="buttons"
    :item-elements="itemElements"
    ref="crud"
  >
  </crud>
</template>

<script>
import Vue from 'vue'
import Crud from '@/utils/crud/components/Crud.vue'
import {
  mapActions,
} from 'vuex'

export default {
  data () {
    return {
      prefix: 'crud/admin',
      path: 'users',
      paths: {
        i: 'admin/users',
        st: 'admin/users',
      },
      pageTitle: 'admin.users',
    }
  },
  computed: {
    itemElements () {
      return {
        userPermissions: {
          title: this.$t('itemElements.userPermissions.title'),
          url: 'admin/users/{id}/permissions',
          controller: 'crud/admin/user-permissions',
          itemObject: 'permission_users',
          columns: [
            {
              obj: 'name',
              name: 'permission',
              header: this.$t('itemElements.userPermissions.headers.permission'),
            },
          ],
          primaryId: 'user_id',
          foreignId: 'permission_id',
          icon: 'lock_open',
          color: 'purple',
          buttonText: this.$t('itemElements.userPermissions.title'),
        },
      }
    },
    buttons () {
      return [
        {
          name: 'resetPassword',
          icon: 'autorenew',
          color: 'blue',
          text: this.$t('buttons.resetPassword'),
        },
      ]
    },
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
          column: 'email',
          text: this.$t('fields.email'),
          name: 'email',
          multiedit: false,
        },
        {
          type: 'select',
          url: 'crud/admin/user-types',
          list: {
            value: 'id',
            text: 'name',
            data: [],
          },
          column: 'user_type_id',
          text: this.$t('fields.userType'),
          name: 'user_type',
          apiObject: {
            name: 'user_type.name',
          },
        },
        {
          text: this.$t('fields.initialPassword'),
          name: 'initialPassword',
          apiObject: {
            name: 'initial_password',
          },
          details: false,
        },
      ]
    },
  },
  methods: {
    ...mapActions('crud', ['getItems']),
    ...mapActions(['openAlertBox']),
    resetPassword (item) {
      Vue.http.put('admin/users/' + item.id + '/reset-password')
        .then((response) => {
          this.openAlertBox([
            'alertSuccess',
            this.$t('passwordReseted'),
          ])
          this.getItems()
        })
    },
  },
  components: {
    Crud,
  },
  i18n: {
    messages: {
      pl: {
        detailsTitle: 'Użytkownik',
        fields: {
          id: 'Id',
          name: 'Nazwa',
          email: 'E-mail',
          initialPassword: 'Hasło początkowe',
          userType: 'Typ użytkownika',
        },
        itemElements: {
          userPermissions: {
            title: 'Uprawnienia użytkownika',
            headers: {
              permission: 'Uprawnienie',
            },
          },
        },
        buttons: {
          resetPassword: 'Reset hasła',
        },
        passwordReseted: 'Hasło zostało zmienione',
        passwordResetError: 'Błąd! Nie udało się zmienić hasła',
      },
      en: {
        detailsTitle: 'User',
        fields: {
          id: 'Id',
          name: 'Name',
          email: 'E-mail',
          initialPassword: 'Initial password',
          userType: 'User type',
        },
        itemElements: {
          userPermissions: {
            title: 'User permissions',
            headers: {
              permission: 'Permission',
            },
          },
        },
        buttons: {
          resetPassword: 'Reset password',
        },
        passwordReseted: 'Password changed',
        passwordResetError: 'Error! Password change unsuccessful',
      },
    },
  },
}

</script>
