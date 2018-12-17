<template>
  <span>
    <span>
      {{ $t('records') }} {{ pageStart }} - {{ pageStop }} {{ $t('from') }} {{ itemsLength }}
    </span>
    <span style="margin-left:30px;">
      {{ $t('page') }}:
      &nbsp;
      <span style="width:50px;display:inline-block !important;">
        <v-text-field :value="pagination.page" @input="setPage($event)" type="number" min="1" :max="calcPages"></v-text-field>
      </span>
    </span>
  </span>
</template>

<script>
import MessagesMixin from "../mixins/messages-datatable-footer.js";
export default {
  mixins: [MessagesMixin],
  props: [
    'pageStart',
    'pageStop',
    'itemsLength',
    'pagination'
  ],
  computed: {
    calcPages() {
      return Math.ceil(this.itemsLength / this.pagination.rowsPerPage)
    },
  },
  methods: {
    setPage(val){
      this.$emit('setPage', val)
    }
  }
}
</script>
