# Authentication

## Login form

#### Import:
**import LoginForm from '@/utils/auth/components/LoginForm.vue'**

#### Props

<!-- @vuese:login:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|redirect|-|`String`|`false`|'/'|
|showLogo|-|`Boolean`|`false`|true|
|logo|-|`String`|`false`|'vue-crud-sm.png'|
|localeSelectable|-|`Boolean`|`false`|true|

<!-- @vuese:login:props:end -->

#### Example:

``` html
<template>
  <login-form
    redirect="/home"
    :locale-selectable="true"
    :show-logo="true"
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
```
