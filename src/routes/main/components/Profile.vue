<template>
  <v-layout row justify-center>
    <v-dialog v-model="$store.state.profileDialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">{{ $t('title') }}</span>
        </v-card-title>

        <!-- edit user form -->
        <v-form v-model="userValid">
          <v-card-text>
            <v-alert v-if="userUpdated" outline color="success" icon="check_circle" value="true">
              {{ $t('user.updated') }}
            </v-alert>
            <v-text-field :label="$t('user.name')" v-model="user.name" :rules="userRules.name"></v-text-field>
            <v-text-field :label="$t('user.email')" v-model="user.email" :rules="userRules.email"></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-btn class="blue--text" flat @click="getUser()">{{ $t('user.restore') }}</v-btn>
            <v-btn class="green--text" flat @click="editUser(user)" :disabled="!userValid">{{ $t('user.save') }}</v-btn>
          </v-card-actions>
        </v-form>

        <!-- edit password form -->
        <v-form v-model="passwordValid">
          <v-card-text>
            <v-alert v-if="userPasswordUpdated" outline color="success" icon="check_circle" value="true">
              {{ $t('password.updated') }}
            </v-alert>
            <v-alert v-else-if="userPasswordUpdateError" outline color="error" icon="warning" value="true">
              {{ $t('password.updateError') }}
              <br> {{ password.updateErrorMsg }}
            </v-alert>
            <v-text-field :label="$t('password.old')" v-model="password.old" :rules="passwordRules.old" :append-icon="e1 ? 'visibility' : 'visibility_off'"
              @click:append="() => (e1 = !e1)" :type="e1 ? 'password' : 'text'" counter></v-text-field>
            <v-text-field :label="$t('password.new')" v-model="password.new" :rules="passwordRules.new" min="8" :append-icon="e2 ? 'visibility' : 'visibility_off'"
              @click:append="() => (e2 = !e2)" :type="e2 ? 'password' : 'text'" counter></v-text-field>
            <v-text-field :label="$t('password.repeat')" v-model="password.repeat" :rules="passwordRules.repeat" min="8" :append-icon="e3 ? 'visibility' : 'visibility_off'"
              @click:append="() => (e3 = !e3)" :type="e3 ? 'password' : 'text'" counter></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-btn class="blue--text" flat @click="clearPasswords()">{{ $t('password.clear') }}</v-btn>
            <v-btn class="green--text" flat @click="editPasswordAndClear()" :disabled="!passwordValid">{{ $t('password.change') }}</v-btn>
          </v-card-actions>
        </v-form>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="black--text" flat @click.native="$store.state.profileDialog = false">{{ $t('close') }}</v-btn>
        </v-card-actions>

      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
  import {
    mapGetters,
    mapActions
  } from 'vuex'

  export default {
    name: 'profile',
    data: () => ({
      userValid: false,
      user: {
        name: '',
        email: '',
      },
      passwordValid: false,
      password: {
        old: '',
        new: '',
        repeat: '',
      },
      e1: true,
      e2: true,
      e3: true,
      rules: {
        required: (value) => !!value || 'Required.',
        email: (value) => {
          const pattern =
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        }
      }
    }),
    computed: {
      ...mapGetters('auth', [
        'userInfo',
        'userUpdated',
        'userPasswordUpdated',
        'userPasswordUpdateError',
        'userPasswordUpdateErrorMsg'
      ]),
      userRules() {
        let self = this
        return {
          name: [
            (v) => !!v || self.$t('rules.required'),
            (v) => v.length < 100 || self.$t('rules.less') + ' 100 ' + self.$t('rules.characters'),
            (v) => v.length > 4 || self.$t('rules.more') + ' 4 ' + self.$t('rules.characters'),
          ],
          email: [
            (v) => !!v || self.$t('rules.required'),
            (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(v) || self.$t('rules.emailMustBeValid')
          ]
        }
      },
      passwordRules() {
        let self = this
        return {
          old: [
            (v) => !!v || self.$t('rules.required'),
          ],
          new: [
            (v) => !!v || self.$t('rules.required'),
            (v) => v.length < 100 || self.$t('rules.less') + ' 100 ' + self.$t('rules.characters'),
            (v) => v.length >= 8 || self.$t('rules.atLeast') + ' 8 ' + self.$t('rules.characters'),
            (v) => v != self.password.old || self.$t('rules.passwordMustDiffer'),
          ],
          repeat: [
            (v) => !!v || self.$t('rules.required'),
            (v) => v.length < 100 || self.$t('rules.less') + ' 100 ' + self.$t('rules.characters'),
            (v) => v.length >= 8 || self.$t('rules.atLeast') + ' 8 ' + self.$t('rules.characters'),
            (v) => v == self.password.new || self.$t('rules.passwordMustBeSame'),
          ],
        }
      },
    },
    created() {
      this.getUser()
    },
    methods: {
      clearPasswords() {
        this.password.old = ''
        this.password.new = ''
        this.password.repeat = ''
      },
      getUser() {
        let user = this.userInfo
        this.user.name = user.name
        this.user.email = user.email
      },
      editPasswordAndClear() {
        this.editPassword(this.password)
        this.clearPasswords()
      },
      ...mapActions('auth', [
        'editUser',
        'editPassword',
      ]),
    },
    i18n: {
      messages: {
        pl: {
          title: 'Profil Użytkownika',
          close: 'Zamknij',
          rules: {
            required: 'Pole jest wymagane',
            atLeast: 'Pole musi mieć przynajmniej',
            less: 'Pole musi mieć mniej niż',
            more: 'Pole musi mieć więcej niż',
            characters: 'znaków',
            emailMustBeValid: 'E-mail musi mieć poprawny format',
            passwordMustDiffer: 'Nowe hasło musi się różnić od poprzedniego',
            passwordMustBeSame: 'Hasła nie mogą się różnić'
          },
          user: {
            name: 'Nazwa Użytkownika',
            email: 'Adres e-mail',
            restore: 'Przywróć',
            save: 'Zapisz',
            updated: 'Dane użytkownika zostały zaktualizowane',
          },
          password: {
            old: 'Stare hasło',
            new: 'Nowe hasło',
            repeat: 'Powtórz hasło',
            updated: 'Hasło zostało zaktualizowane',
            updateError: 'Wystąpił błąd. Hasło nie zostało zaktualizowane',
            clear: 'Wyczyść',
            change: 'Zmień hasło',
          }
        },
        en: {
          title: 'User Profile',
          close: 'Close',
          rules: {
            required: 'Field is required',
            atLeast: 'Field must be at least',
            less: 'Field must be less than',
            more: 'Pole musi mieć more than',
            characters: 'characters',
            emailMustBeValid: 'E-mail must be valid',
            passwordMustDiffer: 'New password must be different from the old password',
            passwordMustBeSame: 'Password can\'t be different'
          },
          user: {
            name: 'User name',
            email: 'E-mail address',
            restore: 'Restore',
            save: 'Save',
            updated: 'User data has been updated',
          },
          password: {
            old: 'Old password',
            new: 'New password',
            repeat: 'Repeat password',
            updated: 'Password has been updated',
            updateError: 'Password update error',
            clear: 'Clear',
            change: 'Change passowrd',
          }
        },
      }
    }

  };

</script>
