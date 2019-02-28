<template>
    <login-form
      redirect="/app"
      :localeSelectable="true"
      :showLogo="true"
      logo="vue-crud-lg.png"
    ></login-form>
  </template>
  
  <script>
  
  import LoginForm from '@/utils/auth/components/LoginForm.vue'
  
  export default {
    components: {
      LoginForm
    }
  }
  
  </script>
  