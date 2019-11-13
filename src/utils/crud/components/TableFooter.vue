<template>
  <span>
    <span>
      {{ $t('global.datatable.records') }} {{ pageStart }} - {{ pageStop }} {{ $t('global.datatable.from') }} {{ itemsLength }}
    </span>
    <span style="margin-left:30px;">
      {{ $t('global.datatable.page') }}:
      &nbsp;
      <span style="width:50px;display:inline-block !important;">
        <v-text-field
          :value="pagination.page"
          @input="setPage($event)"
          type="number"
          min="1"
          :max="calcPages"
        />
      </span>
    </span>
  </span>
</template>

<script>
export default {
  props: [
    'pageStart',
    'pageStop',
    'itemsLength',
    'pagination',
  ],
  computed: {
    calcPages () {
      return Math.ceil(this.itemsLength / this.pagination.itemsPerPage)
    },
  },
  methods: {
    setPage (val) {
      this.$emit('setPage', val)
    },
  },
}
</script>
