<template>
  <v-layout v-if="loginWait" class="login-loader" justify-center align-center>
    <v-progress-circular indeterminate v-bind:size="100" v-bind:width="5" color="primary"></v-progress-circular>
  </v-layout>
  <v-layout v-else row wrap class="white" color="primary">
      <v-alert class="login-failed" type="error" :value="loginFailed" dismissible>
        {{ $t('global.login.failed') }}
      </v-alert>
    <v-flex xs10 offset-xs1 sm8 offset-sm2 md6 offset-md3 lg4 offset-lg4 xl2 offset-xl5 class="parent text-xs-center">
      <img v-if="showLogo" class="logo" :src="require(`@/assets/images/${logo}`)">
      <h1 class="app-title primary--text">{{ $t('global.login.title') }}</h1>
      <template>
        <v-form v-model="valid" ref="form" lazy-validation v-on:submit.prevent>
          <v-menu bottom left v-if="localeSelectable">
            <v-btn icon slot="activator" dark class="secondary">
              <v-icon>translate</v-icon>
            </v-btn>
            <v-list>
              <v-list-tile v-for="(locale, i) in locales" :key="i" @click="changeLocale(locale.name)">
                <v-list-tile-title>{{ locale.text }}</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
          <v-text-field
            :label="$t('global.login.login')"
            v-model="user"
            :rules="loginRules"
            required
          ></v-text-field>
          <v-text-field
            :label="$t('global.login.password')"
            v-model="password"
            :rules="passwordRules"
            :counter="30"
            required
            :append-icon="passAppendIcon"
            @click:append="() => (passwordHidden = !passwordHidden)" :type="passTextFieldType"
          ></v-text-field>
          <v-btn type="submit" @click="loginAttempt()" :disabled="!valid" class="primary white--text">
              {{ $t('global.login.submit') }}
          </v-btn>
        </v-form>
      </template>
    </v-flex>
  </v-layout>
</template>
<script>
import {
  mapState,
  mapMutations,
  mapActions
} from 'vuex'
import auth from '@/config/auth'

export default {
  name: 'login',
  props: {
    redirect: {
      type: String,
      default: '/'
    },
    showLogo: {
      type: Boolean,
      default: true
    },
    logo: {
      type: String,
      default: 'vue-crud-sm.png'
    },
    localeSelectable: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      valid: false,
      password: '',
      user: '',
      passwordHidden: true,
      alphanumericRegex: /^[a-zA-Z0-9]+$/,
      emailRegex: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
    }
  },
  computed: {
    ...mapState('auth', [
      'loginWait',
      'loginFailed'
    ]),
    ...mapState([
      'locales'
    ]),
    loginRegex () {
      return auth.loginRegex ? auth.loginRegex : (auth.loginWithEmail ? emailRegex : alphanumericRegex)
    },
    loginRules () {
      return [
        v => !!v || this.$t('global.login.loginRequired'),
        v => this.emailRegex.test(v) || this.$t('global.login.incorrectLogin')
      ]
    },
    passwordRegex () {
      return auth.passwordRegex ? auth.passwordRegex : alphanumericRegex
    },
    passwordRules () {
      return [
        v => !!v || this.$t('global.login.passwordRequired'),
        v => this.passwordRegex.test(v) || this.$t('global.login.incorrectPassword')
      ]
    },
    credential () {
      let credentials = {}
      credentials[auth.loginFieldName || 'login'] = this.user
      credentials[auth.passwordFieldName || 'password'] = this.password
      return credentials
    },
    passTextFieldType () {
      return this.passwordHidden ? 'password' : 'text'
    },
    passAppendIcon () {
      return this.passwordHidden ? 'visibility' : 'visibility_off'
    }
  },
  methods: {
    ...mapMutations([
      'setLocale'
    ]),
    ...mapActions('auth', [
      'login'
    ]),
    changeLocale (locale) {
      this.$i18n.locale = locale
      this.setLocale(locale)
    },
    loginAttempt () {
      this.login(this.credential).then(() => {
        this.$router.push({ path: this.redirect })
      })
    }
  }
}

</script>
<style scoped>
  .app-title {
    margin-top: 30px;
    margin-bottom: 20px;
    font-size: 30px;
  }
  .login-loader {
    height:400px;
    max-height:70vh;
  }
  .logo {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width:300px;
    height:auto;
  }
  .parent {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .login-failed {
    width:100%;
    position:relative;
    top: 0;
    left:0;
  }
</style>
