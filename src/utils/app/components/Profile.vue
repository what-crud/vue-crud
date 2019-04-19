<template>
  <v-layout row justify-center>
    <v-dialog persistent v-model="$store.state.app.profileDialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">{{ $t('global.profile.title') }}</span>
        </v-card-title>

        <!-- edit user form -->
        <v-form v-model="userValid">
          <v-card-text>
            <v-alert v-if="userUpdated" outline color="success" icon="check_circle" value="true">
              {{ $t('global.profile.user.updated') }}
            </v-alert>
            <v-text-field :label="$t('global.profile.user.name')" v-model="user.name" :rules="userRules.name"></v-text-field>
            <v-text-field :label="$t('global.profile.user.email')" v-model="user.email" :rules="userRules.email"></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-btn class="blue--text" flat @click="getUser()">{{ $t('global.profile.user.restore') }}</v-btn>
            <v-btn class="green--text" flat @click="editUser(user)" :disabled="!userValid">{{ $t('global.profile.user.save') }}</v-btn>
          </v-card-actions>
        </v-form>

        <!-- edit password form -->
        <v-form v-model="passwordValid">
          <v-card-text>
            <v-alert v-if="userPasswordUpdated" outline color="success" icon="check_circle" value="true">
              {{ $t('global.profile.password.updated') }}
            </v-alert>
            <v-alert v-else-if="userPasswordUpdateError" outline color="error" icon="warning" value="true">
              {{ $t('global.profile.password.updateError') }}
              <br> {{ password.updateErrorMsg }}
            </v-alert>
            <v-text-field :label="$t('global.profile.password.old')" v-model="password.old" :rules="passwordRules.old" :append-icon="e1 ? 'visibility' : 'visibility_off'"
              @click:append="() => (e1 = !e1)" :type="e1 ? 'password' : 'text'" counter></v-text-field>
            <v-text-field :label="$t('global.profile.password.new')" v-model="password.new" :rules="passwordRules.new" min="8" :append-icon="e2 ? 'visibility' : 'visibility_off'"
              @click:append="() => (e2 = !e2)" :type="e2 ? 'password' : 'text'" counter></v-text-field>
            <v-text-field :label="$t('global.profile.password.repeat')" v-model="password.repeat" :rules="passwordRules.repeat" min="8" :append-icon="e3 ? 'visibility' : 'visibility_off'"
              @click:append="() => (e3 = !e3)" :type="e3 ? 'password' : 'text'" counter></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-btn class="blue--text" flat @click="clearPasswords()">{{ $t('global.profile.password.clear') }}</v-btn>
            <v-btn class="green--text" flat @click="editPasswordAndClear()" :disabled="!passwordValid">{{ $t('global.profile.password.change') }}</v-btn>
          </v-card-actions>
        </v-form>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="black--text" flat @click.native="$store.state.app.profileDialog = false">{{ $t('global.profile.close') }}</v-btn>
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
      email: ''
    },
    passwordValid: false,
    password: {
      old: '',
      new: '',
      repeat: ''
    },
    e1: true,
    e2: true,
    e3: true
  }),
  computed: {
    ...mapGetters('auth', [
      'userInfo',
      'userUpdated',
      'userPasswordUpdated',
      'userPasswordUpdateError',
      'userPasswordUpdateErrorMsg'
    ]),
    userRules () {
      const self = this
      return {
        name: [
          v => !!v || self.$t('global.profile.rules.required'),
          v => v.length < 100 || `${self.$t('global.profile.rules.less')} 100 ${self.$t('global.profile.rules.characters')}`,
          v => v.length > 4 || `${self.$t('global.profile.rules.more')} 4 ${self.$t('global.profile.rules.characters')}`
        ],
        email: [
          v => !!v || self.$t('global.profile.rules.required'),
          v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || self.$t('global.profile.rules.emailMustBeValid')
        ]
      }
    },
    passwordRules () {
      const self = this
      return {
        old: [
          v => !!v || self.$t('global.profile.rules.required')
        ],
        new: [
          v => !!v || self.$t('global.profile.rules.required'),
          v => v.length < 100 || `${self.$t('global.profile.rules.less')} 100 ${self.$t('global.profile.rules.characters')}`,
          v => v.length >= 8 || `${self.$t('global.profile.rules.atLeast')} 8 ${self.$t('global.profile.rules.characters')}`,
          v => v !== self.password.old || self.$t('global.profile.rules.passwordMustDiffer')
        ],
        repeat: [
          v => !!v || self.$t('global.profile.rules.required'),
          v => v.length < 100 || `${self.$t('global.profile.rules.less')} 100 ${self.$t('global.profile.rules.characters')}`,
          v => v.length >= 8 || `${self.$t('global.profile.rules.atLeast')} 8 ${self.$t('global.profile.rules.characters')}`,
          v => v === self.password.new || self.$t('global.profile.rules.passwordMustBeSame')
        ]
      }
    }
  },
  created () {
    this.getUser()
  },
  methods: {
    clearPasswords () {
      this.password.old = ''
      this.password.new = ''
      this.password.repeat = ''
    },
    getUser () {
      const user = this.userInfo
      this.user.name = user.name
      this.user.email = user.email
    },
    editPasswordAndClear () {
      this.editPassword(this.password)
      this.clearPasswords()
    },
    ...mapActions('auth', [
      'editUser',
      'editPassword'
    ])
  }
}

</script>
