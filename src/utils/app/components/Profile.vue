<template>
  <v-layout row justify-center>
    <v-dialog persistent v-model="profileDialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">{{ $t('global.profile.title') }}</span>
        </v-card-title>

        <!-- edit user form -->
        <v-form v-model="userValid">
          <v-card-text>
            <v-alert :value="userUpdated" outlined color="success" icon="check_circle">
              {{ $t('global.profile.user.updated') }}
            </v-alert>
            <!-- User login -->
            <v-text-field
              :label="$t('global.profile.user.login')"
              v-model="login"
              :rules="loginRules"
              :required="loginEditable"
              :disabled="!loginEditable"
            ></v-text-field>
            <!-- user custom fields -->
            <v-text-field
              v-for="field in customFields"
              :key="field.name"
              :label="field.label"
              v-model="field.value"
              :rules="customFieldRules(field)"
              :required="field.required"
              :disabled="!field.editable"
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-btn
              class="blue--text"
              text
              @click="getUser()"
            >
              {{ $t('global.profile.user.restore') }}
            </v-btn>
            <v-btn
              class="green--text"
              text
              @click="editUser(user)"
              :disabled="!userValid"
            >
              {{ $t('global.profile.user.save') }}
            </v-btn>
          </v-card-actions>
        </v-form>

        <!-- edit password form -->
        <v-form v-model="passwordValid">
          <v-card-text>
            <v-alert :value="userPasswordUpdated" outlined color="success" icon="check_circle">
              {{ $t('global.profile.password.updated') }}
            </v-alert>
            <v-alert :value="userPasswordUpdateError" outlined color="error" icon="warning">
              {{ $t('global.profile.password.updateError') }}
              <br> {{ password.updateErrorMsg }}
            </v-alert>
            <v-text-field
              :label="$t('global.profile.password.old')"
              v-model="password.old"
              :rules="passwordRules.old"
              :append-icon="pass1 ? 'visibility' : 'visibility_off'"
              @click:append="() => (pass1 = !pass1)" :type="pass1 ? 'password' : 'text'"
              counter
            ></v-text-field>
            <v-text-field
              :label="$t('global.profile.password.new')"
              v-model="password.new"
              :rules="passwordRules.new"
              :append-icon="pass2 ? 'visibility' : 'visibility_off'"
              @click:append="() => (pass2 = !pass2)" :type="pass2 ? 'password' : 'text'"
              counter
            ></v-text-field>
            <v-text-field
              :label="$t('global.profile.password.repeat')"
              v-model="password.repeat"
              :rules="passwordRules.repeat"
              :append-icon="pass3 ? 'visibility' : 'visibility_off'"
              @click:append="() => (pass3 = !pass3)" :type="pass3 ? 'password' : 'text'"
              counter
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-btn
              class="blue--text"
              text
              @click="clearPasswords()"
            >
              {{ $t('global.profile.password.clear') }}
            </v-btn>
            <v-btn
              class="green--text"
              text
              @click="editPasswordAndClear()"
              :disabled="!passwordValid"
            >
              {{ $t('global.profile.password.change') }}
            </v-btn>
          </v-card-actions>
        </v-form>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            class="black--text"
            text
            @click.native="$store.state.app.profileDialog = false"
          >
            {{ $t('global.profile.close') }}
          </v-btn>
        </v-card-actions>

      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import {
  mapState,
  mapGetters,
  mapActions,
} from 'vuex'
import auth from '@/config/auth'

