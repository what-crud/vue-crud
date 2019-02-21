<template>
  <login-form
    redirect="/home"
    :localeSelectable="true"
    :showLogo="true"
    logo="vue-crud-sm.png"
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
