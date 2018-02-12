<template>
  <v-layout row wrap  :class="$store.state.secondaryColor">
    <v-flex xs10 offset-xs1 sm8 offset-sm2 md6 offset-md3 lg4 offset-lg4 xl2 offset-xl5 class="parent text-xs-center red--text">
      <img class="logo" src="../../assets/images/logo.png">
      <h3>{{ $t('login.title') }}</h3>
      <template>
        <v-form v-model="valid" ref="form" lazy-validation v-on:submit.prevent>
          <v-text-field dark :label="$t('login.email')" v-model="email" :rules="emailRules" required></v-text-field>
          <v-text-field dark :label="$t('login.password')" v-model="password" :rules="passwordRules" :counter="30" required :append-icon="passAppendIcon"
            :append-icon-cb="() => (passwordHidden = !passwordHidden)" :type="passTextFieldType"></v-text-field>
          <v-btn type="submit" @click="login(credential)" :disabled="!valid" dark :class="$store.state.primaryColor">
            {{ $t('login.submit') }}
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
          (v) => !!v || 'Hasło jest wymagane'
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
      credential() {
        let email = this.email
        let password = this.password
        return {
          email,
          password
        }
      },
      passTextFieldType() {
        return this.passwordHidden ? 'password' : 'text'
      },
      passAppendIcon() {
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
            title: "CRUD oparty na Vue, Vuex i Vuetify",
            email: "E-mail",
            password: "Hasło",
            submit: "Zaloguj"
          }
        },
        en: {
          login: {
            title: "Vue - based CRUD application",
            email: "E-mail",
            password: "Password",
            submit: "Submit"
          }
        }
      }
    },
  }

</script>
<style scoped>
  .logo {
    height: auto;
    width: 150px;
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
  .parent {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

</style>
