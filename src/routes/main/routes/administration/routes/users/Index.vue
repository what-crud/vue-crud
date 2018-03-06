<template>
  <crud :prefix="prefix" :path="path" :pageTitle="pageTitle" :fieldsInfo="fieldsInfo" :detailsTitle="$t('detailsTitle')"
    :customButtons="buttons" :itemElements="itemElements" ref="crud">
  </crud>
</template>

<script>
  import Vue from 'vue'
  import Crud from '@/components/Crud.vue'
  import {
    mapActions,
    mapMutations
  } from 'vuex'

  export default {
    data() {
      return {
        prefix: 'admin',
        path: 'users',
        pageTitle: 'admin.users',
      }
    },
    computed: {
      itemElements() {
        return {
          userPermissions: {
            title: this.$t('itemElements.userPermissions.title'),
            url: 'admin/users/{id}/permissions',
            controller: 'admin/user-permissions',
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
            buttonText: this.$t('itemElements.userPermissions.title')
          }
        }
      },
      buttons() {
        return [{
          name: 'resetPassword',
          icon: 'autorenew',
          color: 'blue',
          text: this.$t('buttons.resetPassword')
        }]
      },
      fieldsInfo() {
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
            name: 'name'
          },
          {
            type: 'input',
            column: 'email',
            text: this.$t('fields.email'),
            name: 'email'
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
      ...mapMutations([
        'alertSuccess',
        'alertError'
      ]),
      ...mapActions('crud', [
        'getItems',
      ]),
      resetPassword(item) {
        Vue.http.put(this.prefix + '/' + this.path + '/' + item.id + '/reset-password')
          .then((response) => {
            this.alertSuccess(this.$t('passwordReseted'))
            this.getItems()
          })
      },
    },
    components: {
      Crud
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
          },
          itemElements: {
            userPermissions: {
              title: 'Uprawnienia użytkownika',
              headers: {
                permission: 'Uprawnienie'
              }
            }
          },
          buttons: {
            resetPassword: 'Reset hasła'
          },
          passwordReseted: 'Hasło zostało zmienione',
          passwordResetError: 'Błąd! Nie udało się zmienić hasła'
        },
        en: {
          detailsTitle: 'User',
          fields: {
            id: 'Id',
            name: 'Name',
            email: 'E-mail',
            initialPassword: 'Initial password',
          },
          itemElements: {
            userPermissions: {
              title: 'User permissions',
              headers: {
                permission: 'Permission'
              }
            }
          },
          buttons: {
            resetPassword: 'Reset password'
          },
          passwordReseted: 'Password changed',
          passwordResetError: 'Error! Password change unsuccessful'
        }
      }
    },
  }

</script>