export default {
  name: 'profile',
  data: () => ({
    login: '',
    loginEditable: auth.loginEditable || true,
    loginFieldName: auth.loginFieldName || 'login',
    passwordValid: false,
    password: {
      old: '',
      new: '',
      repeat: '',
    },
    customFields: [],
    userValid: false,
    pass1: true,
    pass2: true,
    pass3: true,
    alphanumericRegex: /^[a-zA-Z0-9]+$/,
    emailRegex: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
  }),
  computed: {
    ...mapState('app', ['profileDialog']),
    ...mapGetters('auth', [
      'userInfo',
      'userUpdated',
      'userPasswordUpdated',
      'userPasswordUpdateError',
      'userPasswordUpdateErrorMsg',
    ]),
    loginRules () {
      const min = auth.loginMinLength || 4
      const max = auth.loginMaxLength || 100
      const regex = auth.loginRegex || (auth.loginWithEmail ? this.emailRegex : this.alphanumericRegex)
      return [
        v => !!v || this.$t('global.profile.rules.required'),
        v => regex.test(v) || this.$t('global.profile.rules.loginIncorrect'),
        v => (v === undefined || v.length <= max) || `${this.$t('global.profile.rules.max')} ${max} ${this.$t('global.profile.rules.characters')}`,
        v => (v === undefined || v.length >= min) || `${this.$t('global.profile.rules.min')} ${min} ${this.$t('global.profile.rules.characters')}`,
      ]
    },
    passwordRules () {
      const min = auth.passwordMinLength || 8
      const max = auth.passwordMaxLength || 100
      const regex = auth.passwordRegex || this.alphanumericRegex
      return {
        old: [v => !!v || this.$t('global.profile.rules.required')],
        new: [
          v => !!v || this.$t('global.profile.rules.required'),
          v => regex.test(v) || this.$t('global.profile.rules.passwordIncorrect'),
          v => v.length <= max || `${this.$t('global.profile.rules.max')} ${max} ${this.$t('global.profile.rules.characters')}`,
          v => v.length >= min || `${this.$t('global.profile.rules.min')} ${min} ${this.$t('global.profile.rules.characters')}`,
          v => v !== this.password.old || this.$t('global.profile.rules.passwordMustDiffer'),
        ],
        repeat: [
          v => !!v || this.$t('global.profile.rules.required'),
          v => regex.test(v) || this.$t('global.profile.rules.passwordIncorrect'),
          v => v.length <= max || `${this.$t('global.profile.rules.max')} ${max} ${this.$t('global.profile.rules.characters')}`,
          v => v.length >= min || `${this.$t('global.profile.rules.min')} ${min} ${this.$t('global.profile.rules.characters')}`,
          v => v === this.password.new || this.$t('global.profile.rules.passwordMustBeSame'),
        ],
      }
    },
    user () {
      let user = {}
      user[this.loginFieldName] = this.login
      for (let field of this.customFields) {
        user[field.name] = field.value
      }
      return user
    },
  },
  methods: {
    ...mapActions('auth', [
      'editUser',
      'editPassword',
    ]),
    clearPasswords () {
      this.password.old = ''
      this.password.new = ''
      this.password.repeat = ''
    },
    getUser () {
      const user = this.userInfo
      this.login = user[this.loginFieldName]
      const customFields = auth.customFields || []
      this.customFields = customFields.map((field) => {
        let rField = field
        rField.value = user[field.name]
        rField.label = this.$t(`global.profile.user.${field.name}`)
        return rField
      })
    },
    editPasswordAndClear () {
      this.editPassword(this.password)
      this.clearPasswords()
    },
    customFieldRules (field) {
      const min = field.min || 0
      const max = field.max || 100
      const regex = field.regex || /^.{0,100}$/
      const required = field.required
      return [
        v => (!required || !!v) || this.$t('global.profile.rules.required'),
        v => regex.test(v) || this.$t('global.profile.rules.fieldIncorrect'),
        v => (v === undefined || v.length <= max) || `${this.$t('global.profile.rules.max')} ${max} ${this.$t('global.profile.rules.characters')}`,
        v => (v === undefined || v.length >= min) || `${this.$t('global.profile.rules.min')} ${min} ${this.$t('global.profile.rules.characters')}`,
      ]
    },
  },
  created () {
    this.getUser()
  },
}

</script>
