<template>
  <v-layout row wrap class="white">
    <v-flex xs10 offset-xs1 sm8 offset-sm2 md6 offset-md3 lg4 offset-lg4 xl2 offset-xl5 class="parent text-xs-center light-blue--text text--darken-4">
      <img class="logo" src="" style="width:300px;height:auto;">
      <h3>{{ $t('login.title') }}</h3>
      <template>
        <v-form v-model="valid" ref="form" lazy-validation>
          <v-text-field :label="$t('login.email')" v-model="email" :rules="emailRules" required></v-text-field>
          <v-text-field :label="$t('login.password')" v-model="password" :rules="passwordRules" :counter="30" required :append-icon="passAppendIcon"
            :append-icon-cb="() => (passwordHidden = !passwordHidden)" :type="passTextFieldType"></v-text-field>
          <v-btn @click="login(credential)" :disabled="!valid" class="light-blue darken-4 white--text">
            Zaloguj
          </v-btn>
        </v-form>
      </template>
    </v-flex>
  </v-layout>
</template>
<script>
  import {
    mapActions
  } from 'vuex'

  export default {
    name: 'login',
    data() {
      return {
        valid: false,
        password: '',
        passwordRules: [
          (v) => !!v || 'Hasło jest wymagane',
          (v) => v && v.length >= 5 || 'Hasło musi mieć co najmniej 5 znaków',
          (v) => v && v.length <= 30 || 'Hasło nie może być dłuższe niż 30 znaków',
        ],
        email: '',
        emailRules: [
          (v) => !!v || 'Padanie adresu e-mail jest wymagane',
          (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Niepoprawny format adresu e-mail'
        ],
        passwordHidden: true,
      }
    },
    computed: {
      credential: function () {
        let email = this.email;
        let password = this.password;
        return {
          email,
          password
        }
      },
      passTextFieldType: function () {
        return this.passwordHidden ? 'password' : 'text'
      },
      passAppendIcon: function () {
        return this.passwordHidden ? 'visibility' : 'visibility_off'
      },
    },
    methods: {
      ...mapActions('auth', [
        'login',
      ]),
    },
    i18n: {
      messages:{
        pl: {
          login: {
            title: "CRM",
            email: "E-mail",
            password: "Hasło",
          }
        },
        en: {
          login: {
            title: "CRM",
            email: "E-mail",
            password: "Password",
          }
        }
      }
    },
  }

</script>
<style scoped>
  .parent {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

</style>
