<template>
  <div class="field-wrapper">
    <label class="field-wrapper__label">
      {{ label }}
    </label>
    <slot />
  </div>
</template>

<script>

export default {
  name: 'ItemDetailsFieldWrapper',
  props: ['label'],
}
</script>

<style lang="scss" scoped>
.field-wrapper {
  margin-top: 10px;
  &__label {
    font-size: 12px;
    color: #777;
  }
}
</style>
