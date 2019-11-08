<template>
  <div
    class="login-form white"
    color="primary"
  >
    <v-alert
      class="login-form__fail-alert px-5"
      type="error"
      :value="loginFailed"
      dismissible
    >
      {{ $t('global.login.failed') }}
    </v-alert>
    <div
      class="
        login-form__wrapper
        d-flex
        flex-column
        align-center
        justify-center
      "
    >
      <v-progress-circular
        v-if="loginWait"
        :size="100"
        :width="5"
        class="login-form__loader"
        color="primary"
        indeterminate
      />

      <template v-else>

        <!-- logo -->
        <img
          v-if="showLogo"
          class="mb-2"
          :src="require(`@/assets/images/${logo}`)"
        >

        <!-- app title -->
        <h1
          class="
            login-form__title
            text-center
            primary--text
            display-1
            font-weight-bold
            mb-10
          "
        >
          {{ $t('global.login.title') }}
        </h1>

        <!-- locale select -->
        <v-menu v-if="localeSelectable">
          <template v-slot:activator="{ on }">
            <v-btn
              v-on="on"
              dark fab small
              color="secondary"
              class="mb-2"
            >
              <v-icon>translate</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(locale, i) in locales"
              :key="i"
              @click="changeLocale(locale.name)"
            >
              <v-list-item-title>{{ locale.text }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <!-- login form -->
        <v-form
          v-model="valid"
          class="login-form__form"
          ref="form"
          lazy-validation
          @submit.prevent
        >
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
            @click:append="() => (passwordHidden = !passwordHidden)"
            :type="passTextFieldType"
            class="mb-5"
          ></v-text-field>
          <v-btn
            block
            @click="loginAttempt()"
            :disabled="!valid"
            class="primary white--text"
          >
            {{ $t('global.login.submit') }}
          </v-btn>
        </v-form>
      </template>
    </div>
  </div>
</template>
<script>
import {
  mapState,
  mapMutations,
  mapActions,
} from 'vuex'
import auth from '@/config/auth'

export default {
  name: 'login',
  props: {
    redirect: {
      type: String,
      default: '/',
    },
    showLogo: {
      type: Boolean,
      default: true,
    },
    logo: {
      type: String,
      default: 'vue-crud-sm.png',
    },
    localeSelectable: {
      type: Boolean,
      default: true,
    },
  },
  data () {
    return {
      valid: false,
      password: '',
      user: '',
      passwordHidden: true,
      alphanumericRegex: /^[a-zA-Z0-9]+$/,
      emailRegex: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
    }
  },
  computed: {
    ...mapState('auth', [
      'loginWait',
      'loginFailed',
    ]),
    ...mapState(['locales']),
    loginRegex () {
      return auth.loginRegex ? auth.loginRegex : (auth.loginWithEmail ? this.emailRegex : this.alphanumericRegex)
    },
    loginRules () {
      return [
        v => !!v || this.$t('global.login.loginRequired'),
        v => this.emailRegex.test(v) || this.$t('global.login.incorrectLogin'),
      ]
    },
    passwordRegex () {
      return auth.passwordRegex ? auth.passwordRegex : this.alphanumericRegex
    },
    passwordRules () {
      return [
        v => !!v || this.$t('global.login.passwordRequired'),
        v => this.passwordRegex.test(v) || this.$t('global.login.incorrectPassword'),
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
    },
  },
  methods: {
    ...mapMutations(['setLocale']),
    ...mapActions('auth', ['login']),
    changeLocale (locale) {
      this.$i18n.locale = locale
      this.$vuetify.lang.current = locale
      this.setLocale(locale)
    },
    loginAttempt () {
      this.login(this.credential).then(() => {
        this.$router.push({ path: this.redirect })
      })
    },
  },
}

</script>
<style lang="scss" scoped>
.login-form {
  &__fail-alert {
    width:100%;
    position:absolute;
    top: 0;
    left:0;
  }
  &__wrapper {
    height: 100vh;
    width: 100%;
  }
  &__form {
    width: 300px;
  }
  &__logo {
    width:100%;
    height:auto;
  }
}
</style>
